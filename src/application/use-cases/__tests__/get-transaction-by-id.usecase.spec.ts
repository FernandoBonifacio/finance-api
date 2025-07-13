import { ITransactionRepository } from "src/domain/repositories/transaction.repository"
import { GetTransactionByIdUseCase } from "../get-transaction-by-id.usecase"
import { Transaction } from '../../../domain/entities/transaction.entity';

describe('GetTransactionByIdUseCase', () => {
    let useCase: GetTransactionByIdUseCase
    let repository: jest.Mocked<ITransactionRepository>;

    beforeEach(() => {
        repository = {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
        };

        useCase = new GetTransactionByIdUseCase(repository);
    });

    it('should return a transaction if found', async () => {
        const transaction = Transaction.create({
            title: 'Test',
            amount: 100,
            type: 'INCOME',
            category: 'Job',
        });

        repository.findById.mockResolvedValue(transaction);

        const result = await useCase.execute(transaction.id);

        expect(repository.findById).toHaveBeenCalledWith(transaction.id);
        expect(result).toEqual(transaction);
    });

    it('should return null if transaction not found', async () => {
        repository.findById.mockResolvedValue(null);
        const result = await useCase.execute('non-existing-id');

        expect(repository.findById).toHaveBeenCalledWith('non-existing-id');
        expect(result).toBeNull();
    });
})