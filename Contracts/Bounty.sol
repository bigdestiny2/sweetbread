pragma solidity 0.4.24;

import "chainlink/solidity/contracts/Chainlinked.sol";

// MyContract inherits the Chainlinked contract to gain the
// functionality of creating Chainlink requests
contract ChainlinkExample is Chainlinked {
  // Helper constant for testnets: 1 request = 1 LINK
  uint256 constant private ORACLE_PAYMENT = 1 * LINK;
  // Helper constant for the Chainlink uint256 multiplier JobID
  bytes32 constant UINT256_MUL_JOB = bytes32("493610cff14346f786f88ed791ab7704");

  // Stores the answer from the Chainlink oracle
  uint256 public weeklyCommits;
  address public owner;

  constructor() public {
    // Set the address for the LINK token for the network
    setLinkToken(0x20fE562d797A42Dcb3399062AE9546cd06f63280);
    // Set the address of the oracle to create requests to
    setOracle(0xc99B3D447826532722E41bc36e644ba3479E4365);
    owner = msg.sender;
  }

  // Creates a Chainlink request
  function requestWeeklyGithubCommits() 
    public
    onlyOwner
  {
    // newRequest takes a JobID, a callback address, and callback function as input
    Chainlink.Request memory req = newRequest(JOB_ID, this, this.fulfill.selector);
    // Adds a URL with the key "get" to the request parameters
    req.add("get", "https://api.github.com/repos/bigdestiny2/linked-dapp/stats/contributors");
    // Uses input param (dot-delimited string) as the "path" in the request parameters
    req.add("path", "author.weeks.c");
    // Sends the request with 1 LINK to the oracle contract
    chainlinkRequest(req, ORACLE_PAYMENT);
  }

  // fulfill receives a uint256 data type
  function fulfill(bytes32 _requestId, uint256 _commits)
    public
    // Use recordChainlinkFulfillment to ensure only the requesting oracle can fulfill
    recordChainlinkFulfillment(_requestId)
  {
    weeklyCommits = _commits;
  }

// Creates a request to send Tx from external wallet via RPC can only be called on by the oracle contract
  function setTurtleTx(string _account)
  public
  onlyOracle
{
  Chainlink.Request memory req = newRequest(JOB_ID, this, this.fulfillRPCCall.selector);
  req.add("method", "trtl_TX");
  string[] memory params = new string[](2);
  path[0] = "_account";
  path[1] = "_amount";
  req.addStringArray("params", params);
  chainlinkRequest(req, ORACLE_PAYMENT);
}
  
  // withdrawLink allows the owner to withdraw any extra LINK on the contract
  function withdrawLink()
    public
    onlyOwner
  {
    LinkTokenInterface link = LinkTokenInterface(chainlinkToken());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }
  
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
}  