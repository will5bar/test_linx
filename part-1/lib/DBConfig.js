const { customError } = require("./error.js");

//const Datastore = require('nedb')

const Datastore = require('nedb-promises')


// Class sqlite
class neDB {

	static getConection() {
    try {
      // retirn the Firebase object
      return {db: this._db};
    } catch (e) {
      throw customError("Error neDB", "getConection", 500, e);
    }
  }

  static async createConection() {
    try {

			if (this._db) {
        return neDB.getConection();
      }

      this._db = await new Datastore();
      //this.db = await new Datastore('./../data/test.db');

      //this._db.loadDatabase();

			return {db: this._db};

    } catch (e) {
      throw customError("Error neDB", "createConection", 500, e);
    }
  }
}

module.exports.DBConfig = neDB;
