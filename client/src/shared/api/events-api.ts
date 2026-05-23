import { http } from "./http";
import type { CreateEventRequest, EventDto, JoinEventRequest, UpdateEventRequest } from "./types";

export const eventsApi = {
    async list(): Promise<EventDto[]> {
        const {data} = await http.get<EventDto[]>('/events')

        return data
    },
    async getById(id: string): Promise<EventDto> {
        const {data} = await http.get<EventDto>(`/events/${id}`)

        return data
    },
    async create(payLoad: CreateEventRequest): Promise<EventDto> {
        const {data} = await http.post<EventDto>(`/events`, payLoad)

        return data
    },
    async update(id: string, payLoad: UpdateEventRequest):Promise<EventDto> {
        const {data} = await http.patch<EventDto>(`/events/${id}`, payLoad)

        return data
    },
    async remove(id: string): Promise<void> {
        await http.delete(`/events/${id}`)
    },
    async join(id: string) {
        const {data} = await http.post<JoinEventRequest>(`/events/${id}/join`)

        return data
    },
    async leave(id: string): Promise<void> {
        await http.delete(`/events/${id}/join`)
    }


}