pragma solidity ^0.4.17;

contract Test{

    string data;
    function Test()public{
        data="Deafult Msg";
    }
    function setData(string memory _newData)public{
        data=_newData;
    }
    function showData()public view returns(string memory){
        return  data;
    }


}