"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { useAllBankAccountsQuery } from "@/app/(main)/_/hooks/queries/use-all-bank-accounts-query"
import { AdvancedSelectInput } from "@/components/form/advanced-select-input/advanced-select-input"
import { CurrencyInput } from "@/components/form/currency-input"
import { OPERATION_TYPE_OPTIONS } from "../../../_/utils/constants"
import { useTransferOperationMutation } from "../hooks/use-transfer-mutation"
import {
	type ITransferOperationSchema,
	transferOperationSchema,
} from "../utils/schemas"

interface ITransferOperationFormProps {
	onCancel: () => void
	fromModal?: boolean
}

export function TransferOperationForm({
	onCancel,
	fromModal = true,
}: ITransferOperationFormProps) {
	const { data: bankAccounts } = useAllBankAccountsQuery()
	const bankAccountsOptions =
		bankAccounts?.result.map(bankAccount => ({
			value: bankAccount.id,
			label: bankAccount.bankName,
		})) ?? []

	const { mutate, isPending } = useTransferOperationMutation()

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm<ITransferOperationSchema>({
		resolver: zodResolver(transferOperationSchema),
	})
	const originAccount = watch("originBankAccountId")
	const destinationAccount = watch("destinationBankAccountId")

	function onSubmit(data: ITransferOperationSchema) {
		mutate(data)
	}

	return (
		<div className="space-y-8">
			{!fromModal && (
				<h1 className="font-bold text-2xl">Operação - Transferência</h1>
			)}

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
						<Controller
							name="originBankAccountId"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<AdvancedSelectInput
									name={name}
									value={
										bankAccountsOptions.find(
											option => option.value === value,
										) ?? null
									}
									onChange={option => onChange(option?.value)}
									options={bankAccountsOptions.filter(
										b => b.value !== destinationAccount,
									)}
									onBlur={onBlur}
									label="Conta Origem"
									error={errors.originBankAccountId}
									isMulti={false}
									menuPortalTarget={
										typeof window !== "undefined" ? document.body : undefined
									}
									isClearable
								/>
							)}
						/>

						<Controller
							name="destinationBankAccountId"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<AdvancedSelectInput
									name={name}
									value={
										bankAccountsOptions.find(
											option => option.value === value,
										) ?? null
									}
									onChange={option => onChange(option?.value)}
									options={bankAccountsOptions.filter(
										b => b.value !== originAccount,
									)}
									onBlur={onBlur}
									label="Conta Destino"
									error={errors.destinationBankAccountId}
									isMulti={false}
									menuPortalTarget={
										typeof window !== "undefined" ? document.body : undefined
									}
									isClearable
								/>
							)}
						/>
					</div>

					<div className="w-full grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2">
						<Controller
							name="operationType"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<AdvancedSelectInput
									name={name}
									options={OPERATION_TYPE_OPTIONS}
									value={
										OPERATION_TYPE_OPTIONS.find(
											option => option.value === value,
										) ?? null
									}
									onChange={option => onChange(option?.value)}
									onBlur={onBlur}
									label="Tipo de Operação"
									error={errors.operationType}
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
