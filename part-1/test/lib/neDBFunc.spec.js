
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');

const { DBConfig } = require("../../lib/DBConfig.js");
const { UpdateDB, SelectDataDB, AddDataDB } = require("../../lib/DBFunc.js");


// SelectDataDB

describe('neDB SelectDataDB OK', () => {
    let neDB;
    let info = { "id" : "123", "name" : "name1" };
    beforeEach(async () => {
        // get the DB
        // stub the collection
        neDB = {
            SelectDataDB: (coll, data, projection) => {
                return Promise.resolve({
                  "id": "123",
                  "name": "name1",
                  "dateCreation": "2020-09-21T22:24:30.761Z",
                  "_id": "zqBXrKqxb23kiOwZ"
                });
                }
            };
          });
          

    it('check SelectDataDB', async () => {    
        const response = await neDB.SelectDataDB(info);
        response._id.should.equal('zqBXrKqxb23kiOwZ');
    });
});

describe('neDB SelectDataDB retorna null', () => {
    let neDB;
    let info = { "id" : "123", "name" : "name1" };

    beforeEach(async () => {
        // get the DB
        const db = await DBConfig.createConection();
        // stub the collection
        neDB = {
            SelectDataDB: function(coll, data, projection) {
                return Promise.resolve(null);
            }
        };
      });


    it('SelectDataDB retorna null', async () => {   
        const response = await neDB.SelectDataDB(info);
        expect(response).to.equal(null);

    });
});


describe('neDB SelectDataDB Error', () => {
    let neDB;
    let info = { "id" : "123", "name" : "name1" };
    beforeEach(async () => {
        // get the DB
        const db = await DBConfig.createConection();
        // stub the collection
        neDB = {
            SelectDataDB: function(coll, data, projection) {
                return Promise.reject({message: "Error SelectDataDB"});
            }
        };
      });

    it('Error no SelectDataDB', async () => {   
        try { 
            await neDB.SelectDataDB(info);
        } catch(e) {
            e.message.should.equal("Error SelectDataDB");
        }
    });
});


// insert

let info = { "id" : "123", "name" : "name1" };



describe('neDB AddDataDB OK', () => {
    let neDB;
    beforeEach(async () => {
        // get the DB
        const db = await DBConfig.createConection();
        // stub the collection
        neDB = {
            AddDataDB: function(data) {
                return Promise.resolve(
                    {
                      dateCreation: "2020-09-21T22:24:30.761Z",
                      _id: "zqBXrKqxb23kiOwZ",
                      ...data
                    });
            }
        };
      });

    it('check AddDataDB', async () => {    
        const result = await neDB.AddDataDB({ ... info , dateCreation : new Date() });
        
        result._id.should.equal('zqBXrKqxb23kiOwZ');
    });
});


describe('neDB AddDataDB Error', () => {
    let neDB;
    beforeEach(async () => {
        // get the DB
        const db = await DBConfig.createConection();
        // stub the collection
        neDB = {
            AddDataDB: function(data) {
                return Promise.reject({message: "Error AddDataDB"});
            }
        };
      });

    it('Error no AddDataDB', async () => {   
        try { 
            await neDB.AddDataDB({ ... info , dateCreation : new Date() })
        } catch(e) {
            e.message.should.equal("Error AddDataDB");
        }
 
    });
});