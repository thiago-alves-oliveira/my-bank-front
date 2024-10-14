import { useSearchParams } from "next/navigation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { TablePagination } from "@/components/utils/table-pagination"

import { maskCurrency } from "@/utils/masks"
import { TriangleAlert } from "lucide-react"
import { useBankOperationsContext } from "../../contexts/bank-operations-context"
import { BANK_OPERATIONS_TABLE_COLUMNS } from "../../utils/constants"
import { getOperationType } from "../../utils/functions"

export function BankOperationsTable() {
	const {
		query: { data, isLoading, isError },
		filter,
	} = useBankOperationsContext()

	const searchParams = useSearchParams()
	const pageSize = Number(searchParams.get("page_size") ?? 10)
	const pageNumber = Number(searchParams.get("page_number") ?? 0)

	if (isError) {
		return (
			<Alert variant="destructive" className="bg-red-50">
				<TriangleAlert className="size-4" />
				<AlertTitle>Erro</AlertTitle>
				<AlertDescription>
					Não foi possível carregar o histórico de operações. Por favor, tente
					novamente.
				</AlertDescription>
			</Alert>
		)
	}

	return (
		<div className="space-y-4">
			{isLoading ? (
				<div className="w-full h-96 rounded-md bg-slate-300 animate-pulse" />
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							{BANK_OPERATIONS_TABLE_COLUMNS.map(column => (
								<TableHead
									key={column}
									className="py-3 px-4 font-medium first:rounded-tl-lg last:rounded-tr-lg"
								>
									{column}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>

					<TableBody>
						{(data?.result.length ?? 0) > 0 ? (
							data?.result.map(bankAccount => (
								<TableRow key={bankAccount.id} className="bg-gray-50">
									<TableCell className="py-3 px-4">
										{bankAccount.bankName ?? "-"}
									</TableCell>
									<TableCell className="py-3 px-4">
										{bankAccount.account ?? "-"}
									</TableCell>
									<TableCell className="py-3 px-4">
										{bankAccount.branch ?? "-"}
									</TableCell>
									<TableCell className="py-3 px-4">
										{maskCurrency(bankAccount.value)}
									</TableCell>
									<TableCell className="py-3 px-4">
										{getOperationType(bankAccount.operationType)}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={BANK_OPERATIONS_TABLE_COLUMNS.length}
									className="py-3 px-4 text-center"
								>
									Nenhuma operação encontrada.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			)}

			{(data?.result.length ?? 0) > 0 && (
				<TablePagination
					total={data?.pagination?.totalElements ?? 0}
					pageSize={pageSize}
					currentPage={pageNumber}
					setCurrentPage={newPage => filter("page_number", String(newPage))}
					setPageSize={newPageSize => filter("page_size", String(newPageSize))}
				/>
			)}
		</div>
	)
}
