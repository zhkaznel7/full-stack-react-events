import { FastifyPluginAsync } from "fastify";
import { AppDataSourse } from "../../db/data-source";
import { User } from "../../db/entities/user.entity";
import { registerSchema } from "./auth.schemas";
import { error } from "node:console";
import argon2 from "argon2";

export const authRoutes: FastifyPluginAsync = async (app) =>{
    const userRepository = AppDataSourse.getRepository(User)

    app.post('/register', async (request, reply) => {
        const parseBody = registerSchema.safeParse(request.body);

        if (!parseBody.success) {
            return reply.code(400).send({
                message: 'Validation error',
                errors: parseBody.error
            })
        }

        const { email, password, name} = parseBody.data;
        const existingUser = await userRepository.find({ where: { email }})

        if (existingUser) {
            return reply.code(409).send({ message: 'Пользователь с таким email уже есть'})
        }

        const passwordHash = await argon2.hash(password);
        const user = userRepository.create({
            email,
            passwordHash,
            name
        })

        const saveduser = await userRepository.save(user);
        const token = await reply.jwtSign({ sub: saveduser.id, email: saveduser.email})

        return reply.code(201).send({
            token,
            user: {
                id: saveduser.id,
                email: saveduser.email,
                name: saveduser.name
            }
        })
    })
}