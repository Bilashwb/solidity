let fs=require('fs');
let path=require('path');
let solc=require('solc');


const fpath=path.resolve(__dirname,'contract','test.sol');


const sfile=fs.readFileSync(fpath,'utf8');
var comfile=solc.compile(sfile,1).contracts[':Test'];
//const interface=comfile.interface;
//const byteCode=comfile.bytecode;
//console.log(interface);
module.exports=comfile;

