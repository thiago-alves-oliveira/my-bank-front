import { z } from "zod"

export const creditOperationSchema = z.object({
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

export type ICreditOperationSchema = z.infer<typeof creditOperationSchema>
