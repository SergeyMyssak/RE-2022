import { PythonShell } from 'python-shell';

PythonShell.runString("x=2+2;print(x)", null, (err, output) => {
    if (err) throw err;
    console.log("output", output);
})