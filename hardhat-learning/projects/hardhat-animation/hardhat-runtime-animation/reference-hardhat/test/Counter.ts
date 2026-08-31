import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.getOrCreate();

describe("Counter", function () {
  it("starts at zero and increments", async function () {
    const counter = await ethers.deployContract("Counter");
    expect(await counter.count()).to.equal(0n);
    await (await counter.increment()).wait();
    expect(await counter.count()).to.equal(1n);
  });

  it("sets an explicit count", async function () {
    const counter = await ethers.deployContract("Counter");
    await (await counter.setCount(7n)).wait();
    expect(await counter.count()).to.equal(7n);
  });
});
