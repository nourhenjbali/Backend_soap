const InfoTrafic = require("../models/infoTrafic");

const traficController = {
  getAllInfosTrafic: async function (args) {
    console.log("SOAP Request Args:", args);

    try {
      const infosTrafic = await InfoTrafic.find();
      console.log("Here the info tracffic reponse infosTrafic", infosTrafic);

      // Ensure that 'res' is defined and has the 'json' method before using it
      const soapResponseBody = {
        GetAllInfosTraficResponse: {
          infosTrafic: infosTrafic.map((info) => ({
            _id: info._id.toString(),
            localisation: info.localisation,
            etat: info.etat,
          })),
        },
      };

      // Return the SOAP response
      return soapResponseBody;
    } catch (err) {
      console.error("Error in getAllInfosTrafic:", err);

      // Throw an error for SOAP to handle
      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  getInfoTraficById: async function (args) {
    console.log("SOAP Request Args:", args);

    const { id } = args; // Retrieve id from SOAP request args

    try {
      const infoTrafic = await InfoTrafic.findById(id);
      console.log("Here the info trafic response:", infoTrafic);

      // Ensure that 'res' is defined and has the 'json' method before using it
      const soapResponseBody = {
        GetInfoTraficByIdResponse: {
          infoTrafic: {
            _id: infoTrafic._id.toString(),
            localisation: infoTrafic.localisation,
            etat: infoTrafic.etat,
          },
        },
      };

      // Return the SOAP response
      return soapResponseBody;
    } catch (err) {
      console.error("Error in getInfoTraficById:", err);

      // Throw an error for SOAP to handle
      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  updateInfoTrafic: async function (args) {
    const { id, updatedInfo } = args; // Assuming your SOAP request provides an 'id' and 'updatedInfo'

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
            etat: updatedInfoTrafic.etat,
            // Add other properties as needed
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

    const { localisation, etat } = args; // Retrieve parameters from SOAP request args

    const newInfoTrafic = new InfoTrafic({ localisation, etat });

    try {
      const savedInfoTrafic = await newInfoTrafic.save();
      console.log("Saved info trafic:", savedInfoTrafic);

      // Ensure that 'res' is defined and has the 'json' method before using it
      const soapResponseBody = {
        CreateInfoTraficResponse: {
          infoTrafic: {
            _id: savedInfoTrafic._id.toString(),
            localisation: savedInfoTrafic.localisation,
            etat: savedInfoTrafic.etat,
          },
        },
      };

      // Return the SOAP response
      return soapResponseBody;
    } catch (err) {
      console.error("Error in createInfoTrafic:", err);

      // Throw an error for SOAP to handle
      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  deleteInfoTrafic: async function (args) {
    console.log("SOAP Request Args:", args);

    const { id } = args; // Retrieve id from SOAP request args

    try {
      const deletedInfoTrafic = await InfoTrafic.findByIdAndDelete(id);
      console.log("Deleted info trafic:", deletedInfoTrafic);

      // Ensure that 'res' is defined and has the 'json' method before using it
      const soapResponseBody = {
        DeleteInfoTraficResponse: {
          message: "Information de trafic supprimée",
        },
      };

      // Return the SOAP response
      return soapResponseBody;
    } catch (err) {
      console.error("Error in deleteInfoTrafic:", err);

      // Throw an error for SOAP to handle
      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
  searchInfoTraficByLocation: async function (args) {
    console.log("SOAP Request Args:", args);

    const { location } = args; // Retrieve location parameter from SOAP request args

    try {
      // Assume there is a method in your model or another way to search by location
      const infoTraficByLocation = await InfoTrafic.find({
        localisation: location,
      });

      // Ensure that 'res' is defined and has the 'json' method before using it
      const soapResponseBody = {
        SearchInfoTraficByLocationResponse: {
          infoTrafic: infoTraficByLocation.map((info) => ({
            _id: info._id.toString(),
            localisation: info.localisation,
            etat: info.etat,
          })),
        },
      };

      // Return the SOAP response
      return soapResponseBody;
    } catch (err) {
      console.error("Error in searchInfoTraficByLocation:", err);

      // Throw an error for SOAP to handle
      throw new Error(`SOAP Error: ${err.message}`);
    }
  },
};

module.exports = traficController;
