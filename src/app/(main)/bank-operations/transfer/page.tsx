"use client"

import { useRouter } from "next/navigation"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { TransferOperationForm } from "./_/components/transfer-operation-form"

export default function TransferOperationPage() {
	const router = useRouter()

	function onCancel() {
		goBack(router, routes.bankAccounts.path)
	}

	return (
		<div className="mx-auto sm:max-w-[800px]">
			<TransferOperationForm onCancel={onCancel} fromModal={false} />
		</div>
	)
}
