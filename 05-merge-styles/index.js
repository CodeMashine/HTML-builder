function cssPicker(from, to, name) {
  const fs = require('fs');
  const path = require('path');

  const pickFrom = path.resolve(__dirname, from);
  const pickTo = path.resolve(__dirname, to);

  fs.readdir(pickTo, (err, data) => {
    if (err) console.log(err.message);
    if (data.includes(name)) {
      fs.unlink(path.resolve(pickTo, name), (err) => {
        if (err) console.log(err.message);
      });
      fs.writeFile(path.resolve(pickTo, name), '', (err) => {
        if (err) console.log(name + ' created');
      });
    }
  });

  fs.readdir(pickFrom, (err, data) => {
    if (err) console.log(err.message);
    data.forEach((file) => {
      if (!file.includes('.css')) return;
      fs.readFile(path.resolve(pickFrom, file), '', (err, data) => {
        if (err) console.log(err.message);
        fs.appendFile(path.resolve(pickTo, name), data, (err) => {
          if (err) console.log(err.message);
        });
      });
    });
  });
}

cssPicker('styles', 'project-dist', 'bundle.css');
