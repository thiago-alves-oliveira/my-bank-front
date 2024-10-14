"use client"

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function goBack(router: AppRouterInstance, path: string) {
	if (window.history?.length && window.history.length > 1) {
		router.back()
	} else {
		router.replace(path)
	}
}
