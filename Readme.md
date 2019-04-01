Turtlecoin Contribution Reward Dapp (Sweetbread)

This repository contains the components to deploy a proof of concept

Instructions:
1. Install all required dependencies (NodeJS, Chainlink node , Turtlecoin RPC wallet)
2. Install adapter.js and TRTL-JSON-PRC.js to AWS Lambda 
3. Connect Adapters to Chainlink node via bridge URL in node operator GUI
4. Create Job Specs in node operator GUI using github_jobspec.json and turtle_tx.json
5. Deploy oracle.sol to Eth blockchain
6. Distribute bonuty.sol (with Oracle address in constructor and Job_IDs in requests) to repo contributors



