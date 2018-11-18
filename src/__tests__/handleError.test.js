const { handleError } = require("../handleError");
const { ReadSourceFileError } = require("../readSourceFile");
const { CalculateDistanceError } = require("../calculateDistance");

const { error } = console;
const { exit } = process;

console.error = jest.fn();
process.exit = jest.fn();

describe("handleError.js", () => {
  describe("handleError", () => {
    beforeEach(() => {
      console.error.mockClear();
      process.exit.mockClear();
    });

    afterAll(() => {
      console = { ...console, error };
      process = { ...process, exit };
    });

    it("handles normal errors", () => {
      const normalError = new Error("Normal error");

      handleError(normalError);

      expect(console.error).toHaveBeenCalledWith(normalError);
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("handles ReadSourceFileError", () => {
      const readSourceFileError = new ReadSourceFileError(
        "ReadSourceFileError"
      );

      handleError(readSourceFileError);

      expect(console.error).toHaveBeenCalledWith(
        "There was a problem with the data entry file: ReadSourceFileError"
      );
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("handles CalculateDistanceError", () => {
      const calculateDistanceError = new CalculateDistanceError(
        "CalculateDistanceError"
      );

      handleError(calculateDistanceError);

      expect(console.error).toHaveBeenCalledWith(
        "There was a problem with calculating distance: CalculateDistanceError"
      );
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });
});
