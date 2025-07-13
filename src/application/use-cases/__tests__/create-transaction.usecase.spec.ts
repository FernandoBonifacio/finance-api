import { ITransactionRepository } from "src/domain/repositories/transaction.repository";
import { CreateTransactionUseCase } from "../create-transaction.usecase"
import { Transaction as TransactionEntity } from '../../../domain/entities/transaction.entity';


describe('CreateTransactionUseCase', () => {
    let useCase: CreateTransactionUseCase;
    let repository: ITransactionRepository;

    beforeEach(() => {
        repository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
            count: jest.fn(),
        };


        useCase = new CreateTransactionUseCase(repository);
    });

    it('should create a new transaction and call repository.create()', async () => {
        const input = {
            title: 'Salário',
            amount: 8000,
            type: 'INCOME' as const,
            category: 'Trabalho',
        };

        await useCase.execute(input);

        expect(repository.create).toHaveBeenCalledTimes(1);
        const createdTransaction = (repository.create as jest.Mock).mock.calls[0][0] as TransactionEntity;

        expect(createdTransaction).toBeInstanceOf(TransactionEntity);
        expect(createdTransaction.title).toBe(input.title);
        expect(createdTransaction.amount).toBe(input.amount);
        expect(createdTransaction.type).toBe(input.type);
        expect(createdTransaction.category).toBe(input.category);
    });
});