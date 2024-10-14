import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { api } from "@/lib/api"
import type { ITransferOperationSchema } from "../utils/schemas"

async function transferOperationFn(payload: ITransferOperationSchema) {
	return await api.post("IOBBank/transfer", payload)
}

export function useTransferOperationMutation() {
	const queryClient = useQueryClient()

	const router = useRouter()

	return useMutation({
		mutationFn: transferOperationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["bankOperations"],
			})

			toast.success("Transferência realizada com sucesso!")
			goBack(router, routes.bankOperations.path)
		},
		onError: error => {
			let message = "Falha ao realizar transferência"

			if (error) {
				message = error.message
			}

			toast.error(message)
		},
	})
}
