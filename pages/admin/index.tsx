import Head from 'next/head'
import { NextPage } from "next";
import { useAppContext } from '../../context/AppContext';
import useSWR from "swr";
import { API_BASE } from '../../helpers/index';
import { useRouter } from "next/router";
import Sidebar, {  } from "../../components/admin/Sidebar";

const Admin: NextPage = () => {
    const [userData, _] = useAppContext();
    const fetcher = (res: RequestInfo, init: RequestInit) => fetch(res, {
        ...init,
        headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        }
    }).then(r => r.json());
    const router = useRouter();
    const { data, error, isValidating } = useSWR(`${API_BASE}/auth/checkLogin`, fetcher, { revalidateOnFocus: false });
    if (isValidating) return <p style={{ fontSize: 20, fontWeight: 700, textAlign: 'center', padding: 20 }}>Loading...</p>;
    if (!data.isLoggedIn || error !== undefined) {
        console.log("error", JSON.stringify(data), error);
        router.push('/admin/login');
        return null;
    }
    return (
        <>
            <Head>
                <title>Mario Longobardi | Admin</title>
                <link 
                    rel="stylesheet" 
                    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" 
                    integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
                    crossOrigin="anonymous" 
                />
            </Head>
            <Sidebar titleText={`welcome, ${ userData.username }`} links={[]} />
        </>
    );
}

export default Admin;
