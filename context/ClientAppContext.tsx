import { useState, useEffect, createContext, useContext } from "react";


const ClientContext = createContext<{ isMobile: boolean }>({ isMobile: false });

export const useIsMobile = () => {
    const ctx = useContext(ClientContext);
    if (ctx === undefined || ctx === null) {
        throw new Error('client context is undefined');
    }
    return ctx.isMobile;
}

const ClientContextProvider: React.FC = ({ children }) => {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        const resize = () => {
            const w = window.innerWidth || document.documentElement.clientWidth;
            setMobile(w <= 767);
        }
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);
    return (
        <ClientContext.Provider value={{ isMobile: mobile }}>
            { children }
        </ClientContext.Provider>
    )
}

export default ClientContextProvider;