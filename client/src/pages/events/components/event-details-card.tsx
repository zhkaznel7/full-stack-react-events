import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatStartsAt } from "@/lib/utils"
import type { EventDto } from "@/shared/api/types"
import { Link } from "react-router-dom"

type Props ={
    event: EventDto
    isOwner: boolean
    isJoined: boolean
    mutationLoading:boolean
    eventsError: string | null
    onJoin: () => void
    onLeave: () => void 
}



export function EventDetailsCard({
    event,
    isOwner,
    isJoined,
    mutationLoading,
    eventsError,
    onJoin,
    onLeave
}: Props){
    return(<>
        {
            eventsError && (
                <p className="text-sm text-desctructive">
                    { eventsError}
                </p>
            )
        }

        <Card>
            <CardHeader>
                <CardTitle className="text-lg leading-snug">
                    {event.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div>
                    <p className="text-muted-foregroud">Когда</p>
                    <p>{formatStartsAt(event.startedAt)}</p>
                </div>
                <div>
                    <p className="text-muted-foregroud">Адрес</p>
                    <p>{(event.address)}</p>
                </div>
                <div>
                    <p className="text-muted-foregroud">Вместимость</p>
                    <p>До { event.capacity} участников</p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 border-t">
                {
                    isOwner ?(
                        <>
                            <p className="mr-auto text-sm text-muted-foreground">
                                Вы организатор
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                            >
                                <Link to={`/events/${event.id}/edit`}>Редактировать</Link>
                            </Button>
                        </>
                    ) : isJoined? (
                        <>
                            <Button 
                                variant="outline"
                                disabled={mutationLoading}
                                onClick={() => onJoin()}
                            >
                                Выйти из события
                            </Button>
                        </>
                    ): (
                        <Button 
                                variant="outline"
                                disabled={mutationLoading}
                                onClick={() => onJoin()}
                            >
                                Присоединиться
                            </Button>
                    )
                }
            </CardFooter>
        </Card>
    </>)
}