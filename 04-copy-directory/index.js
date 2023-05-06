function copyDir(mainWay, copyFolder, nameNewFolder) {
  const fs = require("fs");
  const path = require("path");

  fs.opendir(path.resolve(mainWay, nameNewFolder), (err) => {
    if (err) {
      fs.mkdir(path.resolve(mainWay, nameNewFolder), (err) => {
        if (err) console.log(err.message);
        console.log(nameNewFolder + " created");
      });
    } else {
      fs.rmdir(path.resolve(mainWay, nameNewFolder), (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(nameNewFolder + " deleted");
          copyDir(mainWay, copyFolder, nameNewFolder);
        }
      });
    }
  });

  fs.readdir(path.resolve(mainWay, copyFolder), (err, files) => {
    if (err) console.log(err.message);
    if (files) {
      const copyFrom = path.resolve(mainWay, copyFolder);
      const copyTo = path.resolve(mainWay, nameNewFolder);
      files.forEach((file) => {
        fs.copyFile(
          path.resolve(copyFrom, file),
          path.resolve(copyTo, file),
          (err) => {
            if (err) console.log(console.log(message));
          }
        );
      });
    }
  });
}

copyDir(__dirname, "files", "files-copy");
