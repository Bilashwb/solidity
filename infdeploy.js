var infurl='https://rinkeby.infura.io/v3/93fc89064b144d7ebdfd28b97fca90a7';
var infsub='wss://rinkeby.infura.io/ws/v3/93fc89064b144d7ebdfd28b97fca90a7';
var Web3=require('web3');
const solfile=require('./compile');
//var sweb3=new Web3(infsub);
var web3=new Web3(infurl);

/*var mywallet=web3.eth.accounts.wallet.create(1,'This is a Random String');
let acnt=web3.eth.accounts.create();
mywallet.add(acnt.privateKey);
//console.log(acnt);
console.log(mywallet);*/


/*let add='0x57335538C8D4354c9de1B153674C6601ECE52Cfa';
web3.eth.getBalance(add,function(error, result) {
   if(!error)
   console.log(web3.utils.fromWei(result,'ether')); 
   else
   console.log(error);
});

*/


//Block Inspection.......
var blockNo=6313432;/*
web3.eth.getBlockNumber(function (error, result) {
    console.log(result);
});*/
/*
web3.eth.getBlock(latestBlockNo,function(error, result) {
    console.log(result.transactions[0]);
});


web3.eth.getBlock('pending', function(error, result) {
console.log(result);    
});


web3.eth.getTransactionFromBlock(blockNo,2,function(error, result) {
    console.log(result.hash);
});



//sweb3.eth.subscribe('newBlockHeaders',function(err,res){
    //console.log(res);
//});

sweb3.eth.subscribe('pendingTransactions',function(err,txhs){
    sweb3.eth.getTransaction(txhs, function(error, result) {
        console.log(result.gas);
    });
});
*/
//console.log(solfile.interface);

//Send Ether......
const EthereumTx=require('ethereumjs-tx').Transaction;
const privateKey = Buffer.from(
    '633BC6EF07E8334213B032CCFAA11FD9CB04C823B8A137196D8D665C391B5CE0',
    'hex',
  )
  
const sendAcn='0x57335538C8D4354c9de1B153674C6601ECE52Cfa';
const recvAcn='0xbc742f7bd7d16B8f667326C70299159396f191C1';

web3.eth.getBalance(sendAcn, function(error, result) {
    console.log("Sender Balance: "+ web3.utils.fromWei(result,'ether'));
});

web3.eth.getBalance(recvAcn, function(error, result) {
    console.log("Reciver Balance: "+ web3.utils.fromWei(result,'ether'));
});

const txParams = {
    from:sendAcn,
    chainId: web3.utils.toHex(4),
    nonce: web3.utils.toHex(15),
    gasPrice: web3.utils.toHex(web3.utils.toWei('1000000000','gwei')),
    gasLimit: web3.utils.toHex(1000000),
    to: recvAcn,
    value: web3.utils.toHex(web3.utils.toWei('0.3','ether')),
    //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
  }
const tx=new EthereumTx(txParams,{'chain':'rinkeby'})
tx.sign(privateKey)

const sz=tx.serialize();
const raw='0x'+sz.toString('hex');


web3.eth.sendSignedTransaction(raw,function(err,res){
console.log(res);
console.log(err);

});


