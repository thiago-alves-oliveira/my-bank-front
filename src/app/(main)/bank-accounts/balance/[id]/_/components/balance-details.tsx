"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

import { maskCurrency } from "@/utils/masks"
import { TriangleAlert } from "lucide-react"
import { useGetBankAccountBalanceQuery } from "../hooks/use-get-bank-account-balance-query"

interface IBalanceDetailsProps {
	id: string
	onCancel: () => void
	fromModal?: boolean
}

export function BalanceDetails({
	id,
	onCancel,
	fromModal = true,
}: IBalanceDetailsProps) {
	const { data, isLoading, isError } = useGetBankAccountBalanceQuery(id)

	if (isLoading) {
		return <div className="w-full h-96 rounded-md bg-slate-300 animate-pulse" />
	}

	if (isError) {
		return (
			<Alert variant="destructive" className="bg-red-50">
				<TriangleAlert className="size-4" />
				<AlertTitle>Erro</AlertTitle>
				<AlertDescription>
					Não foi possível carregar o saldo da conta. Por favor, tente
					novamente.
				</AlertDescription>
			</Alert>
		)
	}

	return (
		<div className="space-y-8">
			{!fromModal && <h1 className="font-bold text-2xl">Saldo da Conta</h1>}

			<div className="space-y-8">
				<div className="space-y-4">
					<p>A conta selecionada possui o seguinte valor de saldo:</p>
					<p className="font-bold">{maskCurrency(data?.result.balance)}</p>
				</div>

				<Button variant="outline" type="button" onClick={onCancel}>
					Voltar
				</Button>
			</div>
		</div>
	)
}
