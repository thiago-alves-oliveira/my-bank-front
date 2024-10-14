import { usePathname } from "next/navigation"
import { Fragment, useCallback } from "react"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { routes } from "@/constants/routes"

import Link from "next/link"
import { NAVIGATION_TITLES } from "../../../utils/constants"
import { uuidSchema } from "../../../utils/schemas"

export function Navigation() {
	const pathname = usePathname()

	const generateItems = useCallback(() => {
		const items = pathname.split("/").filter(Boolean)

		if (items.length === 0)
			return [{ title: "Dashboard", href: routes.dashboard.path }]

		const generatedItems = items.flatMap((item, index) => {
			const href = `/${items.slice(0, index + 1).join("/")}`

			// Se a rota for um UUID, então ela representa a tela de edição
			const result = uuidSchema.safeParse(item)

			if (result.success) {
				return null
			}

			return [{ title: NAVIGATION_TITLES[item], href }]
		})

		const filteredItems = generatedItems.filter(Boolean) as {
			title: string
			href: string
		}[]

		return filteredItems
	}, [pathname])

	const items = generateItems()

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, index) => {
					const isLast = index === items.length - 1

					if (isLast) {
						return (
							<BreadcrumbItem key={item.href}>
								<BreadcrumbPage className="text-lg font-bold text-brand-primary-500">
									{item.title}
								</BreadcrumbPage>
							</BreadcrumbItem>
						)
					}

					return (
						<Fragment key={item.href}>
							<BreadcrumbItem>
								<BreadcrumbLink className="text-lg font-medium " asChild>
									<Link href={item.href}>{item.title}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</Fragment>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
