const HdWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3');
const solfile=require('./compile');
const provider=new HdWalletProvider(
 'science joy history option symptom park anchor initial attract clump choose put',
 'https://rinkeby.infura.io/v3/93fc89064b144d7ebdfd28b97fca90a7'   
);
const web3=new Web3(provider);
web3.eth.getAccounts(function (error, result) {
    console.log(result);
});
/*
const res=async()=>{
    console.log('Contract Deployed on Rinkeby'+account);
    await new web3.eth.Contract(JSON.parse(solfile.interface))
    .deploy({
        data:solfile.bytecode,
        arguments:[],
    })
    .send({gas:1000000,from:account});
    console.log(res.options.address);
}*/