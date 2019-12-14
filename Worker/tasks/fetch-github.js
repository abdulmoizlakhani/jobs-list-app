const fetch = require('node-fetch');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);


const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {

    let resultCount = 1, onPage = 0;
    const allJobs = [];

    while (resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('got', resultCount, 'jobs')
        onPage++;
    }

    console.log('got', allJobs.length, 'jobs list')

    // filter algo
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        // algo logic
        const filterCondition = (jobTitle.includes('senior') || jobTitle.includes('manager') || jobTitle.includes('sr.') || jobTitle.includes('architect'));
        return !filterCondition;
    });

    console.log('Filtered Jr. Jobs', jrJobs.length)

    // Set in Redis
    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({ success })
}

module.exports = fetchGithub;