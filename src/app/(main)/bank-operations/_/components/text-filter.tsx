import { useRef } from "react"

import { Input } from "@/components/ui/input"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useBankOperationsContext } from "../contexts/bank-operations-context"

export function BankOperationsTextFilter() {
	const { filter } = useBankOperationsContext()

	const searchParams = useSearchParams()
	const name = searchParams.get("name") ?? ""

	const inputRef = useRef<HTMLInputElement>(null)

	const handleChange = debounce(() => {
		filter("name", inputRef.current?.value)
	}, 700)

	return (
		<div className="w-full sm:w-72 relative">
			<Search className="size-5 absolute top-2 left-2" />
			<Input
				ref={inputRef}
				className="pl-10 w-full bg-gray-100"
				placeholder="Buscar pelo nome da conta"
				defaultValue={name}
				onChange={handleChange}
			/>
		</div>
	)
}
