
export const stationAnalytics = {
  getLatestReading(station) {
    let latestReading = null;
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
    }
    console.log(station); 
    return latestReading;
  },
};

import handlebars from 'express-handlebars';


// ... (other configurations)

// Define the helper function
handlebars.create({
  helpers: {
    convertToWeathercode: function(code) {
      if (code === 100) {
        return "Clear";
      } else if (code === 200) {
        return "Partial clouds";
      } else if (code === 300) {
        return "Cloudy";
      } else if (code === 400) {
        return "Light Showers";
      } else if (code === 500) {
        return "Heavy Showers";
      } else if (code === 600) {
        return "Rain";
      } else if (code === 700) {
        return "Snow";
      } else if (code === 800) {
        return "Thunder";
      } else {
        return "Unknown";
      }
    }
  }
});

// ... (other configurations)
