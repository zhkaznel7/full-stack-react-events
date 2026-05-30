import { useAuthStore } from "@/stores/auth-store";
import { useEventsStore } from "@/stores/events-store";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEventById } from "../hooks/use-event-by-id";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { EventDetailsCard } from "../components/event-details-card";

export function EventDetailsPage(){
    const { id } = useParams<{id: string}>()
    const user = useAuthStore(s => s.user)
    const joinedEvents = useEventsStore(s => s.joinedEvents)
    const joinEvent = useEventsStore(s => s.joinEvent);
    const leaveEvent = useEventsStore(s => s.leaveEvent)
    const mutationLoading = useEventsStore(s => s.mutationLoading);
    const eventsError = useEventsStore(s => s.eventsError);

    const { event, loading, notFound, loadError} = useEventById(id, {
        prefetchJoinedEvents: true
    })
    if (!id){
        return <Navigate to='/events' replace/>
    }
    if (loading){
        return(
            <PageShell title="Собитие">
                <span>Загурузка</span>
            </PageShell>
        )
    }

    if (notFound){
        return(
            <PageShell title="Собитие не найдено">
                <span>Такого события нету</span>
            </PageShell>
        )
    }

    if (loadError || !event) {
        return(
            <PageShell title="Ошибка">
               { loadError && <span>{loadError}</span>}
            </PageShell>
        )
    }

    const isOwner = user?.id === event.ownerId
    const isJoined = joinedEvents.some(row => row.event.id === event.id)
    const eventId = event.id

    async function handleJoin() {
        try{
            await joinEvent(eventId)
        } catch (error){

        }
    }
    async function handleLeave() {
        try{
            await leaveEvent(eventId)
        } catch (error){
            
        }
    }

    return(
        <PageShell title={event.title}>
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit"
                    asChild
                >
                    <Link to="/event">
                        Назад к списку
                    </Link>

                </Button>
                <EventDetailsCard 
                    event={event}
                    isJoined={isJoined}
                    isOwner={isOwner}
                    mutationLoading={mutationLoading}
                    eventsError={eventsError}
                    onJoin={() =>{
                        handleJoin()
                    }}
                    onLeave={() =>{
                        handleLeave()
                    }}
                />
            </div>
        </PageShell>
    )
}