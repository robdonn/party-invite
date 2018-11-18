const { run } = require("./run");

const officeLocation = {
  latitude: 53.339428,
  longitude: -6.257664
};
const maxOfficeDistanceKm = 100;

run({ officeLocation, maxOfficeDistanceKm });
