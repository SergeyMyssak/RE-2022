import express from 'express';
import fetch from 'node-fetch';

const app = express();

const RANDOM_USERS_API = "https://randomuser.me/api";

app.get("/random/users", async (req, res) => {
   const { results } = req.query;

    const response = await fetch(RANDOM_USERS_API + `?results=${results}&inc=name`);
    const data = await response.json();

    const names = data.results.map(({name}) => `${name.title}. ${name.first} ${name.last}`);

    res.send(names);
})

const REST_COUNTRIES_API = "https://restcountries.com/v3.1";

app.get("/countries", async (req, res) => {
    const { lang } = req.query;

    const response = await fetch(`${REST_COUNTRIES_API}/lang/${lang}`);
    const data = await response.json();

    const names = data.map(({ name }) => name.common);

    res.send(names);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})
