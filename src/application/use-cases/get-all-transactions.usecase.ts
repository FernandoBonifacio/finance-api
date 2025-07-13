import { Transaction } from "../../domain/entities/transaction.entity";
import { ITransactionRepository } from "../../domain/repositories/transaction.repository";

export class GetAllTransactionsUseCase {
    constructor(private readonly transactionRepo: ITransactionRepository) {}

    async execute(page: number, pageSize: number): Promise<{ total: number; transactions: Transaction[] }> {
        const all = await this.transactionRepo.findAll(page, pageSize);
        const total = await this.transactionRepo.count();

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const transactions = all.slice(start, end);

        return {
            total,
            transactions
        }
    }
}