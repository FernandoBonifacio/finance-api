import { Module } from '@nestjs/common';
import { ITransactionRepository } from 'src/domain/repositories/transaction.reposity';
import { CreateTransactionUseCase } from 'src/domain/use-cases/create-transaction.usecase';
import { TypeOrmTransactionsModule } from 'src/infrastructure/database/typeorm/typeorm-transaction.module';


@Module({
  imports: [TypeOrmTransactionsModule],
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
  exports: [CreateTransactionUseCase],
})
export class TransactionsModule {}
