import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateTransactionUseCase } from 'src/application/use-cases/create-transaction.usecase';
import { CreateTransactionDto } from 'src/application/dtos/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly createTransactionUseCase: CreateTransactionUseCase,
    ) {}

    @Post()
    async create(@Body() body: any, @Res() res): Promise<void> {
        const dto = plainToInstance(CreateTransactionDto, body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            const messages = errors.flatMap(err =>
            Object.values(err.constraints ?? {})
        );

            return res.status(400).send({
                status: 'validationError',
                message: messages,
            });
        }

        try {
            await this.createTransactionUseCase.execute(dto);

            return res.status(200).send({
                status: 'success',
                message: 'Transaction created successfully',
            });
        } catch (error) {
            console.error('[POST /transactions]', error);

            return res.status(500).send({
                status: 'internalError',
                message: 'Failed to create transaction',
            });
        }
    }
}
