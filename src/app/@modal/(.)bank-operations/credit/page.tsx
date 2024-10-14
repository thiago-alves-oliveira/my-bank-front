"use client"

import { useRouter } from "next/navigation"

import { CreditOperationForm } from "@/app/(main)/bank-operations/credit/_/components/credit-operation-form"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

export default function InterceptedCreditOperationPage() {
	const router = useRouter()

	function onCancel() {
		router.back()
	}

	return (
		<Dialog open={true} onOpenChange={onCancel}>
			<DialogContent
				className="sm:max-w-[800px]"
				aria-describedby="Operação - Crédito"
			>
				<DialogHeader>
					<DialogTitle>Operação - Crédito</DialogTitle>
				</DialogHeader>

				<CreditOperationForm onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	)
}
