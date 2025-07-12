import { Transaction as TransactionEntity, TransactionType } from '../entities/transaction.entity';
import { ITransactionRepository } from '../repositories/transaction.reposity';

export interface CreateTransactionInput {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
}

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: CreateTransactionInput): Promise<void> {
    const transaction = TransactionEntity.create({
      title: input.title,
      amount: input.amount,
      type: input.type,
      category: input.category,
    });

    await this.transactionRepository.create(transaction);
  }
}
