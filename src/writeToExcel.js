const xlsx = require('xlsx');
const getEpisodes = require('./getAllEpisodes');


const path = 'files/Report2019.xlsx';



const readFile = async (path, sheetName) => {
	const wb = xlsx.readFile(path);

	const ws = wb.Sheets[sheetName];

	const data = xlsx.utils.sheet_to_json(ws);
	console.log(data);
	return data;
};

const formDataForExcel = async (code) =>{
    const data = await getEpisodes(code);
    const newData=[];
    for(i=0;i<data.length;i++){
        newData.push({code: data[i].code, title:data[i].title})
    }
    return newData;
}

const getDataWithEpisodesNames = async (data, columnName) => {
	const newData = [];
	try {
		for (i = 0; i < data.length; i++) {
			const title = await getEpisode(data[i][columnName]);
			data[i].EpisodeName = title;
			newData.push(data[i]);
		}
		console.log(newData)
		return newData;
	} catch (e) {
		console.log(e);
	}
};

const createExcelFile = async (searchCodeAndSheetNameToCreate, fileName) => {
	try {
		const dataForExcel = await formDataForExcel(searchCodeAndSheetNameToCreate)
		const newWB = xlsx.utils.book_new();
		const newWS = xlsx.utils.json_to_sheet(dataForExcel);
		xlsx.utils.book_append_sheet(newWB, newWS, searchCodeAndSheetNameToCreate);
		xlsx.writeFile(newWB, 'files/'+fileName + '.xlsx');
	} catch (e) {
		console.log(e);
	}
};

createExcelFile('CLMU', 'MusicVideos');
