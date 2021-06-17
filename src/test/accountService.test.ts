import {BankAccountService} from "../main/accountService";

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
});