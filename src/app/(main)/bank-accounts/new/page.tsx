"use client"

import { useRouter } from "next/navigation"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { NewBankAccountForm } from "./_/components/new-bank-account-form"

export default function NewBankAccountPage() {
	const router = useRouter()

	function onCancel() {
		goBack(router, routes.bankAccounts.path)
	}

	return (
		<div className="mx-auto sm:max-w-[800px]">
			<NewBankAccountForm onCancel={onCancel} fromModal={false} />
		</div>
	)
}
