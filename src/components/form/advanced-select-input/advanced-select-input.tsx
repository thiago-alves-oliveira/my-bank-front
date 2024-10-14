import type { FieldError } from "react-hook-form"
import Select, { type Props } from "react-select"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import {
	ClearIndicator,
	DropdownIndicator,
	MultiValueRemove,
	Option,
} from "./components"
import {
	clearIndicatorStyles,
	controlStyles,
	dropdownIndicatorStyles,
	groupHeadingStyles,
	indicatorSeparatorStyles,
	indicatorsContainerStyles,
	loadingIndicatorStyles,
	loadingMessageStyles,
	menuPortalStyles,
	menuStyles,
	multiValueStyles,
	noOptionsMessageStyles,
	optionStyles,
	placeholderStyles,
	valueContainerStyles,
} from "./styles"

interface IAdvancedSelectInputProps<T, U extends boolean> extends Props<T, U> {
	name: string
	label?: string
	placeholder?: string
	error?: FieldError
}

export const AdvancedSelectInput = <T, U extends boolean>({
	name,
	label,
	placeholder = "Selecione uma opção",
	error,
	...rest
}: IAdvancedSelectInputProps<T, U>) => {
	const hasError = !!error

	return (
		<div className="flex flex-col gap-2">
			{label && <Label htmlFor={name}>{label}</Label>}

			<Select
				{...rest}
				id={name}
				inputId={name}
				instanceId={name}
				name={name}
				unstyled
				noOptionsMessage={() => "Nenhuma opção encontrada"}
				placeholder={placeholder}
				classNames={{
					clearIndicator: () => cn(clearIndicatorStyles),
					control: state =>
						cn(
							controlStyles.base,
							state.isDisabled && controlStyles.disabled,
							state.isFocused && controlStyles.focus,
							{
								"border-red-500 focus-visible:ring-red-500": hasError,
							},
						),
					dropdownIndicator: () => cn(dropdownIndicatorStyles),
					groupHeading: () => cn(groupHeadingStyles),
					indicatorsContainer: () => cn(indicatorsContainerStyles),
					indicatorSeparator: () => cn(indicatorSeparatorStyles),
					loadingIndicator: () => cn(loadingIndicatorStyles),
					loadingMessage: () => cn(loadingMessageStyles),
					menu: () => cn(menuStyles),
					menuPortal: () => cn(menuPortalStyles),
					multiValue: () => cn(multiValueStyles),
					noOptionsMessage: () => cn(noOptionsMessageStyles),
					option: state =>
						cn(
							optionStyles.base,
							state.isFocused && optionStyles.focus,
							state.isDisabled && optionStyles.disabled,
							state.isSelected && optionStyles.selected,
						),
					placeholder: () => cn(placeholderStyles),
					valueContainer: () => cn(valueContainerStyles),
				}}
				styles={{
					input: base => ({
						...base,
						"input:focus": {
							boxShadow: "none",
						},
					}),
					multiValueLabel: base => ({
						...base,
						whiteSpace: "normal",
						overflow: "visible",
					}),
					control: base => ({
						...base,
						transition: "none",
					}),
					menuList: base => ({
						...base,
						"::-webkit-scrollbar": {
							background: "transparent",
						},
						"::-webkit-scrollbar-track": {
							background: "transparent",
						},
						"::-webkit-scrollbar-thumb": {
							background: "hsl(var(--border))",
						},
						"::-webkit-scrollbar-thumb:hover": {
							background: "transparent",
						},
					}),
				}}
				components={{
					DropdownIndicator,
					ClearIndicator,
					MultiValueRemove,
					Option,
				}}
			/>

			{hasError && (
				<span className="text-red-500 text-xs font-medium">
					{error.message}
				</span>
			)}
		</div>
	)
}
