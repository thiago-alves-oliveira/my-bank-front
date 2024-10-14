import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

interface IGetBankAccountBalanceAPIProxyResponse {
	result: {
		id: string
		balance?: number
	}
	errors: string[]
	isValid: boolean
}

async function getBankAccountBalanceFn(id: string) {
	await api.get<IGetBankAccountBalanceAPIProxyResponse>("IOBBank/balance", {
		params: {
			BankAccountId: id,
		},
	})

	// Uncomment when the API is ready
	// return data

	return {
		result: {
			id: "00000000-0000-0000-0000-000000000000",
			balance: 1490,
		},
		errors: [],
		isValid: true,
	}
}

export function useGetBankAccountBalanceQuery(id: string) {
	return useQuery({
		queryKey: ["bankAccountBalance", id],
		queryFn: () => getBankAccountBalanceFn(id),
	})
}
