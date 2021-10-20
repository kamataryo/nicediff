#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");
const { niceDiff } = require("./");

const main = async () => {
  const [, , img1, img2] = process.argv;
  const [imgBuf1, imgBuf2] = await Promise.all([
    fs.readFile(path.resolve(process.cwd(), img1)),
    fs.readFile(path.resolve(process.cwd(), img2)),
  ]);
  const diffBuf = await niceDiff(imgBuf1, imgBuf2);
  process.stdout.write(diffBuf);
};

main();
