import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('transactions')
export class TransactionTypeOrmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('decimal')
    amount: number;

    @Column()
    type: 'INCOME' | 'EXPENSE';

    @Column()
    category: string;

    @Column()
    createdAt: Date;
}