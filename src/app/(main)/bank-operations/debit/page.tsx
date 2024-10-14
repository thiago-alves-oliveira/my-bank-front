"use client"

import { useRouter } from "next/navigation"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { DebitOperationForm } from "./_/components/debit-operation-form"

export default function DebitOperationPage() {
	const router = useRouter()

	function onCancel() {
		goBack(router, routes.bankAccounts.path)
	}

	return (
		<div className="mx-auto sm:max-w-[800px]">
			<DebitOperationForm onCancel={onCancel} fromModal={false} />
		</div>
	)
}
