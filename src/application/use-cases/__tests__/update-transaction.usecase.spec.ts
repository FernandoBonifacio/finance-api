import { UpdateTransactionUseCase } from '../update-transaction.usecase';
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from '../../../domain/entities/transaction.entity';

describe('UpdateTransactionUseCase', () => {
  let useCase: UpdateTransactionUseCase;
  let repository: jest.Mocked<ITransactionRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    };

    useCase = new UpdateTransactionUseCase(repository);
  });

  it('should update a transaction when it exists', async () => {
    const existingTransaction = Transaction.create({
      title: 'Old',
      amount: 100,
      type: 'INCOME',
      category: 'Work',
    });

    repository.findById.mockResolvedValue(existingTransaction);

    await useCase.execute({
        id: existingTransaction.id,
        title: 'New Title',
        amount: 200,
        type: 'EXPENSE',
        category: 'Bills',
    });

    expect(repository.findById).toHaveBeenCalledWith(existingTransaction.id);
    expect(existingTransaction.title).toBe('New Title');
    expect(existingTransaction.amount).toBe(200);
    expect(existingTransaction.type).toBe('EXPENSE');
    expect(existingTransaction.category).toBe('Bills');
    expect(repository.update).toHaveBeenCalledWith(existingTransaction.id, existingTransaction);
  });

  it('should throw if transaction does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(
        useCase.execute({
            id: 'non-existent-id',
            title: 'Anything',
            amount: 10,
            type: 'INCOME',
            category: 'Any',
        }),
    ).rejects.toThrow('Transaction not found');
  });
});