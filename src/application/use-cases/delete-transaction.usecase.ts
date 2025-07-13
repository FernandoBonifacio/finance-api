export class DeleteTransactionUseCase {
    constructor(private readonly transactionRepository) {}

    async execute(id: string): Promise<void> {
        await this.transactionRepository.delete(id);
    }
}