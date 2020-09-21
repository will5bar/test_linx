const { customError } = require("./error.js");
const { DBConfig } = require("./DBConfig.js");

//--------------------------
//--------------------------

//-------
// FIND
//-------
// Select Data
const SelectDataDB = async (sql_query) => {
  try {
    // Conection DB
    const { db } = await DBConfig.createConection();

    // Get Data
		const result =  await db.find(sql_query);

		return result;

  } catch (e) {
    throw customError("Error neDB", "SelectDataDB", 500, e);
  }
};

//------
// ADD
//------

// Select Data
const AddDataDB = async (sql_query) => {
  try {
    // Conection DB
    const { db } = await DBConfig.createConection();

    // Get Data
		const result =  await db.insert(sql_query);

		return result;

  } catch (e) {
    throw customError("Error neDB", "AddDataDB", 500, e);
  }
};

// Select Data
const UpdateDB = async (sql_query) => {
  try {
    // Conection DB
    const { db } = await DBConfig.createConection();

    console.log('sql_query' , sql_query);

    // Get Data
		const result =  await db.update(sql_query , { $set: { dateCreation : new Date() } } , { returnUpdatedDocs : true } );

		return result;

  } catch (e) {
    throw customError("Error neDB", "UpdateDB", 500, e);
  }
};

//-------------------------------------------------
//-------------------------------------------------

module.exports.AddDataDB = AddDataDB;
module.exports.UpdateDB = UpdateDB;
module.exports.SelectDataDB = SelectDataDB;
