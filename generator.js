"use strict";

process.title = "Ethereum Stealer by Michal2SAB";

const genEth = require("ethers");
const fs = require("fs");

const riches = fs.readFileSync("./riches.txt");

let addresses = new Map();
riches
  .toString()
  .split("\n")
  .forEach((address) => addresses.set(address, true));

let i = 0;
function generate() {
  var phrase = genEth.Wallet.createRandom().mnemonic.phrase;
  var wallet = genEth.Wallet.fromMnemonic(phrase);
  // addresses.has(wallet.address);
  if (addresses.has(wallet.address)) {
    console.log("");
    process.stdout.write("\x07");
    console.log("\x1b[32m%s\x1b[0m", ">> Success: " + wallet.address);
    let successString =
      "Wallet: " +
      wallet.address +
      "\n\nPrivate Key: " +
      wallet.privateKey +
      "\n\n12 word phrase: " +
      phrase;
    fs.writeFileSync(`./result/Success${i++}.txt`, successString, (err) => {
      if (err) throw err;
    });
  }
}

while (true) {
  generate();
}
