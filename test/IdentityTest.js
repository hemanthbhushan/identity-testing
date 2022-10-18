
// const { ethers } = require("hardhat");
// // const {utils} = require("ethers");
// const {mineBlocks} = require("../../launchpad-contracts/test/utilities/utilities");

// // const {
// //   time, // time
// //   constants,
// // } = require("@openzeppelin/test-helpers");
// // const ether = require("@openzeppelin/test-helpers/src/ether");

// const BN = require("ethers").BigNumber;

// describe("flow of the erc3643", () => {
//   beforeEach(async () => {

//     accounts = await ethers.getSigners();
//     managementKey = accounts[0];

//     // IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");

//     // TrustedIssuer = await ethers.getContractFactory("TrustedIssuersRegistry");
//     // ClaimTopics = await ethers.getContractFactory("ClaimTopicsRegistry");
//     // IdentityRegistryStorage = await ethers.getContractFactory(
//     //   "IdentityRegistryStorage"
//     // );

//     // trustedIssuer = await TrustedIssuer.deploy();
//     // await trustedIssuer.deployed();
//     // console.log("trusted Issuer", trustedIssuer.address);

//     // claimTopics = await ClaimTopics.deploy();
//     // await claimTopics.deployed();
//     // console.log("claim topics ", claimTopics.address);

//     // identityRegistryStorage = await IdentityRegistryStorage.deploy();
//     // await identityRegistryStorage.deployed();
//     // console.log("identityRegistry Storage ", identityRegistryStorage.address);

//     // identityRegistry = await IdentityRegistry.deploy(
//     //   trustedIssuer.address,
//     //   claimTopics.address,
//     //   identityRegistryStorage.address
//     // );
//     // await identityRegistry.deployed();
//     // console.log("identity Registry", identityRegistry.address);

//     ClaimIssuer = await ethers.getContractFactory("ClaimIssuer");
//     claimIssuer = await  ClaimIssuer.deploy(managementKey.address);
//     await claimIssuer.deployed();
//     console.log("claimIssuer", claimIssuer.address);

//     Identity = await ethers.getContractFactory("Identity");
//     identity = await Identity.deploy(managementKey.address, false);
//     await identity.deployed();
//     console.log("identity add", identity.address);

//     const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1"));
//     // const key = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('address', accounts[0]));


//     const data = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("message"));


//     // console.log(test, "test");
//     // const signature5 = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(accounts[5].address, 1, data));
   

//     console.log( "hash", hash);

//     // await claimIssuer.addClaim(1, 1, accounts[5].address, "0x34", data, '');

//     console.log("ADD CLAIM DONE");
//     console.log("account 1 ", accounts[1].address)
//    console.log("account 0",accounts[0].address);
  
//     const hashKey = ethers.utils.keccak256(accounts[1].address);
//     const hashKey2 = ethers.utils.keccak256(accounts[2].address);


//     let bytes32 = ethers.utils.keccak256("0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

//     await claimIssuer.connect(accounts[0]).addKey(bytes32, 1, 1);

   
//     console.log("add Key done");
//     console.log("key has purpose ", await claimIssuer.keyHasPurpose(hashKey,1));


//     console.log("bytes ", bytes32);

//     await claimIssuer.connect(accounts[1]).addKey(hashKey2, 2, 1);










  
//     // await claimIssuer.connect(accounts[0]).addClaim(1, 1, accounts[0].address, '0x24', '0x12', '');



//   });

//   describe(" ", () => {
//     it("", async () => {
//       console.log("inside it");
//     });
//   });
// });
const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { Signer } = require("ethers");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { AbiCoder } = require("ethers/lib/utils");
const { italic } = require("ansi-colors");
const { Identity } = require("fp-ts/lib/Identity");
const { parseExpectedArgs } = require("commander");
// describe("testing",()=>{
//   // let identityRegistry,identityRegistryStorage,tokenName,
//   let claimTopicsRegistry;
//   let identityRegistry;
//   let identityRegistryStorage;
//   let trustedIssuersRegistry;
//   let claimIssuerContract;
//   let compliance;
//   let token;
//   let _token;
//   let agentManager;
//   let defaultCompliance;
//   let tokenName;
//   let tokenSymbol;
//   let tokenDecimals;
//   let tokenOnchainID;
//   let proxy;
//   let implementation;
//   let signer1;
//   let signer2;
//   let owner;
//   let claimIssuer;
//   let signerKey;
//   let claimTopics=[1,7,3];


