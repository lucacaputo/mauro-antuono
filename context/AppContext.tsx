import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from '../helpers/index';

type SetDataFunction = (usr: {username?: string, isLoggedIn?: boolean, token?: string}) => void;
type AppContextType = {
    username: string,
    isLoggedIn: boolean,
    isMobile: boolean,
    setData: SetDataFunction
}
const Context = createContext<AppContextType | null>(null);

export const useAppContext = (): [Omit<AppContextType, 'setData'>, SetDataFunction] => {
    const ctx = useContext(Context);
    if (ctx !== null && ctx !== undefined) {
        return [{ username: ctx.username, isLoggedIn: ctx.isLoggedIn, isMobile: ctx.isMobile }, ctx.setData];
    } else {
        throw new Error('Context null or undefined');
    }
}

const AppContext: React.FC = ({ children }) => {
    const [data, setData] = useState({
        isLoggedIn: false,
        username: '',
        isMobile: false,
    });
    useEffect(() => {
        const setMobile = () => {
            const w = window.innerWidth;
            setData(d => ({
                ...d,
                isMobile: w <= 767,
            }));
        }
        setMobile();
        window.addEventListener('resize', setMobile)
        try {
            const user = window.localStorage.getItem('username');
            const isLoggedIn = window.localStorage?.getItem('token') !== undefined;
            if (user) {
                isLoggedIn && setData(d => ({ ...d, username: user, isLoggedIn }));
            }
        } catch (err) {
            //user data not set
        }
        return () => window.removeEventListener('resize', setMobile);
    }, [setData, data.isMobile]);

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