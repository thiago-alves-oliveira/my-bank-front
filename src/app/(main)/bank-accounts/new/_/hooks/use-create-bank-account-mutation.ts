import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { api } from "@/lib/api"
import type { ICreateBankAccountSchema } from "../utils/schemas"

async function createBankAccountFn(payload: ICreateBankAccountSchema) {
	return await api.post("IOBBank/banck-account", payload)
}

export function useCreateBankAccountMutation() {
	const queryClient = useQueryClient()

	const router = useRouter()

	return useMutation({
		mutationFn: createBankAccountFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["bankAccounts"],
			})

			toast.success("Conta criada com sucesso!")
			goBack(router, routes.bankAccounts.path)
		},
		onError: error => {
			let message = "Falha ao criar conta"

			if (error) {
				message = error.message
			}

			toast.error(message)
		},
	})
}
