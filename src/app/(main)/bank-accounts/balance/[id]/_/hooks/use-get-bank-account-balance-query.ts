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
	const { data } = await api.get<IGetBankAccountBalanceAPIProxyResponse>("IOBBank/balance", {
		params: {
			BankAccountId: id,
		},
	})
	return data	
}

export function useGetBankAccountBalanceQuery(id: string) {
	return useQuery({
		queryKey: ["bankAccountBalance", id],
		queryFn: () => getBankAccountBalanceFn(id),
	})
}