//   beforeEach(async ()=>{
//     [owner,signer1,signer2,tokenAgent] = await ethers.getSigners();

//     const TrustedIssuersRegistry = await ethers.getContractFactory("TrustedIssuersRegistry");
//     trustedIssuersRegistry = await TrustedIssuersRegistry.deploy();
//     await trustedIssuersRegistry.deployed();

//     const ClaimTopicsRegistry = await ethers.getContractFactory("claimTopicsRegistry");
//     claimTopicsRegistry = await ClaimTopicsRegistry.deploy();
//     await claimIssuerContract.deployed();


//     const IdentityRegistryStorage = await ethers.getContractFactory("IdentityRegistryStorage");
//     identityRegistryStorage = await IdentityRegistryStorage.deploy();
//     await identityRegistryStorage.deployed();

     
//     //above three deployed contracts are included in the identity contract

//     const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
//     identityRegistry = await IdentityRegistry.deploy(trustedIssuersRegistry.address,claimTopicsRegistry.address,identityRegistryStorage.address);
//     await identityRegistry.deployed();

//     const Compliance = await ethers.getContractFactory("DefaultCompliance");
//     compliance = await Compliance.deploy();
//     tokenName = 'TREXToken';
//     tokenSymbol = 'TREX';
//     tokenDecimals = '0';
    
//     const Token = await ethers.getContractFactory("Token");
//     _token = await Token.deploy(identityRegistry.address,);


//     const Implementation = await ethers.getContractFactory("ImplementationAuthority");
//     implementation = await Implementation.deploy(token.address);

//     const Proxy = await ethers.getContractFactory("TokenProxy");
//     proxy = await Proxy.deploy(identityRegistry.address,compliance.address,tokenName,tokenSymbol,tokenDecimals,_onChainId);


//     token = _token.attach(proxy.address);

//     await identityRegistryStorage.bindIdentityRegistry(identityRegistry.address);
//     await token.addAgentOnTokenContract(tokenAgent);

//     await claimTopicsRegistry.addClaimTopic(7);

//      signerKey = web3.utils.keccak256(web3.eth.abi.encodeParameter('address', signer.address));

//    //get the claimIssuer contract from the on chainId and the address claimIssure is the getting approved as the claimIssuer
//     const ClaimIssuerContract = await ethers.getContractFactory("ClaimIssuer");
    
//     claimIssuerContract =  await ClaimIssuerContract.connect(claimIssuer).deploy(claimIssuer);
//     await claimIssuerContract.addKey(signerKey.address,3,1);
//     await trustedIssuersRegistry.addTrustedIssuer(claimIssuerContract.address,claimTopics);
    
    
//for identity contract

