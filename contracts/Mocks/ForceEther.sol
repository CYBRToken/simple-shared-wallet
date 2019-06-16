// @title Force Ether into a contract.
// @notice  even
// if the contract is not payable.
// @notice To use, construct the contract with the target as argument.
// @author Remco Bloemen <[email protected]>
pragma solidity >=0.4.21 <0.6.0;


contract ForceEther {
  //solhint-disable-next-line
  constructor() public payable { }

  function destroyAndSend(address payable _recipient) public {
    selfdestruct(_recipient);
  }
}