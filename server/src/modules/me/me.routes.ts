import { FastifyPluginAsync } from "fastify";
import { AppDataSourse } from "../../db/data-source";
import { EventParticipant } from "../../db/entities/event-participant.entity";
import { request } from "node:http";

export const meRoutes: FastifyPluginAsync = async (app) => {
    const participantsRepository = AppDataSourse.getRepository(EventParticipant)
    app.get('/events/joined', { preHandler: [app.authenticate]}, async (request, reply) =>{
        const participations = await participantsRepository.find({
            where: {userId: request.user.sub},
            relations: ['event'],
            order:{
                joinedAt: 'DESC'
            }
        })
        return participations.map(participation =>({
            joinedAt: participation.joinedAt,
            event: participation.event 
        }))
    })

}