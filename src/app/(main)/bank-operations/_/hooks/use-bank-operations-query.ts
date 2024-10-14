import { useQuery } from "@tanstack/react-query"
import { OperationTypeEnum } from "../utils/enums"

// interface IBankOperationsAPIProxyResponse {
// 	pagination?: {
// 		totalElements?: number
// 		pageSize?: number
// 		pageNumber?: number
// 		totalPages?: number
// 	}
// 	result: {
// 		id: string
// 		bankName?: string
// 		account?: number
// 		branch?: number
// 		value?: number
// 		operationType?: OperationTypeEnum
// 	}[]
// }

async function getBankOperationsFn(params: Record<string, string>) {
	console.log("params", params)

	// Uncomment when api is ready
	// await api.get<IBankOperationsAPIProxyResponse>("IOBBank/history-transfer", {
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
				account: 10,
				branch: 1230,
				value: 100,
				operationType: OperationTypeEnum.Credit,
			},
		],
	}
}

export function useBankOperationsQuery(params: Record<string, string>) {
	return useQuery({
		queryKey: ["bankOperations", params],
		queryFn: () => getBankOperationsFn(params),
	})
}
