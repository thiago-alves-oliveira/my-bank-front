import type { FieldError } from "react-hook-form"
import { NumericFormat, type NumericFormatProps } from "react-number-format"

import { cn } from "@/lib/utils"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface ICurrencyInputProps extends Omit<NumericFormatProps, "onChange"> {
	name: string
	onChange: (_value?: number) => void
	label?: string
	error?: FieldError
}

export function CurrencyInput({
	name,
	onChange,
	label,
	error,
	...rest
}: ICurrencyInputProps) {
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
				maxLength={18}
				prefix="R$ "
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
