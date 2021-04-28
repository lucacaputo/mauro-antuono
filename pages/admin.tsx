import Head from 'next/head'
import { NextPage } from "next"
import AppContext from "../context/AppContext";

const Admin: NextPage = () => {
    return (
        <AppContext>
            <Head>
                <title>Mario Longobardi | Admin</title>
            </Head>
        </AppContext>
    );
}

export default Admin;
