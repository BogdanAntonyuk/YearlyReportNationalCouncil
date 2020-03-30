require('dotenv').config();
const fetch = require('node-fetch');

const token = process.env.TOKEN;

let getEpisodes = async code => {
	let url = 'http://db2.yourhope.tv/api/episodes?type=show&code=' + code + '&token=' + token;

	const res = await fetch(url);
	const json = await res.json();
	return json;
};

module.exports = getEpisodes;

// let iteration = function(code){
//     for(i=1;i<40;i++){

//         for(j=13;j<21;j++){
//             if(i<10){

//                 console.log(code+'00'+i+j)
//             }else if(i<100&&i>10){

//                 console.log(code+'0'+i+j)
//             }else{

//                 console.log(code+i+j)
//             }
//         }
//     }
// }
