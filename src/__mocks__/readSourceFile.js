const readSourceFile = jest.genMockFromModule("../readSourceFile");

class ReadSourceFileError extends Error {}

readSourceFile.ReadSourceFileError = ReadSourceFileError;

module.exports = readSourceFile;
