import { z } from "zod"

export const createBankAccountSchema = z.object({
	name: z.string().min(1, "Campo obrigatório"),
	account: z.coerce
		.number({
			invalid_type_error: "Campo obrigatório",
		})
		.min(0, "Campo obrigatório"),
	branch: z.coerce
		.number({
			invalid_type_error: "Campo obrigatório",
		})
		.min(0, "Campo obrigatório"),
	balance: z.coerce
		.number({
			invalid_type_error: "Campo obrigatório",
		})
		.min(0, "Campo obrigatório"),
})

export type ICreateBankAccountSchema = z.infer<typeof createBankAccountSchema>
