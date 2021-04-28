import { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
    username: string,
    isLoggedIn: boolean,
    token: string,
    setData: (username?: string, isLoggedIn?: boolean, token?: string) => void
}

const Context = createContext<AppContextType | null>(null);

export const useAppContext = () => {
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
                setData(userDetails);
            }
        } catch (err) {
            //user data not set
        }
    }, [setData]);

    return (
        <Context.Provider value={{
            ...data,
            setData: (username?: string, isLoggedIn?: boolean, token?: string) => setData(s => ({ ...s, username, isLoggedIn, token })),
        }}>
            { children }
        </Context.Provider>
    );
}

export default AppContext;