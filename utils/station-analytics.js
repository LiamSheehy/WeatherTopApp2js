export const stationAnalytics = {
  getShortestReading(station) {
    let shortestReading = null;
    if (station.readings.length > 0) {
      shortestReading = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].code < shortestReading.code) {
          shortestReading = station.readings.length-1;
        }
      }
    }
    return shortestReading;
  },
};

