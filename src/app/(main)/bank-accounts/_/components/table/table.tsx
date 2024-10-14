import { useSearchParams } from "next/navigation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { TablePagination } from "@/components/utils/table-pagination"
import { routes } from "@/constants/routes"

import { TriangleAlert } from "lucide-react"
import Link from "next/link"
import { useBankAccountsContext } from "../../contexts/bank-accounts-context"
import { BANK_ACCOUNTS_TABLE_COLUMNS } from "../../utils/constants"

export function BankAccountsTable() {
	const {
		query: { data, isLoading, isError },
		filter,
	} = useBankAccountsContext()

	const searchParams = useSearchParams()
	const pageSize = Number(searchParams.get("page_size") ?? 10)
	const pageNumber = Number(searchParams.get("page_number") ?? 0)

	if (isError) {
		return (
			<Alert variant="destructive" className="bg-red-50">
				<TriangleAlert className="size-4" />
				<AlertTitle>Erro</AlertTitle>
				<AlertDescription>
					Não foi possível carregar as contas bancárias. Por favor, tente
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
							{BANK_ACCOUNTS_TABLE_COLUMNS.map(column => (
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
									<TableCell className="py-3 px-4 w-3/4">
										{bankAccount.bankName ?? "-"}
									</TableCell>
									<TableCell className="py-3 px-4">
										<Button size="sm" asChild>
											<Link
												href={routes.bankAccounts.balance.path(bankAccount.id)}
											>
												Consultar saldo
											</Link>
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={BANK_ACCOUNTS_TABLE_COLUMNS.length}
									className="py-3 px-4 text-center"
								>
									Nenhuma conta encontrada.
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
