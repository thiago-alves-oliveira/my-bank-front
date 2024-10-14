import { OperationTypeEnum } from "./enums"
import { getOperationType } from "./functions"

export const BANK_OPERATIONS_TABLE_COLUMNS = [
	"Nome do Banco",
	"Conta",
	"Agência",
	"Valor",
	"Tipo de Operação",
] as const

export const OPERATION_TYPE_OPTIONS = Object.values(OperationTypeEnum)
	.filter(v => typeof v === "number")
	.map(v => ({
		value: v,
		label: getOperationType(v),
	}))
