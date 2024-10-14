import type { ReactNode } from "react"
import QueryProvider from "./query-provider"
import { ThemeProvider } from "./theme-provider"

interface IProvidersProps {
	children: ReactNode
}

export function Providers({ children }: IProvidersProps) {
	return (
		<QueryProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</QueryProvider>
	)
}
