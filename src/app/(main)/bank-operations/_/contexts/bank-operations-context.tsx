import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
} from "react"

import { useBankOperationsQuery } from "../hooks/use-bank-operations-query"

interface IBankOperationsContextProviderProps {
	children: ReactNode
}

interface IContextType {
	query: ReturnType<typeof useBankOperationsQuery>
	filter: (_name: string, _value?: string | null) => void
}

const BankOperationsContext = createContext({} as IContextType)

export function useBankOperationsContext() {
	const context = useContext(BankOperationsContext)

	if (!context) {
		throw new Error(
			"useBankOperationsContext must be used within a BankOperationsProvider",
		)
	}

	return context
}

export function BankOperationsContextProvider({
	children,
}: IBankOperationsContextProviderProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const params = useMemo(() => {
		const base = {
			pageSize: searchParams.get("page_size") ?? "10",
			pageNumber: searchParams.get("page_number") ?? "0",
		}
		const withoutEmpty = Object.fromEntries(
			Object.entries(base).filter(([_, v]) => v != null),
		)

		return withoutEmpty
	}, [searchParams])

	const query = useBankOperationsQuery(params)

	const filter = useCallback(
		(name: string, value?: string | null) => {
			const params = new URLSearchParams(searchParams.toString())

			if (!value) {
				params.delete(name)
			} else {
				params.set(name, value)
			}

			router.push(`${pathname}?${params.toString()}`)
		},
		[pathname, router, searchParams],
	)

	const value = useMemo<IContextType>(
		() => ({ query, filter }),
		[query, filter],
	)

	return (
		<BankOperationsContext.Provider value={value}>
			{children}
		</BankOperationsContext.Provider>
	)
}
