"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { AdvancedSelectInput } from "@/components/form/advanced-select-input/advanced-select-input"
import { CurrencyInput } from "@/components/form/currency-input"
import { useDebitOperationMutation } from "../hooks/use-debit-mutation"
import {
	type IDebitOperationSchema,
	debitOperationSchema,
} from "../utils/schemas"

interface IDebitOperationFormProps {
	onCancel: () => void
	fromModal?: boolean
}

export function DebitOperationForm({
	onCancel,
	fromModal = true,
}: IDebitOperationFormProps) {
	const { mutate, isPending } = useDebitOperationMutation()

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<IDebitOperationSchema>({
		resolver: zodResolver(debitOperationSchema),
	})

	function onSubmit(data: IDebitOperationSchema) {
		mutate(data)
	}

	return (
		<div className="space-y-8">
			{!fromModal && <h1 className="font-bold text-2xl">Operação - Débito</h1>}

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cn("w-full space-y-8", {
					"mt-6": fromModal,
				})}
			>
				<div className="w-full space-y-4">
					<h2 className="text-base font-semibold leading-7">
						Dados da Operação
					</h2>

					<div className="w-full grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2">
						{/* TODO: Implement all bank accounts query and filter */}
						<Controller
							name="bankAccountId"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<AdvancedSelectInput
									name={name}
									options={[]}
									onBlur={onBlur}
									label="Conta Bancária"
									error={errors.bankAccountId}
									isMulti={false}
									menuPortalTarget={
										typeof window !== "undefined" ? document.body : undefined
									}
								/>
							)}
						/>

						<Controller
							name="value"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<CurrencyInput
									id={name}
									name={name}
									label="Saldo"
									value={value}
									onChange={val => onChange(val)}
									onBlur={onBlur}
									error={errors.value}
								/>
							)}
						/>
					</div>
				</div>

				<div className="w-full flex gap-3 justify-end">
					<Button
						variant="outline"
						type="button"
						disabled={isPending}
						onClick={onCancel}
					>
						Cancelar
					</Button>
					<Button type="submit" disabled={isPending}>
						Realizar operação
					</Button>
				</div>
			</form>
		</div>
	)
}
