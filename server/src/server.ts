import fastify from 'fastify';
import fastiJwt from "@fastify/jwt";
import cors from '@fastify/cors'
import 'dotenv/config';
import 'reflect-metadata';
import { validateEnv, env } from '../config/env';
import { AppDataSourse } from './db/data-source';

const app = fastify({ logger: true}) ;

const start = async () => {
    try{
        validateEnv()

        await app.register(cors, {
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        })
        await app.register(fastiJwt, {
            secret: env.jwtSecret
        })
        await AppDataSourse.initialize();
        app.log.info('Database connected')
        await app.listen({ port: env.port, host: env.host})
        app.log.info(`Server running on PORT ${env.port}`)
    } catch (error) {
        if (AppDataSourse.isInitialized){
            await AppDataSourse.destroy()
        }
        app.log.error(error);
        process.exit(1)
    }
}
start()


