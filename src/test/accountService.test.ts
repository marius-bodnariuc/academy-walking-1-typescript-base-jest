import {BankAccountService} from "../main/accountService";
import MockDate from 'mockdate'

describe("Account Service", () => {
  describe("Given the proposed setup in the acceptance test", () => {
    it("Prints the expected output", () => {
      const printOutput = jest.fn();
      const accountService = new BankAccountService(printOutput);

      accountService.deposit(1000);
      accountService.deposit(2000);
      accountService.withdraw(500);

      accountService.printStatement();

      expect(printOutput).toHaveBeenCalledWith(`Date || Amount || Balance
    14/01/2012 || -500 || 2500
    13/01/2012 || 2000 || 3000
    10/01/2012 || 1000 || 1000
    `);
    })
  });

  it.each(
    [1000, 2000, 3000]
  )("Prints %i when we deposit %i", (amount: number) => {
    const printOutput = jest.fn();
    const accountService = new BankAccountService(printOutput);

    accountService.deposit(amount);
    accountService.printStatement();

    expect(printOutput).toHaveBeenCalledWith(`
    Date || Amount || Balance
    17/06/2021 || ${amount} || ${amount}
    `);
  });

  it.each(
    [ '17/06/2021', '18/06/2021']
  )("on date %s when we deposit %i", (today: string) => {
    const dateParts = today.split("/").map(e => parseInt(e));
    const dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    MockDate.set(dateObject);

    const printOutput = jest.fn();
    const amount = 1000;

    const accountService = new BankAccountService(printOutput);

    accountService.deposit(amount);
    accountService.printStatement();

    expect(printOutput).toHaveBeenCalledWith(`
    Date || Amount || Balance
    ${today} || ${amount} || ${amount}
    `);
  });

});
