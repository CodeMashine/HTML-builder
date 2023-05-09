const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, '', 'input.txt'), '', (err) => {
  if (err) console.log(err.message);
});

stdout.write('hello! input somethink..\n');

stdin.on('data', (data) => {
  const input = data.toString().trim();
  if(input === 'exit') process.exit() ;
  fs.appendFile(
    path.join(__dirname, '', 'input.txt'),
    input + ' ',
    (err) => {
      if (err) console.log(err);
    }
  );

});


process.on('SIGINT' , ()=>{
  process.exit() ;
}) ;

process.on('exit' , ()=>{
  stdout.write('\ngood luck\n') ;
});

