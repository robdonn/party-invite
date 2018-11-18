const fs = require("fs");
const path = require("path");
const { readSourceFile, ReadSourceFileError } = require("../readSourceFile");

jest.mock("fs", () => ({
  readFileSync: jest.fn()
}));
jest.mock("path", () => ({
  join: jest.fn(() => "testPath")
}));

describe("readSourceFile.js", () => {
  describe("readSourceFile", () => {
    it("reads and parses file as expected", () => {
      fs.readFileSync.mockReturnValueOnce(
        '{"sample": "value1"}\n{"sample":"value2"}'
      );
      const output = readSourceFile();

      expect(path.join).toHaveBeenCalled();
      expect(fs.readFileSync).toHaveBeenCalledWith("testPath", {
        encoding: "utf8"
      });
      expect(output).toEqual([{ sample: "value1" }, { sample: "value2" }]);
    });

    it("removes blank lines", () => {
      fs.readFileSync.mockReturnValueOnce(
        '\n\n{"sample": "value1"}\n\n\n{"sample":"value2"}\n\n\n'
      );
      const output = readSourceFile();
      expect(output).toEqual([{ sample: "value1" }, { sample: "value2" }]);
    });

    it("returns empty array if file empty", () => {
      fs.readFileSync.mockReturnValueOnce("");

      const output = readSourceFile();

      expect(output).toEqual([]);
    });

    it("throws if file cannot be found", () => {
      fs.readFileSync.mockImplementation(() => {
        const error = new Error("Unable to find file");
        error.code = "ENOENT";
        throw error;
      });

      try {
        readSourceFile();
      } catch (error) {
        expect(error).toBeInstanceOf(ReadSourceFileError);
        expect(error.message).toEqual("Unable to find file testPath");
      }
    });

    it("throws if lines do not match JSON format", () => {
      fs.readFileSync.mockReturnValueOnce("Strings");

      try {
        readSourceFile();
      } catch (error) {
        expect(error).toBeInstanceOf(ReadSourceFileError);
        expect(error.message).toEqual(
          "Unable to parse file, data not in valid JSON format"
        );
      }
    });

    it("handles unforseen errors", () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error("Unforseen error");
      });

      try {
        readSourceFile();
      } catch (error) {
        expect(error.message).toEqual("Unforseen error");
      }
    });
  });
});
