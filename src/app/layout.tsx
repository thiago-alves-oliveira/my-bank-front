import type { Metadata } from "next"
import localFont from "next/font/local"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { Providers } from "@/providers/providers"

const rubikSans = localFont({
	src: "./fonts/Rubik.ttf",
	variable: "--font-rubik-sans",
	weight: "100 900",
})

export const metadata: Metadata = {
	title: "Next.js Boilerplate",
	description: "Basic boilerplate for Next.js projects",
}

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<html lang="pt" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-gray-50 font-sans antialiased",
					rubikSans.variable,
				)}
			>
				<NextTopLoader color="#38a169" showSpinner />

				<Providers>
					{children}
					{modal}

					<Toaster position="top-right" duration={2000} richColors />
				</Providers>
			</body>
		</html>
	)
}
