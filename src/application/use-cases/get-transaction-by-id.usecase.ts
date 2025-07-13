import { Transaction } from "src/domain/entities/transaction.entity";
import { ITransactionRepository } from "src/domain/repositories/transaction.repository";

export class GetTransactionByIdUseCase {
    constructor( private readonly transactionRepository: ITransactionRepository) {}

    async execute(id: string): Promise<Transaction | null> {
        return await this.transactionRepository.findById(id);
    }
}