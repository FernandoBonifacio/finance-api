import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeOrmEntity } from './entities/transaction.typeorm.entity';
import { ITransactionRepository } from 'src/domain/repositories/transaction.reposity';
import { TypeOrmTransactionRepository } from './repositories/typeorm-transaction.repository';


@Module({
  imports: [TypeOrmModule.forFeature([TransactionTypeOrmEntity])],
  providers: [
    {
      provide: ITransactionRepository,
      useClass: TypeOrmTransactionRepository,
    },
  ],
  exports: [ITransactionRepository],
})
export class TypeOrmTransactionsModule {}
