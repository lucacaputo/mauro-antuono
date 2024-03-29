
import { NextPage } from 'next';
import LoginForm from '../../components/admin/LoginForm';
import Head from "next/head";

const Login: NextPage = () => {
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
            <LoginForm />
        </>
    );
}

export default Login;