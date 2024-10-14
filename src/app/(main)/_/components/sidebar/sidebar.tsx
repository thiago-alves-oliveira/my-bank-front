import { Menu } from "lucide-react"

import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useLinks } from "../../hooks/use-links"
import { DefaultLink } from "./default-link"
import { LinkWithSubLinks } from "./link-with-sub-links"

interface ISidebarProps {
	isCollapsed: boolean
	toggleSidebar: () => void
}

export function Sidebar({ isCollapsed, toggleSidebar }: ISidebarProps) {
	const links = useLinks()

	return (
		<aside
			className={cn(
				"py-8 pl-4 pr-8 w-64 h-screen bg-gray-50 dark:bg-background fixed overflow-y-auto transition-all",
				{
					"w-24 pr-4": isCollapsed,
				},
			)}
		>
			<div
				className={cn("flex items-center justify-between", {
					"justify-center": isCollapsed,
				})}
			>
				{/* TODO: Add logo */}
				{/* <Image
					src="/images/logo.png"
					alt="Logo da empresa"
					className={cn("pl-4", {
						hidden: isCollapsed,
					})}
					width={112}
					height={112}
					priority
				/> */}
				<h1
					className={cn("pl-4 text-2xl font-bold", {
						hidden: isCollapsed,
					})}
				>
					Logo
				</h1>

				<Button variant="outline" size="icon" onClick={toggleSidebar}>
					<Menu className="size-5" />
				</Button>
			</div>

			<Accordion type="multiple" className="mt-10 w-full space-y-2">
				{links.map(link => {
					if (link.subLinks && !link.href) {
						return (
							<LinkWithSubLinks
								key={link.label}
								link={link}
								isCollapsed={isCollapsed}
							/>
						)
					}

					return (
						<DefaultLink
							key={link.href}
							link={link}
							isCollapsed={isCollapsed}
						/>
					)
				})}
			</Accordion>
		</aside>
	)
}
