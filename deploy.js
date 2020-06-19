const solfile=require('./compile');
const Web3=require('web3');
const HDWallet=require('truffle-hdwallet-provider');
const rinkurl='https://rinkeby.infura.io/v3/93fc89064b144d7ebdfd28b97fca90a7';
const nemonic='science joy history option symptom park anchor initial attract clump choose put';
const provider=new HDWallet(nemonic,rinkurl);
const web3=new Web3(provider);
const account='0x57335538C8D4354c9de1B153674C6601ECE52Cfa';
web3.eth.getAccounts(async function (error, result) {
    console.log(result[0]);
    console.log('Contract Deployed on Rinkeby'+account);
  const txn=  await new web3.eth.Contract(JSON.parse(solfile.interface))
    .deploy({
        data:solfile.bytecode,
        arguments:[],
    })
    .send({gas:1000000,from:account});
    console.log('This is The Address Of Contract:'+txn.options.address);
    var msgdata=await txn.methods.showData().call();
    console.log('Default Data....'+msgdata);

    const thash=await txn.methods.setData('New Data').send({gas:1000000,from:account});
      msgdata=await txn.methods.showData().call();
      console.log('Updated Data....'+msgdata);
});



