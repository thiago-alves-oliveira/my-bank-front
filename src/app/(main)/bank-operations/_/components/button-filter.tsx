import { AdvancedSelectInput } from "@/components/form/advanced-select-input/advanced-select-input"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDown, ListFilter } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useBankOperationsContext } from "../contexts/bank-operations-context"
import { OPERATION_TYPE_OPTIONS } from "../utils/constants"

export function BankOperationsButtonFilter() {
	const { filter } = useBankOperationsContext()

	const searchParams = useSearchParams()
	const operationType = searchParams.get("operation_type")

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-full sm:w-auto">
					<ListFilter className="mr-2 size-4" /> Filtros
					<ChevronDown className="ml-2 size-4" />
				</Button>
			</PopoverTrigger>

			<PopoverContent side="bottom" align="start">
				<h4 className="font-semibold leading-none">Filtros</h4>

				<div className="mt-4 space-y-4">
					{/* TODO: Implement all bank accounts query and filter */}
					<AdvancedSelectInput
						name="bankAccountId"
						options={[]}
						label="Conta Bancária"
						isMulti={false}
						isClearable
					/>
					<AdvancedSelectInput
						name="operationType"
						options={OPERATION_TYPE_OPTIONS}
						onChange={option =>
							filter(
								"operation_type",
								option?.value !== undefined ? String(option.value) : undefined,
							)
						}
						value={
							operationType
								? OPERATION_TYPE_OPTIONS?.find(
										option => option.value === Number(operationType),
									)
								: null
						}
						label="Tipo de Operação"
						isMulti={false}
						isClearable
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}
