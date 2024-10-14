import { z } from "zod"
import { OperationTypeEnum } from "../../../_/utils/enums"

export const transferOperationSchema = z.object({
	originBankAccountId: z
		.string({
			required_error: "Campo obrigatório",
		})
		.min(1, "Campo obrigatório"),
	destinationBankAccountId: z
		.string({
			required_error: "Campo obrigatório",
		})
		.min(1, "Campo obrigatório"),
	operationType: z.nativeEnum(OperationTypeEnum, {
		errorMap: () => ({
			message: "Campo obrigatório",
		}),
	}),
	value: z.coerce
		.number({
			invalid_type_error: "Campo obrigatório",
		})
		.min(0, "Campo obrigatório"),
})

export type ITransferOperationSchema = z.infer<typeof transferOperationSchema>
