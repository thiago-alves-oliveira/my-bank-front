import { useQuery } from "@tanstack/react-query"

// interface IAllBankAccountsAPIProxyResponse {
// 	result: {
// 		id: string
// 		bankName?: string
// 	}[]
// 	errors: string[]
// 	isValid: boolean
// }

async function getAllBankAccountsFn() {
	// Uncomment when api is ready
	// const { data } = await api.get<IAllBankAccountsAPIProxyResponse>("IOBBank", {
	// 	params,
	// })

	// return data

	return {
		result: [
			{
				id: "1",
				bankName: "Banco 1",
			},
			{
				id: "2",
				bankName: "Banco 2",
			},
		],
	}
}

export function useAllBankAccountsQuery() {
	return useQuery({
		queryKey: ["allBankAccounts"],
		queryFn: getAllBankAccountsFn,
	})
}
