require('dotenv').config();
const fetch = require('node-fetch');

const token = process.env.TOKEN;

const getEpisode = async code => {
	const url = 'http://db2.yourhope.tv/api/episodes/' + code + '?token=' + token;
	try {
		const res = await fetch(url);
		const json = await res.json();
		return json.title;
	} catch (e) {
		console, log(e);
	}

	// fetch(url)
	// 	.then(res => res.json())
	// 	.then(json => callback(json.title))
	// 	.catch(e => console.log(e));
};

async function main() {
	console.log(await getEpisode('ADUU00120'));
}

main();

module.exports = getEpisode;
