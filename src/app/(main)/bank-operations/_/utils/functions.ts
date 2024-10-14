import { OperationTypeEnum } from "./enums"

export const getOperationType = (key?: OperationTypeEnum | null) => {
	if (key === null || key === undefined) return "-"

	const labels: Record<OperationTypeEnum, string> = {
		[OperationTypeEnum.Credit]: "Crédito",
		[OperationTypeEnum.Debit]: "Débito",
		[OperationTypeEnum.Transfer]: "Transferência",
	}

	return labels[key] ?? "-"
}
