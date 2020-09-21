const express = require("express");

const { customError } = require("./../../lib/error.js");

const { AddDataDB , 
        SelectDataDB,
        UpdateDB } = require("./../../lib/DBFunc.js");

const moment = require('moment'); // require
moment().format(); 

const router = express.Router();

//-----------------------------------
//-----------------------------------

router.post(
  "/v1/products",
  async (req, res, next) => {
    try {

      let info = req.body; // tomamos [data_ini]

      dataVer = await SelectDataDB(info);

      if ( dataVer.length === 0 ) {

        let data = await AddDataDB({ ... info , dateCreation : new Date() });

        // Respuesta Front
        res.locals.responseSend = { message: "ok" , data : data };
        res.locals.responseCode = 200;

      } else {

        let doc = dataVer[0];

        let b = moment( doc.dateCreation );
        let a = moment( new Date() );

        let timer = a.diff(b, 'seconds');

        //console.log('timer' , timer);

        if ( timer > 600 ) {

          let data = await UpdateDB({ _id: doc._id });

          res.locals.responseSend = { message: "ok" , data : data };
          res.locals.responseCode = 200;

        } else {

          res.locals.responseSend = { message: "Nok" };
          res.locals.responseCode = 403;

        }

      }

      // call the responseÂ´s log middleware
      next();
    } catch (e) {
      //console.log('Error occurred');
      // call the Error middleware
      next(e);
    }
  }
);

//-----------------------------------
//-----------------------------------

module.exports.routerIndex = router;
