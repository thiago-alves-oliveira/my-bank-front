import type { FieldError } from "react-hook-form"
import { NumericFormat, type NumericFormatProps } from "react-number-format"

import { cn } from "@/lib/utils"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface INumberInputProps extends Omit<NumericFormatProps, "onChange"> {
	name: string
	onChange: (_value?: number) => void
	label?: string
	error?: FieldError
}

export function NumberInput({
	name,
	onChange,
	label,
	error,
	...rest
}: INumberInputProps) {
	const hasError = !!error

	return (
		<div className="flex flex-col gap-2">
			{label && <Label htmlFor={name}>{label}</Label>}

			<NumericFormat
				id={name}
				name={name}
				customInput={Input}
				className={cn({
					"border-red-500 focus-visible:ring-red-500": hasError,
				})}
				onValueChange={val => onChange(val.floatValue)}
				thousandSeparator="."
				decimalSeparator=","
				decimalScale={2}
				allowLeadingZeros={false}
				{...rest}
			/>

			{hasError && (
				<span className="text-red-500 text-xs font-medium">
					{error.message}
				</span>
			)}
		</div>
	)
}
