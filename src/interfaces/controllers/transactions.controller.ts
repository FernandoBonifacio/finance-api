import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { isUUID, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateTransactionUseCase } from 'src/application/use-cases/create-transaction.usecase';
import { CreateTransactionDto } from 'src/application/dtos/create-transaction.dto';
import { GetAllTransactionsUseCase } from 'src/application/use-cases/get-all-transactions.usecase';
import { GetTransactionByIdUseCase } from 'src/application/use-cases/get-transaction-by-id.usecase';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly createTransactionUseCase: CreateTransactionUseCase,
        private readonly getAllTransactionsUseCase: GetAllTransactionsUseCase,
        private readonly getTransactionByIdUseCase: GetTransactionByIdUseCase,
    ) {}

    @Post()
    async create(
        @Body() body: any, 
        @Res() res
    ): Promise<void> {
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


    @Get()
    async findAll(
        @Query('page') page = '1',
        @Query('pageSize') pageSize = '10',
        @Res() res,
    ): Promise<void> {
        try {
            const pageNumber = parseInt(page, 10);
            const pageSizeNumber = parseInt(pageSize, 10);

            const { total, transactions } = await this.getAllTransactionsUseCase.execute(
                pageNumber,
                pageSizeNumber,
            )

            if (transactions.length === 0) {
                return res.status(200).send({
                    status: 'noData',
                    message: 'No transactions found for this page.',
                    total: 0,
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    transactions: [],
                });
            }   

            res.status(200).send({
                status: 'success',
                    total,
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    transactions,
            });
        } catch (error) {
            console.error('[GET /transactions]', error);
            res.status(500).send({
                status: 'error',
                message: 'Failed to list transactions',
            });
        }
    }

    @Get(':id')
    async findById(
        @Param('id') id: string,
        @Res() res,
    ): Promise<void> {
        try {

            if (!isUUID(id)) {
                return res.status(400).send({
                    status: 'validationError',
                    message: 'Invalid transaction ID format',
                });
            }

            const transaction = await this.getTransactionByIdUseCase.execute(id);

            if (!transaction) {
                return res.status(404).send({
                    status: 'notFound',
                    message: 'No transaction found with the provided ID.',
                });
            }

            res.status(200).send({
                status: 'success',
                transaction,
            });
        } catch (error) {
            console.error('[GET /transactions/:id]', error);
            res.status(500).send({
                status: 'error',
                message: 'Failed to retrieve transaction',
            });
        }
    }
}