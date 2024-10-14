import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { api } from "@/lib/api"
import type { ICreditOperationSchema } from "../utils/schemas"

async function creditOperationFn(payload: ICreditOperationSchema) {
	return await api.post("IOBBank/credit", payload)
}

export function useCreditOperationMutation() {
	const queryClient = useQueryClient()

	const router = useRouter()

	return useMutation({
		mutationFn: creditOperationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["bankOperations"],
			})

			toast.success("Operação de crédito realizada com sucesso!")
			goBack(router, routes.bankOperations.path)
		},
		onError: error => {
			let message = "Falha ao realizar operação de crédito"

			if (error) {
				message = error.message
			}

			toast.error(message)
		},
	})
}
