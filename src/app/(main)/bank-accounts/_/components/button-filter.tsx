import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDown, ListFilter } from "lucide-react"

export function BankAccountsButtonFilter() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-full sm:w-auto">
					<ListFilter className="mr-2 size-4" /> Filtros
					<ChevronDown className="ml-2 size-4" />
				</Button>
			</PopoverTrigger>

			<PopoverContent side="bottom" align="start">
				<h4 className="font-semibold leading-none">Filtros</h4>
			</PopoverContent>
		</Popover>
	)
}
