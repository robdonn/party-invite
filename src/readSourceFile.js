const path = require("path");
const fs = require("fs");

class ReadSourceFileError extends Error {}

/**
 * Reads source file and parses for user data
 * @returns {[object]} Array of user objects
 */
const readSourceFile = source => {
  const filePath = path.join(process.cwd(), source);
  try {
    const file = fs.readFileSync(filePath, {
      encoding: "utf8"
    });
    const customers = file
      .split(/\n/)
      .filter(customer => customer) // Remove blank lines
      .map(customer => JSON.parse(customer));

    return customers;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new ReadSourceFileError(`Unable to find file ${filePath}`);
    }

    if (error instanceof SyntaxError) {
      throw new ReadSourceFileError(
        "Unable to parse file, data not in valid JSON format"
      );
    }

    throw error;
  }
};

module.exports = { readSourceFile, ReadSourceFileError };
