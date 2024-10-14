import { useQuery } from "@tanstack/react-query"
import { OperationTypeEnum } from "../utils/enums"
import { api } from "@/lib/api"

interface IBankOperationsAPIProxyResponse {
	pagination?: {
		totalElements?: number
		pageSize?: number
		pageNumber?: number
		totalPages?: number
	}
	result: {
		id: string
		name: string
		bankName?: string
		account?: number
		branch?: number
		balance?: number
		operationType?: OperationTypeEnum
	}[]
}

async function getBankOperationsFn(params: Record<string, string>) {
	const {data } = await api.get<IBankOperationsAPIProxyResponse>("IOBBank/history-transfer", {
		params,
	})
	return data	
}

export function useBankOperationsQuery(params: Record<string, string>) {
	return useQuery({
		queryKey: ["bankOperations", params],
		queryFn: () => getBankOperationsFn(params),
	})
}
