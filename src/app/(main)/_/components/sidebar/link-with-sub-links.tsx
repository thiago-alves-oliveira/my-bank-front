import { useDebounce } from "@uidotdev/usehooks"
import Link from "next/link"
import { useState } from "react"

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import type { ILink } from "../../hooks/utils/use-links"

interface ILinkWithSubLinksProps {
	link: ILink
	isCollapsed: boolean
}

export function LinkWithSubLinks({
	link,
	isCollapsed,
}: ILinkWithSubLinksProps) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const debouncedOpen = useDebounce(isPopoverOpen, 200)

	function openPopover() {
		setIsPopoverOpen(true)
	}

	function closePopover() {
		setIsPopoverOpen(false)
	}

	if (isCollapsed) {
		return (
			<Popover
				key={link.label}
				open={debouncedOpen}
				onOpenChange={setIsPopoverOpen}
			>
				<PopoverTrigger
					onMouseEnter={openPopover}
					onMouseLeave={closePopover}
					onClick={e => {
						e.preventDefault()
					}}
					asChild
				>
					<Button
						variant="link"
						className={cn(
							"w-full h-12 flex items-center justify-center transition-colors hover:text-brand-primary-500",
							{
								"font-semibold text-brand-primary-500 pointer-events-none":
									link.isActive,
							},
						)}
					>
						{link.icon}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					side="right"
					className="p-2"
					onMouseEnter={openPopover}
					onMouseLeave={closePopover}
				>
					{link.subLinks?.map(subLink => (
						<Button
							key={subLink.href}
							variant="link"
							className={cn(
								"w-full text-muted-foreground flex gap-3 items-center justify-start relative transition-all hover:bg-zinc-100 hover:text-brand-primary-500 hover:no-underline",
								{
									"font-semibold text-brand-primary-500 pointer-events-none":
										subLink.isActive,
								},
							)}
							asChild
						>
							<Link href={subLink.href as string}>
								{subLink.icon}
								{subLink.label}
							</Link>
						</Button>
					))}
				</PopoverContent>
			</Popover>
		)
	}

	return (
		<AccordionItem
			key={link.label}
			value={`accordion-${link.label}`}
			className="border-none"
		>
			<AccordionTrigger className="pl-4 w-full h-12 flex gap-3 items-center hover:no-underline">
				<div
					className={cn("text-muted-foreground flex gap-3 items-center", {
						"font-semibold text-brand-primary-500": link.subLinks?.some(
							subLink => subLink.isActive,
						),
					})}
				>
					{link.icon}
					{link.label}
				</div>
			</AccordionTrigger>
			<AccordionContent className="pl-4 space-y-1">
				{link.subLinks?.map(subLink => (
					<Button
						key={subLink.href}
						variant="link"
						className={cn(
							"py-4 w-full text-muted-foreground flex gap-3 items-center justify-start transition-colors hover:text-brand-primary-500 hover:no-underline",
							{
								"font-semibold text-brand-primary-500 pointer-events-none":
									subLink.isActive,
							},
						)}
						asChild
					>
						<Link href={subLink.href as string}>
							{subLink.icon}
							{subLink.label}
						</Link>
					</Button>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}
