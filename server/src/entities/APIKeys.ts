import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class APIKeys extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @ObjectIdColumn()
    creator: ObjectID;

    @Column()
    name: string;

    @Column()
    token: string;

    @Column()
    permissions: Array<string | undefined>;
}
