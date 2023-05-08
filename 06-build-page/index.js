const fs = require("fs") ;

const path = require("path") ;


class HTMLBuilder {
  constructor(dist , assets , style , html , components){
    this.dist = dist;
    this.assets = assets;
    this.style = style ;
    this.html = html ;
    this.components = components ;
    this.output = "index.html" ;
  }

  init(){
    const distPath = path.resolve(__dirname , this.dist) ;

    fs.opendir(distPath, (err) => {
      if (err) {
        fs.mkdir( distPath, (err) => {
          if (err) console.log(err.message);
          console.log("created dist");
          fs.mkdir(path.resolve(distPath , this.assets) , err=>{
            if(err) return console.log(err.message) ;
            console.log("create assets") ;
            this.fillAssets() ;
            fs.writeFile(path.resolve(distPath , "style.css"),"" , err=>{
              if(err) console.log(err.message) ;
            }) ;
            this.cssPicker() ;
            this.HTMLPicker() ;
            console.log("HTML bulder work ended succesfull") ;
          });
        });
      } else {
        fs.rm(distPath,{ recursive: true }, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("deleted dist");
            this.init() ;
          }
        });
      }
    });
  }

  async createDist(){
    const distPath = path.resolve(__dirname , this.dist) ;
    try {
      await fs.promises.rm(distPath,{recursive:true}) ;
      await fs.promises.mkdir(distPath) ;
    } catch (error) {
      await fs.promises.mkdir(distPath) ;
      console.log(error.message) ;
    }
    // if ( isAvaileble )
    // fs.promises.mkdir(distPath) ;
  }

  async createAssets(){
    const assetsPath = path.resolve(__dirname , this.dist,this.assets) ;
    try {
      await fs.promises.rm(assetsPath,{recursive:true}) ;
      await fs.promises.mkdir(assetsPath) ;
    } catch (error) {
      await fs.promises.mkdir(assetsPath) ;
      console.log(error.message) ;
    }
  }



  fillAssets(){
    console.log("fill assets work") ;
    const copyFrom = path.resolve(__dirname , this.assets) ;

    const distPath = path.resolve(__dirname , this.dist) ;
    const copyTo = path.resolve(distPath , this.assets) ;
    // fs.readdir()
    dive(copyFrom , copyTo) ;

    async function dive(copyFrom , copyTo){
      try {
        const files = await fs.promises.readdir(copyFrom , {withFileTypes:true}) ;
        files.forEach( file =>{
          if( file.isFile() ){
            fs.copyFile(path.resolve(copyFrom , file.name) , path.resolve(copyTo , file.name) , 
              err => {
                if(err)  console.log(err.message) ;
              }) ;
          } else if( file.isDirectory() ) {
            const newCopyFrom = path.resolve(copyFrom , file.name) ;
            const newCopyTo = path.resolve(copyTo , file.name) ;
            fs.mkdir(path.resolve(copyTo , file.name) , err => {
              if(err) console.log(err.message) ;
            }) ;
            return dive(newCopyFrom , newCopyTo) ;
          }
        }) ;
      } catch (error) {
        console.log(error.message) ;
      }

    }
  }

  async cssPicker() {
    console.log("css picker work") ;

    const pickFrom = path.resolve(__dirname , this.style) ;
    
    const distPath = path.resolve(__dirname , this.dist) ;
    
    const stylePath = path.resolve(distPath , "style.css") ;

    try {
      let files = await fs.promises.readdir(pickFrom) ;
      files.forEach( file =>{
        if(file.includes(".css")) {
          fs.readFile(path.resolve(pickFrom , file) , 
            (err , data) => {
              if (err) return err ;
              fs.appendFile(stylePath , data , err => {
                if(err) return err;
              }) ;

            }) ;
        }
      }) ;
    } catch (error) {
      console.log(error.message) ;
    }

  }

  async HTMLPicker(){
    console.log("html picker work") ;
    try {

      const componentsPath = path.resolve(__dirname , this.components) ;
      const numberComp = {} ;

      const compNames = await fs.promises.readdir(componentsPath) ; 
      
      for(let name of compNames){
        const namePath = path.resolve(componentsPath , name) ;
        const filing = await fs.promises.readFile(namePath ,{encoding:"utf-8"}) ;
        const output = name.replace(".html" , "") ;
        numberComp[output] = filing ;
      }
      
      const templatePath = path.resolve(__dirname , this.html) ;
      const template = await fs.promises.readFile(templatePath , {encoding:"utf-8"}) ;

      let index = template ;

      for( let tag in numberComp ){
        index = index.replace(`{{${tag}}}` , numberComp[tag] ) ;
      }

      const distPath = path.resolve(__dirname , this.dist) ;
      const outputPath = path.resolve(distPath , this.output) ;
      fs.promises.writeFile(outputPath , index) ;

      
    } catch (error) {
      console.log(error.message) ;
    }

  }
}

const builder = new HTMLBuilder("project-dist" , "assets" , "styles" ,"template.html" , "components") ;

builder.init() ;
// (async ()=>{
//   await builder.createDist() ;
//   await builder.createAssets() ;
// })() ;

// builder.createDist().then( builder.createAssets()) ;