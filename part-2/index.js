const fs = require('fs');
const readline = require('readline');

const _ = require('lodash');

//--------------------
//--------------------

// Truncata File
let fileOpen = `./data/output/info`;
fs.truncateSync(fileOpen);

const readInterface = readline.createInterface({
    input: fs.createReadStream('./data/load/load'),
    start : 1
});

// Data de entrada
let loadIn = [];

readInterface
.on('line', function(line) {
    loadIn.push( JSON.parse(line) );
})
.on('close', function() {

  let loadOut = [];

  let loadGroup = _.groupBy(loadIn, 'productId');

  _.forEach(loadGroup, function(value, key) {

    let images = [];
    let conta = 0;

    for ( i of value ) {
      
      // Simula Get da Imagen
      if (Math.random() > 0.5) {
        conta += 1;
        if ( conta < 3 ) { 
          images.push(i.image) 
        }else{
          break
        };
      }

    }

    loadOut.push({ productId : key , image : images });

  });

  // Store Data
  let newLine;

  for ( i of loadOut ) {
    newLine = JSON.stringify(i);
    fs.appendFileSync( fileOpen , newLine + "\n"); 
  }

  //process.exit(0);
});
