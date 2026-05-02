import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm" ;

@Entity('eventsparticipants')
@Index('UQ_EVENT_PARTICIPAN_EVENT_USER', ['eventId', 'userId'], {unique: true})
export class EventParticipant {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({type: 'varchar', length: 255, unique: true})
    email!: string
}