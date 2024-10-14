"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Suspense } from "react"
import { AddBankAccountButton } from "./_/components/add-button"
import { BankAccountsButtonFilter } from "./_/components/button-filter"
import { BankAccountsTable } from "./_/components/table/table"
import { BankAccountsTextFilter } from "./_/components/text-filter"
import { BankAccountsContextProvider } from "./_/contexts/bank-accounts-context"

export default function BankAccountsPage() {
	return (
		<Suspense>
			<BankAccountsContextProvider>
				<Card>
					<CardHeader className="w-full flex flex-row items-start justify-between">
						<div className="space-y-1.5">
							<CardTitle className="text-2xl">Contas Bancárias</CardTitle>
							<CardDescription>
								Listagem de todas as contas bancárias cadastradas.
							</CardDescription>
						</div>

						<div className="flex gap-4">
							<BankAccountsTextFilter />
							<BankAccountsButtonFilter />
							<AddBankAccountButton />
						</div>
					</CardHeader>

					<CardContent>
						<BankAccountsTable />
					</CardContent>
				</Card>
			</BankAccountsContextProvider>
		</Suspense>
	)
}
