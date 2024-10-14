import { Check, ChevronsUpDown, X } from "lucide-react"
import {
	type ClearIndicatorProps,
	type DropdownIndicatorProps,
	type MultiValueRemoveProps,
	type OptionProps,
	components,
} from "react-select"

const DropdownIndicator = <T, U extends boolean>(
	props: DropdownIndicatorProps<T, U>,
) => (
	<components.DropdownIndicator {...props}>
		<ChevronsUpDown className="h-4 w-4 opacity-50" />
	</components.DropdownIndicator>
)

const ClearIndicator = <T, U extends boolean>(
	props: ClearIndicatorProps<T, U>,
) => (
	<components.ClearIndicator {...props}>
		<X className="h-3.5 w-3.5 opacity-50" />
	</components.ClearIndicator>
)

const MultiValueRemove = <T, U extends boolean>(
	props: MultiValueRemoveProps<T, U>,
) => (
	<components.MultiValueRemove {...props}>
		<X className="h-3 w-3 opacity-50" />
	</components.MultiValueRemove>
)

const Option = <T, U extends boolean>(props: OptionProps<T, U>) => (
	<components.Option {...props}>
		<div className="flex items-center justify-between">
			<div>{props.label}</div>
			{props.isSelected && <Check />}
		</div>
	</components.Option>
)

export { ClearIndicator, DropdownIndicator, MultiValueRemove, Option }
