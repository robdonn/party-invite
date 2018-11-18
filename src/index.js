#!/usr/bin/env node

const { argv } = require("yargs");
const { run } = require("./run");

const officeLocation = {
  latitude: argv.lat || 53.339428,
  longitude: argv.lon || -6.257664
};
const maxOfficeDistanceKm = argv.distance || 100;

run({
  officeLocation,
  maxOfficeDistanceKm,
  source: argv.source || "./customers.txt"
});
