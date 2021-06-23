import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from '../helpers/index';

type SetDataFunction = (usr: {username?: string, isLoggedIn?: boolean, token?: string}) => void;
type AppContextType = {
    username: string,
    isLoggedIn: boolean,
    setData: SetDataFunction
}
const Context = createContext<AppContextType | null>(null);

export const useAppContext = (): [Omit<AppContextType, 'setData'>, SetDataFunction] => {
    const ctx = useContext(Context);
    if (ctx !== null && ctx !== undefined) {
        return [{ username: ctx.username, isLoggedIn: ctx.isLoggedIn }, ctx.setData];
    } else {
        throw new Error('Context null or undefined');
    }
}

const AppContext: React.FC = ({ children }) => {
    const [data, setData] = useState({
        isLoggedIn: false,
        username: '',
    });
    useEffect(() => {
        try {
            const user = window.localStorage.getItem('username');
            const isLoggedIn = window.localStorage?.getItem('token') !== undefined;
            if (user) {
                isLoggedIn && setData({username: user, isLoggedIn });
            }
        } catch (err) {
            //user data not set
        }
    }, [setData]);

    return (
        <Context.Provider value={{
            ...data,
            setData: usr => setData(s => ({ ...s, ...usr })),
        }}>
            { children }
        </Context.Provider>
    );
}

export default AppContext;