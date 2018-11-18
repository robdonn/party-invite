const deg2rad = deg => deg * (Math.PI / 180);

class CalculateDistanceError extends Error {}

/**
 * Calculates arc distance between 2 points on a sphere of radius 6371
 * @param {object} pointA Coordinates of PointA
 * @param {object} pointB Coordinates of PointB
 * @returns {number} Distance
 */
const calculateDistance = (pointA = {}, pointB = {}) => {
  [pointA, pointB].forEach(param => {
    if (
      !param.latitude ||
      Number.isNaN(param.latitude) ||
      !param.longitude ||
      Number.isNaN(param.longitude)
    ) {
      throw new CalculateDistanceError("Invalid params");
    }
  });
  const earthRadiusInKm = 6371;
  const lat1Radians = deg2rad(pointA.latitude);
  const lat2Radians = deg2rad(pointB.latitude);
  const latDiffRadians = deg2rad(pointB.latitude - pointA.latitude);
  const lonDiffRadians = deg2rad(pointB.longitude - pointA.longitude);

  const a =
    Math.sin(latDiffRadians / 2) * Math.sin(latDiffRadians / 2) +
    Math.cos(lat1Radians) *
      Math.cos(lat2Radians) *
      Math.sin(lonDiffRadians / 2) *
      Math.sin(lonDiffRadians / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusInKm * c;
};

module.exports = {
  deg2rad,
  calculateDistance,
  CalculateDistanceError
};
