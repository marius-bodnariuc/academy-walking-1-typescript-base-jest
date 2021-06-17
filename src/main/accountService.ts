import {PrintOutput} from "./printOutput";

export interface AccountService {
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
  printStatement: () => void;
}

export class BankAccountService implements AccountService {
  private balance = 0;
  private date= new Date();

  constructor(private printOutput: PrintOutput) {
  }

  private dateFormatter (date: Date): string{
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear()

    return [day, month, year].map( item => item.toString().padStart(2, "0")).join("/");
  }

  deposit(amount: number): void {
    this.date= new Date();
    this.balance = amount;
  }


  printStatement(): void {
    this.printOutput(`
    Date || Amount || Balance
    ${this.dateFormatter(this.date)} || ${this.balance} || ${this.balance}
    `);
  }

  withdraw(amount: number): void {
  }
}
