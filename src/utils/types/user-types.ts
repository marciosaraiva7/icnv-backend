import { z } from 'zod'

export const loginUserSchema = z.object({
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
})

export const signInUserSchema = z.object({
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
})

export const updateUserSchema = z.object({
  completeName: z.string({
    required_error: 'Nome completo obrigatório',
  }),
  genre: z.string({
    required_error: 'Gênero obrigatório',
  }),
  baptismDate: z.date(),
  birthDate: z.date(),
  isMember: z.boolean(),
  isBaptized: z.boolean(),
})
