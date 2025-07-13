// src/application/transactions.module.ts (ou caminho correto)
import { Module } from '@nestjs/common';
import { ITransactionRepository } from 'src/domain/repositories/transaction.repository';
import { CreateTransactionUseCase } from 'src/application/use-cases/create-transaction.usecase';
import { TypeOrmTransactionsModule } from 'src/infrastructure/database/typeorm/typeorm-transaction.module';
import { TransactionsController } from '../controllers/transactions.controller';

@Module({
  imports: [TypeOrmTransactionsModule],
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase,
    {
      provide: CreateTransactionUseCase,
      useFactory: (repo: ITransactionRepository) => {
        return new CreateTransactionUseCase(repo);
      },
      inject: [ITransactionRepository],
    },
  ],
})
export class TransactionsModule {}
