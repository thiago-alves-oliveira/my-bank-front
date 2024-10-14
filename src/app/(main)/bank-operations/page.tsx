"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Suspense } from "react"
import { BankOperationsButtonFilter } from "./_/components/button-filter"
import { BankOperationsTable } from "./_/components/table/table"
import { BankOperationsTextFilter } from "./_/components/text-filter"
import { BankOperationsContextProvider } from "./_/contexts/bank-operations-context"

export default function BankOperationsPage() {
	return (
		<Suspense>
			<BankOperationsContextProvider>
				<Card>
					<CardHeader className="w-full flex flex-row items-start justify-between">
						<div className="space-y-1.5">
							<CardTitle className="text-2xl">Operações Bancárias</CardTitle>
							<CardDescription>
								Listagem de todas as operações bancárias registradas.
							</CardDescription>
						</div>

						<div className="flex gap-4">
							<BankOperationsTextFilter />
							<BankOperationsButtonFilter />
						</div>
					</CardHeader>

					<CardContent>
						<BankOperationsTable />
					</CardContent>
				</Card>
			</BankOperationsContextProvider>
		</Suspense>
	)
}
