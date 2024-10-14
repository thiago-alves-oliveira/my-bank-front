import { z } from "zod"

export const debitOperationSchema = z.object({
	bankAccountId: z
		.string({
			required_error: "Campo obrigatório",
		})
		.min(1, "Campo obrigatório"),
	value: z.coerce
		.number({
			invalid_type_error: "Campo obrigatório",
		})
		.min(0, "Campo obrigatório"),
})

export type IDebitOperationSchema = z.infer<typeof debitOperationSchema>
