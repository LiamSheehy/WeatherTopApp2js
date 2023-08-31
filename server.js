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

// Register the helper function here
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
    }
  }

}));

app.use("/", router);

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(`Todolist started on http://localhost:${listener.address().port}`);
});
