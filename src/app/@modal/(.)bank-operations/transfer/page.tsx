"use client"

import { useRouter } from "next/navigation"

import { TransferOperationForm } from "@/app/(main)/bank-operations/transfer/_/components/transfer-operation-form"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

export default function InterceptedTransferOperationPage() {
	const router = useRouter()

	function onCancel() {
		router.back()
	}

	return (
		<Dialog open={true} onOpenChange={onCancel}>
			<DialogContent
				className="sm:max-w-[800px]"
				aria-describedby="Operação - Transferência"
			>
				<DialogHeader>
					<DialogTitle>Operação - Transferência</DialogTitle>
				</DialogHeader>

				<TransferOperationForm onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	)
}
