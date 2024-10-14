import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { api } from "@/lib/api"
import type { IDebitOperationSchema } from "../utils/schemas"

async function debitOperationFn(payload: IDebitOperationSchema) {
	return await api.post("IOBBank/debit", payload)
}

export function useDebitOperationMutation() {
	const queryClient = useQueryClient()

	const router = useRouter()

	return useMutation({
		mutationFn: debitOperationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["bankOperations"],
			})

			toast.success("Operação de débito realizada com sucesso!")
			goBack(router, routes.bankOperations.path)
		},
		onError: error => {
			let message = "Falha ao realizar operação de débito"

			if (error) {
				message = error.message
			}

			toast.error(message)
		},
	})
}
