"use client";

import { z } from "zod";

export const schemaLogin = z.object({
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "O e-mail é obrigatório" }),
  password: z
    .string()
    .min(8, { message: "A senha é obrigatória e deve ser válida" }),
  rememberMe: z.boolean().optional(),
});

export const schemaRecoverPassword = z.object({
  email: z.string().email({
    message: "Informe um email válido",
  }),
});
export const schemaAddress = z.object({
  id: z.number().int().positive().optional(),
  street: z.string().min(3, { message: "A rua é obrigatória" }),
  number: z.string().min(1, { message: "O número é obrigatório" }),
  district: z.string().min(3, { message: "O bairro é obrigatório" }),
  city: z.string().min(3, { message: "A cidade é obrigatória" }),
  state: z
    .string()
    .length(2, { message: "O estado deve ter 2 letras (Ex: SP)" }),
  zipCode: z.string().regex(/^\d{5}-\d{3}$/, {
    message: "CEP inválido, use o formato 00000-000",
  }),
});
export const schemaUserCadastro = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "O e-mail é obrigatório" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string().min(8, {
    message: "A confirmação de senha deve ter pelo menos 8 caracteres",
  }),
  phone: z.string().regex(/\(\d{2}\) \d{5}-\d{4}/, {
    message: "Celular inválido, siga o formato (XX) XXXXX-XXXX",
  }),
});
export const schemaUserEdit = z.object({
  id: z.number().min(1, { message: "O id é obrigatório" }),
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .min(1, { message: "O e-mail é obrigatório" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z.string().min(8, {
    message: "A confirmação de senha deve ter pelo menos 8 caracteres",
  }),
  phone: z.string().regex(/\(\d{2}\) \d{5}-\d{4}/, {
    message: "Celular inválido, siga o formato (XX) XXXXX-XXXX",
  }),
});

export type FormUserEdit = z.infer<typeof schemaUserEdit>;
export type FormUser = z.infer<typeof schemaUserCadastro>;
export type FormLogin = z.infer<typeof schemaLogin>;
export type FormRecover = z.infer<typeof schemaRecoverPassword>;
