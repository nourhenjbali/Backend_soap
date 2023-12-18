const soap = require("soap");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const soapRoutes = require("./routes/soapRoutes"); // Adjust the path based on your project structure
const accidentRoutes = require("./routes/accidentRoutes"); // Update the path accordingly

const commentairesRoutes = require("./routes/commentairesRoutes");
const utilisateursRoutes = require("./routes/utilisateursRoutes");
require("dotenv").config();

const app = express();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};
connect();

app.use("/soap-endpoint", soapRoutes);
app.use("/commentaires", commentairesRoutes);
app.use("/utilisateurs", utilisateursRoutes);
app.use("/", accidentRoutes);
app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);

const traficController = require("./Controllers/TraficController");

const myService = {
  MyService: {
    MyPort: {
      GetAllInfosTrafic: async function () {
        try {
          console.log("we are here ");
          return await traficController.getAllInfosTrafic();
        } catch (error) {
          console.error("Error in GetAllInfosTrafic:", error);
          throw error;
        }
      },
      GetInfoTraficById: async function (args) {
        return await traficController.getInfoTraficById(args);
      },
      CreateInfoTrafic: async function (args) {
        return await traficController.createInfoTrafic(args);
      },
      UpdateInfoTrafic: async function (args) {
        return await traficController.updateInfoTrafic(args);
      },
      DeleteInfoTrafic: async function (args) {
        return await traficController.deleteInfoTrafic(args.id);
      },
      SearchInfoTraficByLocation: async function (args) {
        try {
          console.log("we are here in SearchInfoTraficByLocation");
          return await traficController.searchInfoTraficByLocation(args);
        } catch (error) {
          console.error("Error in SearchInfoTraficByLocation:", error);
          throw error;
        }
      },
    },
  },
};

const xml = require("fs").readFileSync("myservice.wsdl", "utf8");

soap.listen(app, "/soap-endpoint", myService, xml, function () {
  console.log("SOAP server initialized");
});

const port = 8000;
app.listen(port, function () {
  console.log(`Express server listening on port ${port}`);
});
