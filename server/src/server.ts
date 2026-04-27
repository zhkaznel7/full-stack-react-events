import fastify from 'fastify';
import fastiJwt from "@fastify/jwt";
import 'dotenv/config';
import 'reflect-metadata';

const app = fastify({ logger: true}) ;


