import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.engine(".hbs", engine({
  extname: ".hbs",
  helpers: {
    convertToWeatherCode: function(code) {
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
    },
    convertToBeaufort: function(windSpeed) {
      let beaufort;

      if (windSpeed === 1) {
        beaufort = 0;
      } else if (windSpeed > 1 && windSpeed <= 5) {
        beaufort = 1;
      } else if (windSpeed >= 6 && windSpeed <= 11) {
        beaufort = 2;
      } else if (windSpeed >= 12 && windSpeed <= 19) {
        beaufort = 3;
      } else if (windSpeed >= 20 && windSpeed <= 28) {
        beaufort = 4;
      } else if (windSpeed >= 29 && windSpeed <= 38) {
        beaufort = 5;
      } else if (windSpeed >= 39 && windSpeed <= 49) {
        beaufort = 6;
      } else if (windSpeed >= 50 && windSpeed <= 61) {
        beaufort = 7;
      } else if (windSpeed >= 62 && windSpeed <= 74) {
        beaufort = 8;
      } else if (windSpeed >= 75 && windSpeed <= 88) {
        beaufort = 9;
      } else if (windSpeed >= 89 && windSpeed <= 102) {
        beaufort = 10;
      } else if (windSpeed >= 103 && windSpeed <= 117) {
        beaufort = 11;
      } else {
        beaufort = 0;
      }
      return beaufort;
    },
     convertToCompassDirection: function (windDirection) {
      const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      const index = Math.round((windDirection / 22.5) + 0.5) % 16;
      return directions[index];
    },
    calculateWindChill: function (temp, windSpeed) {
      const windChill = 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
      return Math.round(windChill * 100.0) / 100.0;
    },
    convertToFahrenheit: function (temp) {
    const fahrenheit = (temp * 1.8) + 32;
    return fahrenheit;
  }
  }
}));


app.use("/", router);

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(`Todolist started on http://localhost:${listener.address().port}`);
});
