const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('node:os');

let isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;

  const args = [path.join(__dirname, file), ...process.argv.slice(2)];
  const p = spawn(process.argv[0], args, {stdio: ["inherit", "inherit", "inherit", "ipc"],});

  p.on("message", (data) => {
    console.log(`🟢 RECEIVED ${data}`);
    switch (data) {
      case "reset":
        p.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case "uptime":
        p.send(process.uptime());
        break;
    }
  });

  p.on("exit", (code) => {
    isRunning = false;
    console.error(`Exited with code: ${code}`);
    start('main.js');

    if (code === 0) return;

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
	    console.error(`File ${args[0]} has been modified. Script will restart...`);
      start("main.js");
    });
  });

  p.on("error", (err) => {
    console.error('Error: ${err}');
    p.kill();
    isRunning = false;
    console.error('Error occurred. Script will restart...');
    start("main.js");
  });

  const pluginsFolder = path.join(__dirname, "plugins");

  fs.readdir(pluginsFolder, (err, files) => {
    if (err) {
      console.error('Error reading plugins folder: ${err}');
      return;
    }
    console.log(`🟡 Found ${files.length} plugins in folder ${pluginsFolder}`);
  });

  setInterval(() => {}, 1000);
}

start("main.js");

const tmpDir = './tmp';
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
  console.log(`📁 Created directory ${tmpDir}`);
}

process.on('unhandledRejection', (reason) => {
  console.error(`Unhandled promise rejection: ${reason}. Script will restart...`);
  start('main.js');
});

process.on('exit', (code) => {
  console.error(`Exited with code: ${code}. Script will restart...`);
  start('main.js');
});
