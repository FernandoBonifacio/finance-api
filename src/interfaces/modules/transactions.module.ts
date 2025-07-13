import { Module } from '@nestjs/common';
import { TransactionsController } from '../controllers/transactions.controller';
import { CreateTransactionUseCase } from 'src/application/use-cases/create-transaction.usecase';
import { GetAllTransactionsUseCase } from 'src/application/use-cases/get-all-transactions.usecase';
import { TypeOrmTransactionsModule } from 'src/infrastructure/database/typeorm/typeorm-transaction.module';
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository';

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
  ],
  exports: [CreateTransactionUseCase, GetAllTransactionsUseCase],
})
export class TransactionsModule {}