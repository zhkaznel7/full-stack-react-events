import {  TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { EventDto } from "@/shared/api/types"
import { Table } from "lucide-react"
import { Link } from "react-router-dom"
import { formatStartsAt } from "@/lib/utils"

type Props = {
    events: EventDto[]
}

export function CreatedEventsTable({ events}: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Начало</TableHead>
                    <TableHead>Адрес</TableHead>
                    <TableHead>Мест</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    events.map(event => (
                        <TableRow key={event.id}>
                            <TableCell className="max-w-[12rem] font-medium">
                                <Link className="hover:text-primary" to={`/events/${event.id}`}>
                                    { event.title}
                                </Link>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {formatStartsAt(event.startedAt)}
                            </TableCell>
                            <TableCell className="max-w-[14rem] text-muted-foreground">
                                { event.address}
                            </TableCell>
                            <TableCell className="tabular-nums">
                                {event.capacity}
                            </TableCell>
                            <TableCell>
                                <Link to={`/events/${event.id}/edit`}>
                                    Изменить
                                </Link>
                            </TableCell>
                        </TableRow>
                    ) )
                }
            </TableBody>
        </Table>
    )
}