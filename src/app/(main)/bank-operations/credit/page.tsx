"use client"

import { useRouter } from "next/navigation"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { CreditOperationForm } from "./_/components/credit-operation-form"

export default function CreditOperationPage() {
	const router = useRouter()

	function onCancel() {
		goBack(router, routes.bankAccounts.path)
	}

	return (
		<div className="mx-auto sm:max-w-[800px]">
			<CreditOperationForm onCancel={onCancel} fromModal={false} />
		</div>
	)
}
