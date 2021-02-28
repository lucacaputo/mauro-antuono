import Head from 'next/head'
import { createPortal } from "react-dom";
import { NextPage } from "next"

const parent = document.querySelector("#infoCont");

const Contatti: NextPage = () => {
    return createPortal(
        <span>Fanculo</span>,
        parent
    )
}

export default Contatti;
