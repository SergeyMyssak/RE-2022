import express from 'express';
import { PythonShell } from 'python-shell';

const app = express();

app.get("/diseases/top", (req, res) => {
    const { location, year, sex, asc } = req.query;

    const pyshell = new PythonShell("./pyshellScripts/diseases_top1.py");
    pyshell.send(JSON.stringify({ location, year, sex, asc }));

    let pyshellResponse;

    pyshell.on("message", (msg) => {
        pyshellResponse = msg;
    });

    pyshell.end((err) => {
        if (err) throw erssr;

        res.send(JSON.parse(pyshellResponse));
    })
});

app.get("/diseases/mortality-trends", (req, res) => {
    const { location } = req.query;

    const pyshell = new PythonShell("./pyshellScripts/diseases_top1.py");
    pyshell.send(JSON.stringify({ location }));

    let pyshellResponse;

    pyshell.on("message", (msg) => {
        pyshellResponse = msg;
    });

    pyshell.end((err) => {
        if (err) throw err;

        res.send(JSON.parse(pyshellResponse));
    })
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})