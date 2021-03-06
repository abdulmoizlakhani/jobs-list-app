const express = require('express')
const redis = require('redis');
const { promisify } = require('util');

const app = express()
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const port = 3001

app.get('/jobs', async (req, res) => {
    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(jobs)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))