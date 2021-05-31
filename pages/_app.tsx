import "../styles/globals.css";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Navbar from '../components/Navbar';
import { useRef } from 'react';
import { clamp } from "../helpers";
import SideNav from "../components/SideNav";
import InfoContainer from '../components/InfoContainer';
import ScrollArrow from '../components/ScrollArrow';
import AppContext from "../context/AppContext";
import { SWRConfig } from "swr";
import { AiFillFolderOpen, AiFillFilePdf, AiFillPicture } from "react-icons/ai";
import Sidebar, { LinkType } from "../components/admin/Sidebar";
import ScrollBar from "../components/ScrollBar";
import { useEffect, useState } from 'react';
import Head from "next/head";
import * as ga from '../lib/ga'
import "../styles/adminStyle.css";

type Direction = "up" | "down";

const lnks: LinkType[] = [
    {
        text: 'Projects',
        to: '/admin/projects',
        icon: <AiFillFolderOpen color="#eee" size="100%" />
    },
    {
        text: 'PDFs',
        to: '/admin/pdfs',
        icon: <AiFillFilePdf color="#eee" size="100%" />
    },
    {
        text: 'Images',
        to: '/admin/images',
        icon: <AiFillPicture color="#eee" size="100%" />
    },
];

const getNextRoute = (route: string, direction: Direction) => {
	if (direction === "down") {
		if (route === "/") return "/esperienze";
		else return "/progetti";
	} else {
		if (route === "/progetti") return "/esperienze";
		else return "/";
	}
}

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	let throttle: ReturnType<typeof setTimeout> | null = null;
	const scrollRef = useRef<{ pixels: number, page: string }>({
		pixels: 0,
		page: router.route,
	});

	const onWheel = (e: React.WheelEvent) => {
		clearTimeout(throttle);
		const { deltaY } = e;
		const direction: Direction = deltaY < 0 ? "up" : "down";
		scrollRef.current.pixels = clamp(scrollRef.current.pixels + deltaY, NavigateThreshold, 0);
		throttle = setTimeout(() => {
			if (scrollRef.current.pixels === NavigateThreshold || scrollRef.current.pixels === 0) {
				const nextRoute = getNextRoute(router.route, direction);
				if (router.route !== nextRoute) {
					scrollRef.current.page = nextRoute;
					scrollRef.current.pixels = direction === "up" ? NavigateThreshold : 0;
					router.push(scrollRef.current.page);
				}
			}
		}, 200);
	}
	const [loaded, setLoaded] = useState(false);
	const [NavigateThreshold, setNavigateThreshold] = useState(200);
	useEffect(() => {
		const handleRouteChange = (url) => {
			ga.pageview(url)
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		setLoaded(true);
		setNavigateThreshold(window.innerHeight / 3);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events]);
	const getClamp = (): { clampFrom: number, clampTo: number, } => {
		if (!loaded) return { clampFrom: 0, clampTo: 0 };
		if (router.route === '/') return { clampTo: window.innerWidth / 3, clampFrom: 0, };
		if (router.route === '/progetti') return { clampTo: window.innerWidth, clampFrom: (window.innerWidth / 3) * 2, };
		return { clampTo: (window.innerWidth / 3) * 2, clampFrom: window.innerWidth / 3, };
	}
	return !/\/admin/gm.test(router.route) ? (
		<div 
			className="app"
			onWheel={onWheel}
		>
			<ScrollBar {...getClamp()} />
			<Navbar isOnTop={router.route !== "/"} linksVisible={router.route === "/progetti"} />
			<div id="mainContainer">
				<AnimatePresence exitBeforeEnter>
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
				<SideNav isVisible={router.route !== "/"} />
				<InfoContainer isVisible={router.route !== "/"} />
			</div>
			<AnimatePresence>
				{
					router.route !== "/progetti" &&
					<ScrollArrow onClick={() => {
						scrollRef.current.pixels = 0;
						scrollRef.current.page = getNextRoute(router.route, "down");
						router.push(scrollRef.current.page);
					}} />
				}
			</AnimatePresence>
		</div>
	) : (
		<SWRConfig
                value={{
                    fetcher: (resource, init) => fetch(resource, init).then(r => r.json()),
					revalidateOnFocus: false,
                }}
            > 
			<AppContext>           
				<Head>
					<title>Mario Longobardi | Admin</title>
					<link 
						rel="stylesheet" 
						href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" 
						integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
						crossOrigin="anonymous" 
					/>
				</Head>
				<Sidebar startCollapsed links={lnks} />
				<Component {...pageProps} />
			</AppContext>
        </SWRConfig>
	);
};

export default App;
