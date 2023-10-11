"use client";
import Nav from "@/components/nav";
import "./globals.css";
import { Inter } from "next/font/google";
import StateProvider from "@/redux/provider";
import nprogress from "nprogress";

const inter = Inter({ subsets: ["latin"] });

nprogress.configure({
	showSpinner: false,
	trickleSpeed: 200,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className=" overflow-hidden sm:text-sm bg-gray-100 h-[100svh]">
			<head>
				<title>Gaming Keys</title>
				<meta name="description" content="Description" />
			</head>
			<StateProvider>
				<body className={`${inter.className} sm:text-sm bg-gray-100 overflow-hidden h-[100svh] w-full`}>
					<Nav />
					{children}
				</body>
			</StateProvider>
		</html>
	);
}
