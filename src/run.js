const { readSourceFile, ReadSourceFileError } = require("./readSourceFile");
const { calculateDistance } = require("./calculateDistance");
const { handleError } = require("./handleError");

/**
 * Reads data from file and logs id and name of users within set distance
 * @param {object} params
 * @param {object} params.officeLocation Object containing latitude and longitude of office location
 * @param {number} params.maxOfficeDistanceKm Distance in km to allow invitations
 */
const run = ({ officeLocation, maxOfficeDistanceKm } = {}) => {
  try {
    if (!officeLocation || !maxOfficeDistanceKm) {
      throw new Error("Missing required defaults");
    }

    const customers = readSourceFile();

    customers
      .filter(
        customer =>
          calculateDistance(customer, officeLocation) <= maxOfficeDistanceKm
      )
      .sort((a, b) => a.user_id - b.user_id)
      .map(customer => `${customer.user_id} - ${customer.name}`)
      .forEach(customer => {
        console.log(customer);
      });
  } catch (error) {
    handleError(error);
  }
};

module.exports = {
  run
};
