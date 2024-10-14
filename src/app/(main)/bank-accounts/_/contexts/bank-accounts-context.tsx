import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
} from "react"

import { useBankAccountsQuery } from "../hooks/use-bank-accounts-query"

interface IBankAccountsContextProviderProps {
	children: ReactNode
}

interface IContextType {
	query: ReturnType<typeof useBankAccountsQuery>
	filter: (_name: string, _value?: string | null) => void
}

const BankAccountsContext = createContext({} as IContextType)

export function useBankAccountsContext() {
	const context = useContext(BankAccountsContext)

	if (!context) {
		throw new Error(
			"useBankAccountsContext must be used within a BankAccountsProvider",
		)
	}

	return context
}

export function BankAccountsContextProvider({
	children,
}: IBankAccountsContextProviderProps) {
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

	const query = useBankAccountsQuery(params)

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
		<BankAccountsContext.Provider value={value}>
			{children}
		</BankAccountsContext.Provider>
	)
}
