import { PythonShell } from 'python-shell';

const pyshell = new PythonShell("../pyshellScripts/test.py");

pyshell.send("Hello");
pyshell.send("Hello world!");

pyshell.on("message", (msg) => {
    console.log("message", msg);
});

pyshell.end(() => {
    console.log("finished");
})