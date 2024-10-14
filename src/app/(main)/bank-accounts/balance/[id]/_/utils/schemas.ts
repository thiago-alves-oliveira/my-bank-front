import { z } from 'zod';

export const editTaxSchema = z.object({
	impostoId: z.string().min(1, 'Campo obrigatório'),
	usuarioId: z.string().min(1, 'Campo obrigatório'),
	estadoOrigem: z.string().min(1, 'Campo obrigatório'),
	estadoDestino: z.string().min(1, 'Campo obrigatório'),
	porcentagem: z.coerce.number().min(0, 'Campo obrigatório'),
});

export type IEditTaxSchema = z.infer<typeof editTaxSchema>;
