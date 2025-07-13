import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from 'src/domain/entities/transaction.entity';

export class CreateTransactionDto {
  @ApiProperty({ example: 'salario' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1000.20 })
  @IsNotEmpty()
  @IsNumber({}, { message: 'amount must be a number' })
  amount: number;

  @ApiProperty({ example: 'INCOME', enum: ['INCOME', 'EXPENSE'] })
  @IsNotEmpty()
  @IsEnum(['INCOME', 'EXPENSE'], { message: 'type must be INCOME or EXPENSE' })
  type: TransactionType;

  @ApiProperty({ example: 'Trabalho' })
  @IsString()
  @IsNotEmpty()
  category: string;
}