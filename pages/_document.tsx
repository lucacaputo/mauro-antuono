import Document, { Head, Html, Main, NextScript } from "next/document";

export default class Doc extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <script 
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=G-FWBRH5QL09`} 
                    />
                    <script 
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                            
                                gtag('config', 'G-FWBRH5QL09', {
                                    page_path: window.location.pathname
                                });
                            `
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}