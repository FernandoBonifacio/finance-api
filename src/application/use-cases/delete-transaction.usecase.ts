import { ITransactionRepository } from "src/domain/repositories/transaction.repository";

export class DeleteTransactionUseCase {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(id: string): Promise<'notFound' | 'success'> {
    const existing = await this.transactionRepository.findById(id);
    if (!existing) {
      return 'notFound';
    }

    await this.transactionRepository.delete(id);
    return 'success';
  }
}