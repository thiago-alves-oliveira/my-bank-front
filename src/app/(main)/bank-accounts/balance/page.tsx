import { redirect } from "next/navigation"

import { routes } from "@/constants/routes"

export default function BankAccountBalancePage() {
	return redirect(routes.bankAccounts.path)
}
