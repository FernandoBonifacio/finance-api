import { ITransactionRepository } from "src/domain/repositories/transaction.repository";

type UpdateInput = {
    id: string;
    title: string;
    amount: number; 
    type: 'INCOME' | 'EXPENSE';
    category: string;
};

export class UpdateTransactionUseCase {
    constructor(private readonly transactionRepository: ITransactionRepository) {}

      async execute(input: UpdateInput): Promise<'notFound' | 'success'> {
         const existing = await this.transactionRepository.findById(input.id);
        if (!existing) return 'notFound';

        existing.setTitle(input.title);
        existing.setAmount(input.amount);
        existing.setType(input.type);
        existing.setCategory(input.category);

        await this.transactionRepository.create(existing);

        return 'success';
    }
}