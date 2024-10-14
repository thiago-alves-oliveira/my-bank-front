import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import Link from "next/link"
import type { ILink } from "../../hooks/use-links"

interface IDefaultLinkProps {
	link: ILink
	isCollapsed: boolean
}

export function DefaultLink({ link, isCollapsed }: IDefaultLinkProps) {
	return (
		<Button
			key={link.href}
			variant="link"
			className={cn(
				"w-full h-12 text-muted-foreground flex gap-3 items-center justify-start relative transition-all hover:text-brand-primary-500 hover:no-underline",
				{
					"font-semibold text-brand-primary-500 pointer-events-none":
						link.isActive,
				},
				{
					"justify-center overflow-hidden": isCollapsed,
				},
			)}
			asChild
		>
			<Link href={link.href as string}>
				{link.icon}
				<span
					className={cn("transition-all duration-0", {
						"opacity-0 absolute left-20": isCollapsed,
					})}
				>
					{link.label}
				</span>
			</Link>
		</Button>
	)
}
