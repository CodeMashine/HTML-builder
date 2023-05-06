const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");

fs.writeFile(path.join(__dirname, "", "input.txt"), "", (err) => {
  if (err) console.log(err.message);
});

stdout.write("hello! input somethink..\n");

stdin.on("data", (data) => {
  fs.appendFile(
    path.join(__dirname, "", "input.txt"),
    data.toString().trim() + " ",
    (err) => {
      if (err) console.log(err);
    }
  );
});

process.on("exit", (code) => {
  if (code === 0) {
    // console.log("\nhave a nice day\n") ;
    stdout.write(`\ngood luck\n`);
  } else {
    console.log("\n something was broken\n");
  }
});
