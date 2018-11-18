const { readSourceFile, ReadSourceFileError } = require("../readSourceFile");
const { calculateDistance } = require("../calculateDistance");
const { handleError } = require("../handleError");
const { run } = require("../run");

jest.mock("../readSourceFile");
jest.mock("../calculateDistance");
jest.mock("../handleError");

const mockParams = {
  officeLocation: {
    latitude: 53.339428,
    longitude: -6.257664
  },
  maxOfficeDistanceKm: 100
};

const { log } = console;
console.log = jest.fn();

describe("run.js", () => {
  describe("run", () => {
    beforeEach(() => {
      readSourceFile.mockClear();
      calculateDistance.mockClear();
      handleError.mockClear();
      console.log.mockClear();
      jest.resetModules();
    });

    afterAll(() => {
      console = { ...console, log };
    });

    it("outputs nothing if file is empty", () => {
      readSourceFile.mockReturnValue([]);

      run(mockParams);

      expect(readSourceFile).toHaveBeenCalledTimes(1);
      expect(calculateDistance).not.toHaveBeenCalled();
      expect(console.log).not.toHaveBeenCalled();
    });

    it("outputs valid inputs", () => {
      readSourceFile.mockReturnValue([
        { user_id: 2, name: 50 },
        { user_id: 6, name: 0 },
        { user_id: 5, name: 101 },
        { user_id: 3, name: 79 },
        { user_id: 4, name: 100 },
        { user_id: 7, name: -200 },
        { user_id: 1, name: 20 }
      ]);
      calculateDistance.mockImplementation(({ name }) => name);

      run(mockParams);

      expect(readSourceFile).toHaveBeenCalledTimes(1);
      expect(calculateDistance).toHaveBeenCalledTimes(7);
      expect(console.log).toHaveBeenCalledTimes(6);
      expect(console.log).toHaveBeenNthCalledWith(1, "1 - 20");
      expect(console.log).toHaveBeenNthCalledWith(2, "2 - 50");
      expect(console.log).toHaveBeenNthCalledWith(3, "3 - 79");
      expect(console.log).toHaveBeenNthCalledWith(4, "4 - 100");
      expect(console.log).toHaveBeenNthCalledWith(5, "6 - 0");
      expect(console.log).toHaveBeenNthCalledWith(6, "7 - -200");
    });

    it("outputs error if file reading fails", () => {
      readSourceFile.mockImplementation(() => {
        throw new ReadSourceFileError("Uh oh!");
      });

      run(mockParams);

      expect(readSourceFile).toHaveBeenCalledTimes(1);
      expect(handleError).toHaveBeenCalledTimes(1);
    });

    it("outputs error if missing default params", () => {
      run();

      expect(readSourceFile).not.toHaveBeenCalled();
      expect(handleError).toHaveBeenCalledTimes(1);
    });
  });
});
