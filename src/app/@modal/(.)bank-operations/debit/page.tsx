"use client"

import { useRouter } from "next/navigation"

import { DebitOperationForm } from "@/app/(main)/bank-operations/debit/_/components/debit-operation-form"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

export default function InterceptedDebitOperationPage() {
	const router = useRouter()

	function onCancel() {
		router.back()
	}

	return (
		<Dialog open={true} onOpenChange={onCancel}>
			<DialogContent
				className="sm:max-w-[800px]"
				aria-describedby="Operação - Débito"
			>
				<DialogHeader>
					<DialogTitle>Operação - Débito</DialogTitle>
				</DialogHeader>

				<DebitOperationForm onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	)
}
