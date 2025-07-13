import { DeleteTransactionUseCase } from '../delete-transaction.usecase';
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository';
import { Transaction } from '../../../domain/entities/transaction.entity';

describe('DeleteTransactionUseCase', () => {
  let repository: jest.Mocked<ITransactionRepository>;
  let useCase: DeleteTransactionUseCase;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    };
    useCase = new DeleteTransactionUseCase(repository);
  });

  it('should delete transaction when it exists', async () => {
    const transaction = Transaction.create({
      title: 'Delete me',
      amount: 100,
      type: 'EXPENSE',
      category: 'Bills',
    });

    repository.findById.mockResolvedValue(transaction);

    const result = await useCase.execute(transaction.id);

    expect(repository.findById).toHaveBeenCalledWith(transaction.id);
    expect(repository.delete).toHaveBeenCalledWith(transaction.id);
    expect(result).toBe('success');
  });

  it('should return notFound if transaction does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    const result = await useCase.execute('non-existent-id');

    expect(repository.findById).toHaveBeenCalledWith('non-existent-id');
    expect(repository.delete).not.toHaveBeenCalled();
    expect(result).toBe('notFound');
  });
});