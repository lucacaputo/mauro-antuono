import { createContext, useContext, useEffect, useState } from "react";

type SetDataFunction = (usr: {username?: string, isLoggedIn?: boolean, token?: string}) => void;
type AppContextType = {
    username: string,
    isLoggedIn: boolean,
    token: string,
    setData: SetDataFunction
}
const Context = createContext<AppContextType | null>(null);

export const useAppContext = (): [Omit<AppContextType, 'setData'>, SetDataFunction] => {
    const ctx = useContext(Context);
    if (ctx !== null && ctx !== undefined) {
        return [{ username: ctx.username, isLoggedIn: ctx.isLoggedIn, token: ctx.token }, ctx.setData];
    } else {
        throw new Error('Context null or undefined');
    }
}

const AppContext: React.FC = ({ children }) => {
    const [data, setData] = useState({
        isLoggedIn: false,
        username: '',
        token: '',
    });
    useEffect(() => {
        try {
            const userDetails = JSON.parse(window.localStorage.getItem('userData'));
            if (userDetails) {
                setData({...userDetails, isLoggedIn: true});
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