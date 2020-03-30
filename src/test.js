const fetch = require('node-fetch')
let url = 'http://db2.yourhope.tv/api/episodes/ILCU01114?token=F[dcaEmr8TQkXFK9NshwBwoq';

fetch('http://db2.yourhope.tv/api/episodes/ILCU01114?token=F[dcaEmr8TQkXFK9NshwBwoq')
    .then(res => res.json())
    .then(json => console.log(json.title));
