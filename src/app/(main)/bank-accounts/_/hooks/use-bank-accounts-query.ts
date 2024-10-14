import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

interface IBankAccountsAPIProxyResponse {
	pagination?: {
		totalElements?: number
		pageSize?: number
		pageNumber?: number
		totalPages?: number
	}
	result: {
		id: string
		bankName?: string
	}[]
}

async function getBankAccountsFn(params: Record<string, string>) {
	console.log("params", params)

	const { data } = await api.get<IBankAccountsAPIProxyResponse>("IOBBank", {
		// Uncomment when api is ready
		// params,
	})

	return data
}

export function useBankAccountsQuery(params: Record<string, string>) {
	return useQuery({
		queryKey: ["bankAccounts", params],
		queryFn: () => getBankAccountsFn(params),
	})
}
