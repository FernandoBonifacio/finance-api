import { ITransactionRepository } from "src/domain/repositories/transaction.repository";
import { GetAllTransactionsUseCase } from "../get-all-transactions.usecase";
import { Transaction } from '../../../domain/entities/transaction.entity';

describe('GetAllTransactionsUseCase', () => {
    let useCase: GetAllTransactionsUseCase;
    let repository: jest.Mocked<ITransactionRepository>;

    beforeEach(() => {
        repository = {
            findAll: jest.fn().mockResolvedValue([]),
            count: jest.fn().mockResolvedValue(1),
            create: jest.fn(),
            delete: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
        };

        useCase = new GetAllTransactionsUseCase(repository);
    });

    it('should return a list of transactions with pagination metadata', async () => {
        const transaction = Transaction.create({
            title: 'Exemplo',
            amount: 100,
            type: 'INCOME',
            category: 'Salário',
        });

        repository.findAll.mockResolvedValue([transaction]);
        repository.count.mockResolvedValue(1);

        const result = await useCase.execute(1, 10);

        expect(result).toEqual({
            total: 1,
            transactions: [transaction],
        });

        expect(repository.findAll).toHaveBeenCalledWith(1, 10);
        expect(repository.count).toHaveBeenCalled();
    });

    it('should return an empty list if no transactions are found', async () => {
        repository.findAll.mockResolvedValue([]);
        repository.count.mockResolvedValue(0);

        const result = await useCase.execute(1, 10);

        expect(result).toEqual({
            total: 0,
            transactions: [],
        });

        expect(repository.findAll).toHaveBeenCalledWith(1, 10);
        expect(repository.count).toHaveBeenCalled();
    });
})