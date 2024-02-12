import { z } from 'zod'

export const loginUserSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Senha obrigatária',
      })
      .min(5, 'Senha deve ter pelo menos 5 caracteres'),
    email: z
      .string({
        required_error: 'email obrigatário',
      })
      .email('Email inválido'),
  }),
})

export const signInUserSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email obrigatário',
      })
      .email('Email inválido'),
    password: z
      .string({
        required_error: 'Senha obrigatária',
      })
      .min(5, 'Senha deve ter pelo menos 5 caracteres'),
  }),
})

export const updateUserSchema = z.object({
  body: z.object({
    idUser: z.number({
      required_error: 'Id do usuário obrigatório',
    }),
    email: z.string().email('Email inválido').optional(),
    password: z
      .string()
      .min(5, 'Senha deve ter pelo menos 5 caracteres')
      .optional(),
    completeName: z.string().optional(),
    genre: z.string().optional(),
    isBaptized: z.boolean().optional(),
    baptismDate: z.string().optional(),
    isMember: z.boolean().optional(),
    birthDate: z.string().optional(),
    postalCode: z.string().optional(),
    contact: z.string().optional(),
  }),
})
