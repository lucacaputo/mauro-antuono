import "../styles/globals.css";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Navbar from '../components/Navbar';
import { useRef } from 'react';
import { clamp } from "../helpers";
import SideNav from "../components/SideNav";
import InfoContainer from '../components/InfoContainer';

type Direction = "up" | "down";

const NavigateThreshold = 500;
const pages = ["/", "/esperienze", "/formazione", "/competenze", "/interessi", "/contatti", "/progetti"];
const getNextRoute = (route: string, direction: Direction) => {
	if (direction === "down") {
		switch (route) {
			case "/":
				return "/esperienze";
			default:
				return "/progetti"
		}
	} else {
		switch (route) {
			case "/progetti":
				return "/esperienze";
			default:
				return "/";
		}
	}
}

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	let throttle: ReturnType<typeof setTimeout> | null = null;
	const scrollRef = useRef({
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
					scrollRef.current.pixels = direction === "up" ? 500 : 0;
					router.push(scrollRef.current.page)
				}
			}
		}, 200);
	}
	return (
		<div 
			className="app"
			onWheel={onWheel}
		>
			<Navbar isOnTop={router.route !== "/"} linksVisible={router.route === "/progetti"} />
			<div id="mainContainer">
				<AnimatePresence exitBeforeEnter>
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
				<SideNav isVisible={router.route !== "/" && router.route !== "/progetti"} />
				<InfoContainer isVisible={router.route !== "/" && router.route !== "/progetti"} />
			</div>
		</div>
	);
};

export default App;
