import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateTransactionDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 1200.50 })
    @IsNotEmpty()
    @IsNumber({}, { message: 'amount must be a number' })
    amount: number;

    @ApiProperty({ example: 'INCOME', enum: ['INCOME', 'EXPENSE'] })
    @IsNotEmpty()
    @IsString({ message: 'type must be a string' })
    type: 'INCOME' | 'EXPENSE';

    @IsString()
    @IsNotEmpty()
    category: string;
}   