import { usePathname } from "next/navigation"
import { type ReactNode, useMemo } from "react"

import { routes } from "@/constants/routes"
import {
	BadgePlus,
	HandCoins,
	Landmark,
	LayoutDashboard,
	Minus,
	PackageIcon,
	Plus,
	RefreshCcw,
} from "lucide-react"

export interface ILink {
	icon: ReactNode
	label: string
	href?: string
	isActive?: boolean
	subLinks?: ILink[]
}

export function useLinks() {
	const pathname = usePathname()

	const links = useMemo<ILink[]>(
		() => [
			{
				icon: <LayoutDashboard className="size-5" />,
				label: "Dashboard",
				href: routes.dashboard.path,
				isActive: pathname === routes.dashboard.path,
			},
			{
				icon: <Landmark className="size-5" />,
				label: "Contas",
				subLinks: [
					{
						icon: <PackageIcon className="size-5" />,
						label: "Listagem",
						href: routes.bankAccounts.path,
						isActive: pathname === routes.bankAccounts.path,
					},
					{
						icon: <BadgePlus className="size-5" />,
						label: "Cadastro",
						href: routes.bankAccounts.create.path,
						isActive: pathname === routes.bankAccounts.create.path,
					},
				],
			},
			{
				icon: <HandCoins className="size-5" />,
				label: "Operações",
				subLinks: [
					{
						icon: <PackageIcon className="size-5" />,
						label: "Listagem",
						href: routes.bankOperations.path,
						isActive: pathname === routes.bankOperations.path,
					},
					{
						icon: <Plus className="size-5" />,
						label: "Crédito",
						href: routes.bankOperations.credit.path,
						isActive: pathname === routes.bankOperations.credit.path,
					},
					{
						icon: <Minus className="size-5" />,
						label: "Débito",
						href: routes.bankOperations.debit.path,
						isActive: pathname === routes.bankOperations.debit.path,
					},
					{
						icon: <RefreshCcw className="size-5" />,
						label: "Transferência",
						href: routes.bankOperations.transfer.path,
						isActive: pathname === routes.bankOperations.transfer.path,
					},
				],
			},
		],
		[pathname],
	)

	return links
}
