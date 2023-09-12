import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import Ethers from '../utils/ethers';
import React from 'react';
import { NoirBrowser } from '../utils/noir/noirBrowser';

import { ThreeDots } from 'react-loader-spinner';
import { Fr } from '@aztec/bb.js/dest/browser/types/fields';
import { ecrecover, fromRpcSig, toType } from "@ethereumjs/util"
import { MerkleTree } from '../utils/merkleTree';
import merkle from '../test/merkle.json'; // merkle


function Component() {
  const [input, setInput] = useState({ x: 0, y: 0});
  const [pending, setPending] = useState(false);
  const [proof, setProof] = useState(Uint8Array.from([]));
  const [verification, setVerification] = useState(false);
  const [noir, setNoir] = useState(new NoirBrowser());
  const [ethers, setEthers] = useState<Ethers | null>(null);

  const [signature, setSignature] = useState({signature: "", account: ""});
  const [accounts, setAccounts] = useState([]);


  // Handles input state
  const handleChange = e => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const connectAccounts = async () => {
    ethers!!.requestPermissions();
  }

  const signData = async (acc: string) => {
    console.log(acc)
    let messageToHash = '0xabfd76608112cc843dca3a31931f3974da5f9f5d32833e7817bc7e5c50c7821e';
    const newSigner = await ethers!!.changeSigner(acc)
    const signature = await newSigner.signMessage(messageToHash);
    
    setSignature({signature, account: acc});
  }

  // Calculates proof
  const claim = async (acc: string) => {
    await ethers!!.changeSigner(acc)

    console.log(ethers?.signer._address)

    setPending(true);

    const merkleTree = new MerkleTree(4);

    await merkleTree.initialize([]);

    await Promise.all(
      merkle.map(async (addr: any) => {
        // @ts-ignore
        const leaf = Fr.fromString(addr);
        merkleTree.insert(leaf);
      }),
    );

    let messageToHash = '0xabfd76608112cc843dca3a31931f3974da5f9f5d32833e7817bc7e5c50c7821e';
    const hashedMessage = ethers!!.utils.hashMessage(messageToHash);
    const sig = fromRpcSig(signature.signature);
    const hashedMessageUint8 = ethers!!.utils.arrayify(hashedMessage);
    const pubKey = ecrecover(hashedMessageUint8, sig.v, sig.r, sig.s);

    const user = ethers!!.signer;
    const leaf = Fr.fromString(signature.account);
    const index = merkleTree.getIndex(leaf);
    const mt = merkleTree.proof(index);

    var blake2 = require('blakejs');

    const nullifier = blake2.blake2s(ethers!!.utils.arrayify(signature.signature).slice(0, 64))

    console.log(      ...ethers!!.utils.arrayify(hashedMessage))
    console.log(...pubKey)
    console.log(...nullifier)
    const arr = [
      ...pubKey, 
      ...ethers!!.utils.arrayify(signature.signature).slice(0, 64), 
      ...ethers!!.utils.arrayify(hashedMessage), 
      ...nullifier, 
      ...mt.pathElements.map(el => el.toBuffer()),
      "0x" + index.toString(),
      mt.root.toString(),
      ethers?.signer._address,
      ethers?.signer._address
    ]

    const userAbi = new Map<number, string>();

    for (let i = 0; i < arr.length; i++) {
      // @ts-ignore
      userAbi.set(i + 1, ethers.utils.hexZeroPad(arr[i], 32))
    }
    
    try {
      const witness = await noir.generateWitness(userAbi);
      console.log(witness)
      const proof = await noir.generateProof(witness);
      setProof(proof);
      console.log("proof", proof)

    } catch (err) {
      console.log(err);
      toast.error('Error generating proof');
    }

    setPending(false);
  };

  const verifyProof = async () => {
    // only launch if we do have an acir and a proof to verify
    try {
      console.log("verify")
      const verification = await noir.verifyProof(proof);
      console.log(verification)
      setVerification(verification);
      toast.success('Proof verified!');

      const publicInputs = proof.slice(0, 32);
      const slicedProof = proof.slice(32);

      const ver = await ethers!!.contract.verify(slicedProof, [publicInputs]);
      if (ver) {
        toast.success('Proof verified on-chain!');
        setVerification(true);
      } else {
        toast.error('Proof failed on-chain verification');
        setVerification(false);
      }
    } catch (err) {
      console.log(err)
      toast.error('Error verifying your proof');
    } finally {
      noir.destroy();
    }
  };

  // Verifier the proof if there's one in state
  useEffect(() => {
    console.log(proof)
    if (proof.length > 0) {
      console.log("verify")
      verifyProof();
    }
  }, [proof]);

  const initNoir = async () => {
    setPending(true);

    await noir.init();
    console.log("init")
    setNoir(noir);

    setPending(false);
  };

  const initEthers = async () => {
    const ethers = new Ethers();
    setEthers(ethers);

    const accounts = await ethers.getAccounts();
    setAccounts(accounts);
  }

  useEffect(() => {
    initNoir();
    initEthers();
  }, [proof]);

  return (
    <div className="gameContainer">
      <h1>Stealthdrop</h1>
      <ol>
        <li>Connect both the accounts you want to use</li>
        <li>Sign with your elligible account</li>
        <li>Switch to the receiver wallet</li>
        <li>Generate proof</li>
        <li>Send the transaction</li>
      </ol>
      <button onClick={connectAccounts}>Connect accounts</button>
      <br/>
      {accounts && accounts.map(acc => <><button onClick={() => signData(acc)}>Sign with connected account: {acc}</button><br/></>)}
      <br/>
      {signature.signature && <p>Saved signature: {signature.signature} for account {signature.account}</p>}

      {signature && accounts && accounts.map(acc => <><button onClick={() => claim(acc)}>Claim with connected account: {acc}</button><br/></>)}
      {pending && <ThreeDots wrapperClass="spinner" color="#000000" height={100} width={100} />}
    </div>
  );
}

export default Component;
