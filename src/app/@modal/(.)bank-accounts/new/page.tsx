"use client"

import { useRouter } from "next/navigation"

import { NewBankAccountForm } from "@/app/(main)/bank-accounts/new/_/components/new-bank-account-form"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

export default function InterceptedNewBankAccountPage() {
	const router = useRouter()

	function onCancel() {
		router.back()
	}

	return (
		<Dialog open={true} onOpenChange={onCancel}>
			<DialogContent
				className="sm:max-w-[800px]"
				aria-describedby="Cadastrar Conta"
			>
				<DialogHeader>
					<DialogTitle>Cadastrar Conta</DialogTitle>
				</DialogHeader>

				<NewBankAccountForm onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	)
}
