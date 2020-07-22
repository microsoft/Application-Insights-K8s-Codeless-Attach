const { start } = require('repl');

const linuxPath = "/agentfiles/telemetry/logsuploader/logsuploader";
const windowsPath = "D:\\src\\Application-Insights-K8s-Codeless-Attach\\agents\\logsuploader\\logsuploader.exe";
let path = process.platform === "linux" ? linuxPath : windowsPath;

console.log("Logs uploader starting");

async function starter() {
    await new Promise((resolve, reject) => {
        child = require('child_process').execFile(path, [], {
            // detachment and ignored stdin are the key here: 
            detached: true,
            stdio: ['ignore', 1, 2]
        }, err => {
            console.log(`failed to start process ${path}, \n ${err}`);
            resolve();
        });

        // and unref() disentangles the child's event loop from the parent's: 
        child.unref();

        child.stdout.on('data', function (data) {
            let entry = data.toString();
            console.log(entry);
            if (entry.indexOf("Done starting") > -1) {
                resolve();
            }
        });
    })
}

starter();

console.log("Initialized logs uploader");


