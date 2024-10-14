"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { NumberInput } from "@/components/form/number-input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { CurrencyInput } from "@/components/form/currency-input"
import { TextInput } from "@/components/form/text-input"
import { useCreateBankAccountMutation } from "../hooks/use-create-bank-account-mutation"
import {
	type ICreateBankAccountSchema,
	createBankAccountSchema,
} from "../utils/schemas"

interface INewBankAccountFormProps {
	onCancel: () => void
	fromModal?: boolean
}

export function NewBankAccountForm({
	onCancel,
	fromModal = true,
}: INewBankAccountFormProps) {
	const { mutate, isPending } = useCreateBankAccountMutation()

	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<ICreateBankAccountSchema>({
		resolver: zodResolver(createBankAccountSchema),
	})

	function onSubmit(data: ICreateBankAccountSchema) {
		mutate(data)
	}

	return (
		<div className="space-y-8">
			{!fromModal && <h1 className="font-bold text-2xl">Cadastrar Conta</h1>}

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cn("w-full space-y-8", {
					"mt-6": fromModal,
				})}
			>
				<div className="w-full space-y-4">
					<h2 className="text-base font-semibold leading-7">Dados da Conta</h2>

					<div className="w-full grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2">
						<TextInput label="Nome" error={errors.name} {...register("name")} />

						<Controller
							name="account"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<NumberInput
									id={name}
									name={name}
									label="Número da Conta"
									value={value}
									onChange={val => onChange(val)}
									onBlur={onBlur}
									error={errors.account}
								/>
							)}
						/>
					</div>

					<div className="w-full grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2">
						<Controller
							name="branch"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<NumberInput
									id={name}
									name={name}
									label="Agência"
									value={value}
									onChange={val => onChange(val)}
									onBlur={onBlur}
									error={errors.branch}
								/>
							)}
						/>

						<Controller
							name="balance"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<CurrencyInput
									id={name}
									name={name}
									label="Saldo"
									value={value}
									onChange={val => onChange(val)}
									onBlur={onBlur}
									error={errors.balance}
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
						Cadastrar
					</Button>
				</div>
			</form>
		</div>
	)
}
