import "../styles/globals.css";
import { AppProps } from "next/app";
import { Router } from "next/router";
import { AnimatePresence } from "framer-motion";
import Navbar from '../components/Navbar';
import { useState, useRef, useEffect } from 'react';
import { clamp } from "../helpers";

type Direction = "up" | "down";

const NavigateThreshold = 500;
const pages = ["/", "/esperienze", "/formazione", "/competenze", "/interessi", "/contatti"];
const getNextRoute = (route: string, direction: Direction) => {
	if (direction === "down") {
		switch (route) {
			case "/":
				return "/esperienze";
			case "/esperienze":
				return "/contatti";
			default:
				return route;
		}
	} else {
		switch (route) {
			case "/esperienze":
				return "/";
			case "/contatti":
				return "/esperienze";
			default:
				return route;
		}
	}
}

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	let throttle: ReturnType<typeof setTimeout> | null = null;
	const scrollRef = useRef({
		pixels: 0,
		page: router.route,
	});
	
	const wheelListener = (e: React.WheelEvent) => {
		console.log(scrollRef.current);
		clearTimeout(throttle);
		const { deltaY } = e;
		const direction: Direction = deltaY < 0 ? "up" : "down";
		scrollRef.current.pixels = clamp(scrollRef.current.pixels + deltaY, NavigateThreshold, 0);
		throttle = setTimeout(() => {
			if (scrollRef.current.pixels === NavigateThreshold || scrollRef.current.pixels === 0) {
				const nextRoute = getNextRoute(router.route, direction);
				if (router.route !== nextRoute) {
					scrollRef.current.page = nextRoute;
					scrollRef.current.pixels = 0;
					router.push(scrollRef.current.page)
						.then(() => console.log("done"));
				}
			}
		}, 200);
	}
	console.log("render");
	return (
		<div 
			className="app"
			onWheel={wheelListener}
		>
			<Navbar isOnTop={router.route !== "/"} linksVisible={router.route !== "/" && router.route !== "/esperienze"} />
			<AnimatePresence exitBeforeEnter>
				<Component {...pageProps} key={router.route} />
			</AnimatePresence>
		</div>
	);
};

export default App;
