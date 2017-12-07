#!/usr/bin/env node 
require("child_process")
  .spawn(
    __dirname + "/dep",
    process.argv.slice(2),
    { argv0: "dep", stdio : "inherit" })
  .on("close", function (code) { process.exit(code); });