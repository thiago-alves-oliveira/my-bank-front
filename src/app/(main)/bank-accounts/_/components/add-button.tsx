import { Button } from "@/components/ui/button"
import { routes } from "@/constants/routes"
import { CirclePlus } from "lucide-react"
import Link from "next/link"

export function AddBankAccountButton() {
	return (
		<Button asChild>
			<Link href={routes.bankAccounts.create.path}>
				<CirclePlus className="mr-2 size-4" /> Adicionar conta
			</Link>
		</Button>
	)
}
