import { useRef } from "react"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function BankOperationsTextFilter() {
	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<div className="w-full sm:w-72 relative">
			<Search className="size-5 absolute top-2 left-2" />
			<Input
				ref={inputRef}
				className="pl-10 w-full bg-gray-100"
				placeholder="Buscar pelo nome da conta"
			/>
		</div>
	)
}
