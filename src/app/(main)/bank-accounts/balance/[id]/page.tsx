"use client"

import { useRouter } from "next/navigation"

import { routes } from "@/constants/routes"
import { goBack } from "@/utils/routing"

import { BalanceDetails } from "./_/components/balance-details"

export default function BankAccountBalancePage({
	params,
}: { params: { id: string } }) {
	const router = useRouter()

	function onCancel() {
		goBack(router, routes.bankAccounts.path)
	}

	return (
		<div className="mx-auto sm:max-w-[800px]">
			<BalanceDetails id={params.id} onCancel={onCancel} fromModal={false} />
		</div>
	)
}
