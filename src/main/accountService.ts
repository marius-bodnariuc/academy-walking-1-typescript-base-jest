import {PrintOutput} from "./printOutput";

export interface AccountService {
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  printStatement: () => void;
}

interface Transaction {
  amount: number;
  balance: number;
  date: Date;
}

export class BankAccountService implements AccountService {
  private balance = 0;
  private date= new Date();
  private transactions: Transaction[] = [];

  constructor(private printOutput: PrintOutput) {
  }

  private dateFormatter (date: Date): string{
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear()

    return [day, month, year].map( item => item.toString().padStart(2, "0")).join("/");
  }

  deposit(amount: number): void {
    this.balance += amount;

    this.transactions.push({ amount, balance: this.balance, date: new Date() });

  }

  printStatement(): void {
    const header = `Date || Amount || Balance`;
    const transactions = this.transactions.map(
      transaction => `${this.dateFormatter(transaction.date)} || ${transaction.amount} || ${transaction.balance}`
    );

    this.printOutput(["", header, ...transactions, ""].join("\n    "));
  }

  withdraw(amount: number): void {
  }
}
