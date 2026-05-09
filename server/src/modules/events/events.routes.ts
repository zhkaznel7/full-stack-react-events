import { FastifyPluginAsync } from "fastify";
import { AppDataSourse } from "../../db/data-source";
import { Event as EvetnEntity } from '../../db/entities/event.entity'
import { EventParticipant } from "../../db/entities/event-participant.entity";
import { createEventSchema } from "./events.schemas";

export const eventsRoutes: FastifyPluginAsync = async (app) => {
    const eventRepository = AppDataSourse.getRepository(EvetnEntity)
    const participantsRepository = AppDataSourse.getRepository(EventParticipant)

    app.post('/', { preHandler: [app.authenticate]} , async (request, reply) => {
        const parsedBody = createEventSchema.safeParse(request.body);

        if(!parsedBody.success) {
            return reply.code(400).send({
                message: 'Validation Error',
                errors: parsedBody.error.issues.map(issue =>({
                    path: issue.path.join("."),
                    message: issue.message
                }))
            })
        } 

        const {
            title,
            description,
            capacity,
            address,
            startedAt,
        
        } = parsedBody.data 

        const event = eventRepository.create({
            title,
            description,
            capacity,
            address,
            startedAt,
            ownerId: request.user.sub
        })

        const savedEvenent = await eventRepository.save(event);
        
        return reply.code(201).send(savedEvenent)
    })

    app.get('/', { preHandler: [app.authenticate]}, async () => {
        return eventRepository.find({
            order: { startedAt: 'ASC'}
        })
    })
}