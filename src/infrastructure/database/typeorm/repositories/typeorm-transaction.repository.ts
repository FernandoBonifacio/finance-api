import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Transaction as DomainTransaction } from '../../../../domain/entities/transaction.entity';
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository';
import { TransactionTypeOrmEntity } from '../entities/transaction.typeorm.entity';

@Injectable()
export class TypeOrmTransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionTypeOrmEntity)
    private readonly ormRepository: Repository<TransactionTypeOrmEntity>,
  ) {}

  async create(transaction: DomainTransaction): Promise<void> {
    const ormEntity = this.toOrmEntity(transaction);
    await this.ormRepository.save(ormEntity);
  }

  async findById(id: string): Promise<DomainTransaction | null> {
    const ormEntity = await this.ormRepository.findOneBy({ id });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async findAll(): Promise<DomainTransaction[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(this.toDomainEntity);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  private toOrmEntity(transaction: DomainTransaction): TransactionTypeOrmEntity {
    return {
      id: transaction.id,
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      createdAt: transaction.createdAt,
    };
  }

  private toDomainEntity(ormEntity: TransactionTypeOrmEntity): DomainTransaction {
    return DomainTransaction.create(
      {
        title: ormEntity.title,
        amount: Number(ormEntity.amount),
        type: ormEntity.type,
        category: ormEntity.category,
      },
      ormEntity.id,
    );
  }
}