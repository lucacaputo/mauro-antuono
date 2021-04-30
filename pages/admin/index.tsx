import Head from 'next/head'
import { NextPage } from "next";
import { useAppContext } from '../../context/AppContext';
import LoginForm from '../../components/admin/LoginForm';

const Admin: NextPage = () => {
    const [userData, _] = useAppContext();
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
            {
                !userData.isLoggedIn ?
                <LoginForm /> :
                <span>Logged</span>
            }
        </>
    );
}

export default Admin;
