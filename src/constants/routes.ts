export const routes = {
	dashboard: { path: "/" },
	bankAccounts: {
		path: "/bank-accounts",
		create: { path: "/bank-accounts/new" },
		balance: { path: (id: string) => `/bank-accounts/balance/${id}` },
	},
	bankOperations: {
		path: "/bank-operations",
		credit: { path: "/bank-operations/credit" },
		debit: { path: "/bank-operations/debit" },
		transfer: { path: "/bank-operations/transfer" },
	},
} as const
