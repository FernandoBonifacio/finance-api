import { Module } from '@nestjs/common';
import { TransactionsController } from '../controllers/transactions.controller';
import { CreateTransactionUseCase } from 'src/application/use-cases/create-transaction.usecase';
import { GetAllTransactionsUseCase } from 'src/application/use-cases/get-all-transactions.usecase';
import { TypeOrmTransactionsModule } from 'src/infrastructure/database/typeorm/typeorm-transaction.module';
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository';
import { GetTransactionByIdUseCase } from 'src/application/use-cases/get-transaction-by-id.usecase';
import { UpdateTransactionUseCase } from 'src/application/use-cases/update-transaction.usecase';
import { DeleteTransactionUseCase } from 'src/application/use-cases/delete-transaction.usecase';

@Module({
  imports: [TypeOrmTransactionsModule],
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase,
    {
      provide: CreateTransactionUseCase,
      useFactory: (repo: ITransactionRepository) => new CreateTransactionUseCase(repo),
      inject: [ITransactionRepository],
    },
    GetAllTransactionsUseCase,
    {
      provide: GetAllTransactionsUseCase,
      useFactory: (repo: ITransactionRepository) => new GetAllTransactionsUseCase(repo),
      inject: [ITransactionRepository],
    },
    GetTransactionByIdUseCase,
    {
      provide: GetTransactionByIdUseCase,
      useFactory: (repo: ITransactionRepository) => new GetTransactionByIdUseCase(repo),
      inject: [ITransactionRepository],
    },
    UpdateTransactionUseCase,
    {
      provide: UpdateTransactionUseCase,
      useFactory: (repo: ITransactionRepository) => new UpdateTransactionUseCase(repo),
      inject: [ITransactionRepository],
    },
    DeleteTransactionUseCase,
    {
      provide: DeleteTransactionUseCase,
      useFactory: (repo: ITransactionRepository) => new DeleteTransactionUseCase(repo),
      inject: [ITransactionRepository],
    },
  ],
  exports: [
    CreateTransactionUseCase, 
    GetAllTransactionsUseCase,
    GetTransactionByIdUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
  ],
})
export class TransactionsModule {}