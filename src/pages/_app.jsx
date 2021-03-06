import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { MoralisProvider } from "react-moralis";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/scss/style.scss";
import "react-toastify/dist/ReactToastify.css";

import Metamask_provider from "src/web3/Metamask_provider";
import CollectionProvider from "src/web3/CollectionProvider";
import MarketplaceProvider from "src/web3/MarketplaceProvider";

const moralisAppId = "Zgi9h3xvYrvXHJZmYjgzbfxlTPnDq6H3RytmW0qt";
const moralisServerURL = "https://mrnuat16od8z.usemoralis.com:2053/server";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });
    return (
        <Metamask_provider>
            <CollectionProvider>
                <MarketplaceProvider>
                   
                    <ThemeProvider defaultTheme="dark">
                        <Component {...pageProps} />
                    </ThemeProvider>
                    
                </MarketplaceProvider>
            </CollectionProvider>
        </Metamask_provider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
