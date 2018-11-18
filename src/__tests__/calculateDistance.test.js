const {
  calculateDistance,
  CalculateDistanceError,
  deg2rad
} = require("../calculateDistance");
const sampleDistanceData = require("./sample-distance-data.json");

describe("calculateDistance.js", () => {
  describe("deg2rad", () => {
    it("converts degrees to radians", () => {
      const actual = deg2rad(180);
      const expected = Math.PI;

      expect(actual).toEqual(expected);
    });
  });

  describe("calculateDistance", () => {
    it("throws if missing any params", () => {
      expect(() => {
        calculateDistance();
      }).toThrowError(CalculateDistanceError);
    });

    it("throws if missing second params", () => {
      expect(() => {
        calculateDistance({
          latitude: 53.339428,
          longitude: -6.257664
        });
      }).toThrowError(CalculateDistanceError);
    });

    it("does not throw if all params are included", () => {
      const sampleParam = {
        latitude: 53.339428,
        longitude: -6.257664
      };
      expect(() => {
        calculateDistance(sampleParam, sampleParam);
      }).not.toThrowError(CalculateDistanceError);
    });

    it("should return 0 if coordinates are identical", () => {
      const sampleParam = {
        latitude: 53.339428,
        longitude: -6.257664
      };
      const actual = calculateDistance(sampleParam, sampleParam);

      expect(actual).toEqual(0);
    });

    it("should return half Earth circumference if coordinates are antipodal", () => {
      const halfEarthCircumference = 20015.086796020572; // π * 6371 (Earth radius in km)
      const sampleParam1 = {
        latitude: 53,
        longitude: -6
      };
      const sampleParam2 = {
        latitude: -53,
        longitude: 174
      };
      const actual = calculateDistance(sampleParam1, sampleParam2);

      expect(actual).toEqual(halfEarthCircumference);
    });

    it("returns accurate distances in km for valid coordinates", () => {
      sampleDistanceData.forEach(([distance, ...sample]) => {
        const actual = calculateDistance(...sample);
        expect(actual).toEqual(distance);
      });
    });
  });
});
