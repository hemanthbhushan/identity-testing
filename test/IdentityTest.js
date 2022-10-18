const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { Signer } = require("ethers");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
const { AbiCoder } = require("ethers/lib/utils");
const { italic } = require("ansi-colors");
const { Identity } = require("fp-ts/lib/Identity");
const { parseExpectedArgs } = require("commander");
    
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
