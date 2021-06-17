import {BankAccountService} from "../main/accountService";
import MockDate from 'mockdate'

function mockDate(today: string) {
  const dateParts = today.split("/").map(e => parseInt(e));
  const dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  MockDate.set(dateObject);
}

describe("Account Service", () => {
  describe("Given the proposed setup in the acceptance test", () => {
    it("Prints the expected output", () => {
      const printOutput = jest.fn();
      const accountService = new BankAccountService(printOutput);

      mockDate("10/01/2012");
      accountService.deposit(1000);

      mockDate("13/01/2012");
      accountService.deposit(2000);

      mockDate("14/01/2012");
      accountService.withdraw(500);

      accountService.printStatement();

      expect(printOutput).toHaveBeenCalledWith(`
    Date || Amount || Balance
    14/01/2012 || -500 || 2500
    13/01/2012 || 2000 || 3000
    10/01/2012 || 1000 || 1000
    `);
    })
  });
});
