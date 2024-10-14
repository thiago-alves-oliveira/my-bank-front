"use client"

import { useState } from "react"

import { Content } from "./_/components/content/content"
import { Sidebar } from "./_/components/sidebar/sidebar"

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

	function toggleSidebar() {
		setIsSidebarCollapsed(prevState => !prevState)
	}

	return (
		<main className="w-full min-h-screen flex">
			<Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
			<Content isSidebarCollapsed={isSidebarCollapsed}>{children}</Content>
		</main>
	)
}
