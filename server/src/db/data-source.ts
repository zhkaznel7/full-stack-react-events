import { DataSource } from "typeorm";
import { env } from '../../config/env';
import { EventParticipant } from "./entities/event-participant.entity";
import { User } from "./entities/user.entity";
import { Event } from "./entities/event.entity";

export const AppDataSourse = new DataSource({
    type: 'postgres',
    url: env.databaseUrl,
    synchronize: false,
    logging: true,
    entities: [User, Event, EventParticipant],
    migrations: [__dirname + '/migration/*.{ts,js}'],
    subscribers: []
})