describe("test for the identity contract",()=>{

  let identity,key,signer1,newkey,newkey1,signer2,claimIssue,identityIssuer,implementationAuthority,_identityProxy,proxy,claimIssuer,claimIssuerContract;

  beforeEach(async()=>{
    [owner,identityIssuer,claimIssue,signer1,signer2] =await ethers.getSigners();
    key = web3.utils.keccak256(web3.eth.abi.encodeParameter('address', identityIssuer.address));
    newkey = web3.utils.keccak256(web3.eth.abi.encodeParameter('address', signer1.address));
    newkey1 = web3.utils.keccak256(web3.eth.abi.encodeParameter('address', signer2.address));
   let hash =  web3.utils.keccak256(web3.eth.abi.encodeParameter('address', "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"));
   console.log("hashh",hash);
  const Identity = await ethers.getContractFactory("Identity");
  identity = await Identity.deploy(identityIssuer.address,false);


  const ClaimIssuer =  await ethers.getContractFactory("ClaimIssuer");

  claimIssuer = await ClaimIssuer.connect(claimIssue).deploy(claimIssue.address);



   
  })

  it("add key",async ()=>{
  // await  identity.connect(identityIssuer).addKey(newkey,1,1);

  // await identity.connect(signer1).addKey(newkey1,2,1);

  await  claimIssuer.connect(claimIssue).addKey(newkey,1,1);

  await claimIssuer.connect(signer1).addKey(newkey1,2,1);

})
 
it("by default the identity should have a management key when deployed",async()=>{
  const check = await identity.keyHasPurpose(key, 1);
  expect(check).to.be.equal(true);
})

it("purpose can be addto the new address(key) if the msg.sender the owner of the claim holder",async()=>{
  await identity.connect(identityIssuer).addKey(newkey,3,1);
  const check = await identity.keyHasPurpose(newkey, 3);
  expect(check).to.be.equal(true); 

})

it("when the msg.sender dosnt have the management key revert ",async ()=>{
  expect(identity.connect(signer1).addKey(newkey,1,1)).to.be.revertedWith(" Permissions: Sender does not have management key");
})
it("it should fail if the purpose is provided again",async()=>{
  expect(identity.connect(identityIssuer).addKey(key,1,1)).to.be.revertedWith("Conflict: Key already has purpose");

})

it("revert if key doesnt exist",async()=>{
  //the newkey is the hash of the signer1.addres where that address has no identity contract soo there will be no key
  expect(identity.connect(identityIssuer).removeKey(newkey,1)).to.be.revertedWith("NonExisting: Key isn't registered");
});

it("when the purpose of the claim holder is removed he cant add the key",async()=>{
   await identity.connect(identityIssuer).removeKey(key,1);
   expect(identity.connect(identityIssuer).addKey(key,2,1)).to.be.revertedWith("Permissions: Sender does not have management key");

})
it("remove key will return true if the given purpose exist for the key and the msg.sender should have management key with him",async()=>{
  await identity.connect(identityIssuer).removeKey(key,1);
  const check = await identity.keyHasPurpose(key, 1);
  expect(check).to.be.equal(false); 
})
//  it("reverts when the address called has no ma")
it("addClaim will revert when the msg.sender got no claim key ==3",async()=>{
  expect( identity.connect(signer1).addClaim(1,1,claimIssuer.address, '0x24', '0x12', '')).to.be.revertedWith("Permissions: Sender does not have claim signer key");
})
it("add claim to the claimIssuer",async()=>{
  
 await identity.connect(identityIssuer).addClaim(1,1,claimIssuer.address, '0x24', '0x12', '');
 const claimId = web3.utils.keccak256(web3.eth.abi.encodeParameters(['address', 'uint'],[ claimIssuer.address, 1]));
 getClaim = await identity.getClaim(claimId);
 
 expect(getClaim[2]).to.equal(claimIssuer.address);
})
it("isser should not exist if the claim is removed",async()=>{
  await identity.connect(identityIssuer).addClaim(1,1,claimIssuer.address, '0x24', '0x12', '');
 const claimId = web3.utils.keccak256(web3.eth.abi.encodeParameters(['address', 'uint'],[ claimIssuer.address, 1]));
 await identity.connect(identityIssuer).removeClaim(claimId);
 getClaim = await identity.getClaim(claimId);
 expect(getClaim[2]).to.equal('0x0000000000000000000000000000000000000000');

})


it(" remove the claimId where it is added initially",async()=>{

  const claimId = web3.utils.keccak256(web3.eth.abi.encodeParameters(['address', 'uint'],[ claimIssuer.address, 1]));
  expect(identity.connect(identityIssuer).removeClaim(claimId)).to.be.revertedWith('NonExisting: There is no claim with this ID');
})
it("gets reverted if the msg.sender doesnt have the msnagement key (dount))",async()=>{
  const claimId = web3.utils.keccak256(web3.eth.abi.encodeParameters(['address', 'uint'], [claimIssuer.address, 1]));
  expect(identity.connect(signer1).removeClaim(claimId)).to.be.revertedWith("Permissions: Sender does not have claim signer key");
})
})
