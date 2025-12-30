#!/usr/bin/env node
// PRO X USMAN - Node.js Termux Tool
// Educational Purpose Only

const readline = require("readline");
const https = require("https");

// Colors
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const cyan = "\x1b[36m";
const magenta = "\x1b[35m";
const white = "\x1b[37m";
const reset = "\x1b[0m";

// Clear screen
console.clear();

// Banner
console.log(red + `
██████╗ ██████╗  ██████╗     ██╗  ██╗    ██╗   ██╗███████╗███╗   ███╗ █████╗ ███╗   ██╗
██╔══██╗██╔══██╗██╔═══██╗    ╚██╗██╔╝    ██║   ██║██╔════╝████╗ ████║██╔══██╗████╗  ██║
██████╔╝██████╔╝██║   ██║     ╚███╔╝     ██║   ██║███████╗██╔████╔██║███████║██╔██╗ ██║
██╔═══╝ ██╔══██╗██║   ██║     ██╔██╗     ██║   ██║╚════██║██║╚██╔╝██║██╔══██║██║╚██╗██║
██║     ██║  ██║╚██████╔╝    ██╔╝ ██╗    ╚██████╔╝███████║██║ ╚═╝ ██║██║  ██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝     ╚═╝  ╚═╝     ╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
` + reset);

// Readline setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(yellow + "[+] Enter Number or CNIC: " + cyan, (num) => {
  console.log(green + "\n[+] Fetching data...\n" + reset);

  const url = `https://professor-api-hub.xo.je/sim-data.php?num=${num}`;

  https.get(url, (res) => {
    let data = "";

    res.on("data", chunk => data += chunk);
    res.on("end", () => {
      try {
        const json = JSON.parse(data);

        console.log(magenta + "========= RESULT =========\n" + reset);

        if (typeof json === "object") {
          for (const key in json) {
            console.log(white + key + " : " + green + json[key] + reset);
          }
        } else {
          console.log(json);
        }

        console.log(magenta + "\n==========================" + reset);
      } catch (e) {
        console.log(red + "[-] Invalid response from API" + reset);
      }
      rl.close();
    });

  }).on("error", () => {
    console.log(red + "[-] API request failed" + reset);
    rl.close();
  });
});
