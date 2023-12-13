const soap = require("soap");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const soapRoutes = require("./routes/soapRoutes"); // Adjust the path based on your project structure

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

// Use the SOAP routes defined in soapRoutes.js
app.use("/soap-endpoint", soapRoutes);
// REST SERVICE
app.use("/commentaires", commentairesRoutes);
app.use("/utilisateurs", utilisateursRoutes);
// Body parser middleware
app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);

// MongoDB controller
const traficController = require("./Controllers/TraficController");

// Define your SOAP service
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

// Read the WSDL file
const xml = require("fs").readFileSync("myservice.wsdl", "utf8");

// Create the SOAP server using Express
soap.listen(app, "/soap-endpoint", myService, xml, function () {
  console.log("SOAP server initialized");
});

// Start the Express server
const port = 8000;
app.listen(port, function () {
  console.log(`Express server listening on port ${port}`);
});
