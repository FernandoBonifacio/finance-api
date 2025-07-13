import { Transaction as TransactionEntity } from '../entities/transaction.entity';

export abstract class ITransactionRepository {
  abstract create(transaction: TransactionEntity): Promise<void>;
  abstract findById(id: string): Promise<TransactionEntity | null>;
  abstract findAll(page: number, pageSize: number): Promise<TransactionEntity[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, transaction: TransactionEntity): Promise<void>;
  abstract count(): Promise<number>;
}
