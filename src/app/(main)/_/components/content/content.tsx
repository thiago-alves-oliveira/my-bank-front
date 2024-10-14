import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { Header } from "./header/header"

interface IContentProps {
	children: ReactNode
	isSidebarCollapsed: boolean
}

export function Content({ children, isSidebarCollapsed }: IContentProps) {
	return (
		<section
			className={cn(
				"ml-64 pr-6 pb-6 w-full transition-all flex flex-col flex-1",
				{
					"ml-24": isSidebarCollapsed,
				},
			)}
		>
			<Header />

			<div
				className={cn(
					"py-6 px-6 max-w-[calc(100vw-16rem)] border border-gray-200 rounded-xl bg-background flex-1 transition-all",
					{
						"max-w-[calc(100vw-6rem)]": isSidebarCollapsed,
					},
				)}
			>
				{children}
			</div>
		</section>
	)
}
