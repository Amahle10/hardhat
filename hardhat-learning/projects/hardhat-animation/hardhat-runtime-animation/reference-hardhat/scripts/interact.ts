import { network } from "hardhat";

const address = process.env.COUNTER_ADDRESS;

if (address === undefined) {
  throw new Error("Set COUNTER_ADDRESS to the deployed Counter contract address");
}

const { ethers } = await network.getOrCreate();
const counter = await ethers.getContractAt("Counter", address);

const transaction = await counter.increment();
await transaction.wait();

console.log("Counter count:", await counter.count());
