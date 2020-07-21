const assert=require('assert');
const Web3=require('web3');
const ganurl='http://127.0.0.1:7545';
const web3=new Web3(ganurl);
const json=require('jsonify');
const solfile=require('../compile');
//const abi='[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_newData","type":"string"}],"name":"setData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"showData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';
//const bytecode='60806040523480156100115760006000fd5b505b6040518060400160405280601881526020017f546869732069732061207374617465205661726961626c6500000000000000008152602001506000600050908051906020019061006492919061006b565b505b61011b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ac57805160ff19168380011785556100df565b828001600101855582156100df579182015b828111156100de57825182600050909055916020019190600101906100be565b5b5090506100ec91906100f0565b5090565b61011891906100fa565b8082111561011457600081815060009055506001016100fa565b5090565b90565b6103368061012a6000396000f3fe60806040523480156100115760006000fd5b506004361061003b5760003560e01c806347064d6a14610041578063bca02ea8146101045761003b565b60006000fd5b610102600480360360208110156100585760006000fd5b81019080803590602001906401000000008111156100765760006000fd5b8201836020820111156100895760006000fd5b803590602001918460018302840111640100000000831117156100ac5760006000fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050909091929090919290505050610188565b005b61010c6101a6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561014d5780820151818401525b602081019050610131565b50505050905090810190601f16801561017a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b80600060005090805190602001906101a1929190610250565b505b50565b606060006000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102415780601f1061021657610100808354040283529160200191610241565b820191906000526020600020905b81548152906001019060200180831161022457829003601f168201915b5050505050905061024d565b90565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061029157805160ff19168380011785556102c4565b828001600101855582156102c4579182015b828111156102c357825182600050909055916020019190600101906102a3565b5b5090506102d191906102d5565b5090565b6102fd91906102df565b808211156102f957600081815060009055506001016102df565b5090565b9056fea26469706673582212202e81e9a5f84618d134ef886aabb68847b5c063e819e1fcb5f9fdd39339f6886a64736f6c63430006060033';
//const ABI=json.stringify(abi);
//Testing Example

//Test Program
/*
class Car{
    carColor(){
        return('Red');
    }
    carPrice(){
        return 55;
    }
}

let c;
beforeEach(()=>{
    c=new Car();
});
describe('Test The Class Car...',()=>{
    it('CarColor Test...',()=>{
        assert.equal(c.carColor(),'Red');
    });
    it('Its test for car Price....',()=>{
        assert.equal(c.carPrice(),55);
    });
});
*/
let acnts;
let test;
var cData;
beforeEach(async()=>{
  /*  web3.eth.getAccounts().then(acnt=>{
        console.log(acnt);
    });*/
   acnts=await web3.eth.getAccounts();
   test=await new web3.eth.Contract(JSON.parse(solfile.interface))
   .deploy({data:solfile.bytecode,arguments:[]})
   .send({from:acnts[0],gas:'1000000'});

 });

describe('This is Solidity Program Testing....',()=>{
    it('Deploy Our Contract.......',()=>{
     assert.ok(test.options.address);//ok is used to check variable not undefinde or null
    });
//call Contract Function No Transaction Cost....
it('This is default Value Cheking...',async ()=>{
    cData=await test.methods.showData().call();
    assert.equal('Deafult Msg',cData);
});

it('Data is Update....',async ()=>{
const thash=await test.methods.setData('New Data').send({from:acnts[0]});
assert.ok(thash);
cData=await test.methods.showData().call();
    assert.equal('New Data',cData);

});


});

