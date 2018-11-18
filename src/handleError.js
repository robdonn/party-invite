const { ReadSourceFileError } = require("./readSourceFile");
const { CalculateDistanceError } = require("./calculateDistance");

/**
 * Handles errors, outputs explanation if known error, raw error if unknown
 * @param {Error} error
 */
const handleError = error => {
  if (error instanceof ReadSourceFileError) {
    console.error(
      `There was a problem with the data entry file: ${error.message}`
    );
  } else if (error instanceof CalculateDistanceError) {
    console.error(
      `There was a problem with calculating distance: ${error.message}`
    );
  } else {
    console.error(error);
  }
  process.exit(1);
};

module.exports = {
  handleError
};
