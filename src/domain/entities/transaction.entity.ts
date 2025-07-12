import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface TransactionProps {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  createdAt?: Date;
}

export class Transaction {
  public readonly id: string;
  public readonly createdAt: Date;

  private constructor(
    id: string,
    private props: TransactionProps,
  ) {
    this.id = id;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: Omit<TransactionProps, 'createdAt'>, id?: string): Transaction {
    return new Transaction(id ?? uuidv4(), props);
  }

  get title(): string {
    return this.props.title;
  }

  get amount(): number {
    return this.props.amount;
  }

  get type(): TransactionType {
    return this.props.type;
  }

  get category(): string {
    return this.props.category;
  }

  setTitle(newTitle: string) {
    this.props.title = newTitle;
  }

  setAmount(newAmount: number) {
    this.props.amount = newAmount;
  }
}