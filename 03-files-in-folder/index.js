const path = require("path") ;
const fs = require("fs") ;

const secretFolder = path.resolve( __dirname , "secret-folder") ;

function readDir(adress) {
  fs.readdir( adress , (err , data ) => {
    if ( err ) console.log(err.message) ;
    data.forEach( file =>{
      const filePath = path.resolve(adress , file) ;
      fs.stat( filePath , (err , stat) =>{
        if ( err ) console.log( err.message ) ;
        if(stat.isFile()) {
          const type = path.extname(filePath).replace("." ,"") ;
          const name = path.basename(filePath).replace("."+type , "") ;
          const size = (stat.size/124).toFixed(3) ;
          console.log(`${name} - ${type} - ${size}kb`);
        }
      });
    });
  });  
}
    
readDir(secretFolder) ;