import { email, z } from 'zod'

const emailFiled = z
.string()
.trim()
.pipe(z.email({ message: 'Некорректный email'}))
.transform((value) => value.toLowerCase())

export const registerSchema = z.object ({
    email: emailFiled,
    password: z.string().min(8, { message: 'Пароль минимум 8 символов'}),
    name: z.string().trim().min(2, { message: 'Имя минимум 2 символа'}).max(100)
})