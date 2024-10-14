import { format, isValid } from "date-fns"

interface IMaskDateParams {
	includeTime?: boolean
}

export function maskDate(value?: string | null, params: IMaskDateParams = {}) {
	if (!value) {
		return "-"
	}

	const date = new Date(value)

	if (!isValid(date)) {
		return "Data inválida"
	}

	const formatString = params?.includeTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"

	return format(date, formatString)
}

export function maskPhone(value?: string | null) {
	if (!value) {
		return "-"
	}

	const phone = value.replace(/\D/g, "")

	if (phone.length === 11) {
		return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
	}

	return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
}

export function maskCpfCnpj(value?: string | null) {
	if (!value) {
		return "-"
	}

	const document = value.replace(/\D/g, "")

	if (document.length === 11) {
		return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")
	}

	if (document.length === 14) {
		return document.replace(
			/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
			"$1.$2.$3/$4-$5",
		)
	}

	return document
}

export function maskCep(value?: string | null) {
	if (!value) {
		return "-"
	}

	const cep = value.replace(/\D/g, "")

	return cep.replace(/(\d{5})(\d)/, "$1-$2")
}

export function maskCurrency(value?: string | number | null) {
	if (!value && value !== 0) {
		return "-"
	}

	if (typeof value === "string") {
		const valueWithCorrectDecimalSeparator = value
			.replace(/\./g, "")
			.replace(",", ".")

		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(Number.parseFloat(valueWithCorrectDecimalSeparator))
	}

	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value)
}

export function maskPercentage(value?: number | null) {
	if (!value && value !== 0) {
		return "-"
	}

	return new Intl.NumberFormat("pt-BR", {
		style: "percent",
		maximumFractionDigits: 2,
	}).format(value / 100)
}
