const InfoTrafic = require("../models/infoTrafic");

const traficController = {
  getAllInfosTrafic: async function (args) {
    console.log("SOAP Request Args:", args);

    try {
      const infosTrafic = await InfoTrafic.find();
      console.log("Here the info tracffic reponse infosTrafic", infosTrafic);

      const soapResponseBody = {
        GetAllInfosTraficResponse: {
          infosTrafic: infosTrafic.map((info) => ({
            _id: info._id.toString(),
            localisation: info.localisation,
            destination: info.destination,
            route: info.route,
            etat: info.etat,
          })),
        },
      };

      return soapResponseBody;
    } catch (err) {
      console.error("Error in getAllInfosTrafic:", err);

      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  getInfoTraficById: async function (args) {
    console.log("SOAP Request Args:", args);

    const { id } = args; 

    try {
      const infoTrafic = await InfoTrafic.findById(id);
      console.log("Here the info trafic response:", infoTrafic);

      const soapResponseBody = {
        GetInfoTraficByIdResponse: {
          infoTrafic: {
            _id: infoTrafic._id.toString(),
            localisation: infoTrafic.localisation,
            destination: infoTrafic.destination,
            route: infoTrafic.route,
            etat: infoTrafic.etat,
          },
        },
      };

      return soapResponseBody;
    } catch (err) {
      console.error("Error in getInfoTraficById:", err);

      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  updateInfoTrafic: async function (args) {
    const { id, updatedInfo } = args; 

    try {
      const updatedInfoTrafic = await InfoTrafic.findByIdAndUpdate(
        id,
        updatedInfo,
        { new: true }
      );

      if (!updatedInfoTrafic) {
        throw new Error("Information de trafic non trouvée");
      }

      return {
        UpdateInfoTraficResponse: {
          updatedInfoTrafic: {
            _id: updatedInfoTrafic._id.toString(),
            localisation: updatedInfoTrafic.localisation,
            destination: updatedInfoTrafic.destination,
            route: updatedInfoTrafic.route,
            etat: updatedInfoTrafic.etat,
          },
        },
      };
    } catch (err) {
      console.error("Error in updateInfoTrafic:", err);
      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  createInfoTrafic: async function (args) {
    console.log("SOAP Request Args:", args);

    const { localisation, destination, route, etat } = args; 

    const newInfoTrafic = new InfoTrafic({
      localisation,
      destination,
      route,
      etat,
    });

    try {
      const savedInfoTrafic = await newInfoTrafic.save();
      console.log("Saved info trafic:", savedInfoTrafic);

      const soapResponseBody = {
        CreateInfoTraficResponse: {
          infoTrafic: {
            _id: savedInfoTrafic._id.toString(),
            localisation: savedInfoTrafic.localisation,
            destination: savedInfoTrafic.destination,
            route: savedInfoTrafic.route,
            etat: savedInfoTrafic.etat,
          },
        },
      };

      return soapResponseBody;
    } catch (err) {
      console.error("Error in createInfoTrafic:", err);

      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  deleteInfoTrafic: async function (args) {
    console.log("SOAP Request Args:", args);

    const { id } = args; 

    try {
      const deletedInfoTrafic = await InfoTrafic.findByIdAndDelete(id);
      console.log("Deleted info trafic:", deletedInfoTrafic);

      const soapResponseBody = {
        DeleteInfoTraficResponse: {
          message: "Information de trafic supprimée",
        },
      };

      return soapResponseBody;
    } catch (err) {
      console.error("Error in deleteInfoTrafic:", err);

      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  searchInfoTraficByLocation: async function (args) {
    console.log("SOAP Request Args:", args);

    const { location, destination } = args; 
    console.log("voila localisation", location);
    console.log("voila destination", destination);

    try {
      const infoTraficByLocation = await InfoTrafic.find({
        localisation: location.trim(),
        destination: destination.trim(),
      });
      console.log("here the infotrafic trouvé", infoTraficByLocation);

      const soapResponseBody = {
        SearchInfoTraficByLocationResponse: {
          infoTrafic: infoTraficByLocation.map((info) => ({
            _id: info._id.toString(),
            localisation: info.localisation,
            destination: info.destination,
            route: info.route,
            etat: info.etat,
          })),
        },
      };

      return soapResponseBody;
    } catch (err) {
      console.error("Error in searchInfoTraficByLocation:", err);

      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
};

module.exports = traficController;
