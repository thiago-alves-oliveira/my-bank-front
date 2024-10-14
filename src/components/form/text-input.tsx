import { type InputHTMLAttributes, forwardRef } from "react"
import type { FieldError } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
	error?: FieldError
}

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
	({ name, label, error, ...rest }, ref) => {
		const hasError = !!error

		return (
			<div className={cn("flex flex-col gap-2", rest.className)}>
				{label && <Label htmlFor={name}>{label}</Label>}

				<Input
					id={name}
					name={name}
					ref={ref}
					className={cn({
						"border-red-500 focus-visible:ring-red-500": hasError,
					})}
					{...rest}
				/>

				{hasError && (
					<span className="text-red-500 text-xs font-medium">
						{error.message}
					</span>
				)}
			</div>
		)
	},
)

TextInput.displayName = "TextInput"

export { TextInput }
