import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

interface IAllBankAccountsAPIProxyResponse {
	result: {
		id: string
		bankName?: string
	}[]
	errors: string[]
	isValid: boolean
}

async function getAllBankAccountsFn() {
	const { data } = await api.get<IAllBankAccountsAPIProxyResponse>("IOBBank", {
		
	})

	return data	
}

export function useAllBankAccountsQuery() {
	return useQuery({
		queryKey: ["allBankAccounts"],
		queryFn: getAllBankAccountsFn,
	})
}
