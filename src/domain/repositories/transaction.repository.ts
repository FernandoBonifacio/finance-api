import { Transaction as TransactionEntity } from '../entities/transaction.entity';

export abstract class ITransactionRepository {
  abstract create(transaction: TransactionEntity): Promise<void>;
  abstract findById(id: string): Promise<TransactionEntity | null>;
  abstract findAll(): Promise<TransactionEntity[]>;
  abstract delete(id: string): Promise<void>;
}
