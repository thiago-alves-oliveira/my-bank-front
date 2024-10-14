"use client"

import { useRouter } from "next/navigation"

import { BalanceDetails } from "@/app/(main)/bank-accounts/balance/[id]/_/components/balance-details"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

export default function InterceptedBankAccountBalancePage({
	params,
}: {
	params: { id: string }
}) {
	const router = useRouter()

	function onCancel() {
		router.back()
	}

	return (
		<Dialog open={true} onOpenChange={onCancel}>
			<DialogContent
				className="sm:max-w-[800px]"
				aria-describedby="Saldo da Conta"
			>
				<DialogHeader>
					<DialogTitle>Saldo da Conta</DialogTitle>
				</DialogHeader>

				<BalanceDetails id={params.id} onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	)
}
