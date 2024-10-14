import { useQuery } from "@tanstack/react-query"

// interface IBankAccountsAPIProxyResponse {
// 	pagination?: {
// 		totalElements?: number
// 		pageSize?: number
// 		pageNumber?: number
// 		totalPages?: number
// 	}
// 	result: {
// 		id: string
// 		bankName?: string
// 	}[]
// }

async function getBankAccountsFn(params: Record<string, string>) {
	console.log("params", params)

	// Uncomment when api is ready
	// const { data } = await api.get<IBankAccountsAPIProxyResponse>("IOBBank", {
	// 	params,
	// })

	// return data

	return {
		pagination: {
			totalElements: 1,
			pageSize: 10,
			pageNumber: 1,
			totalPages: 1,
		},
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

export function useBankAccountsQuery(params: Record<string, string>) {
	return useQuery({
		queryKey: ["bankAccounts", params],
		queryFn: () => getBankAccountsFn(params),
	})
}
