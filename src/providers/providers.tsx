import type { ReactNode } from "react"
import QueryProvider from "./query-provider"

interface IProvidersProps {
	children: ReactNode
}

export function Providers({ children }: IProvidersProps) {
	return <QueryProvider>{children}</QueryProvider>
}
