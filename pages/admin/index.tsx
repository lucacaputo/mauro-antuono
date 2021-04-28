import Head from 'next/head'
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from 'swr';

const Admin: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Mario Longobardi | Admin</title>
            </Head>
        </>
    );
}

export default Admin;
