import {PrintOutput} from "./printOutput";

export interface AccountService {
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  printStatement: () => void;
}

export class BankAccountService implements AccountService {
  private balance = 0;

  constructor(private printOutput: PrintOutput) {
  }

  deposit(amount: number): void {
    this.balance = amount;
  }

  printStatement(): void {
    this.printOutput(`
    Date || Amount || Balance
    17/06/2021 || ${this.balance} || ${this.balance}
    `);
  }

  withdraw(amount: number): void {
  }
}