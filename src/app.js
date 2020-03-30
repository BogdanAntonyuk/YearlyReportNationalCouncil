const xlsx = require('xlsx');
const getEpisode = require('./utils/getEpisode');

const path = 'files/Report2019.xlsx';

const sheetNameToRead = 'TestSheet';

//This code was used more like for testing and creating templates for tasks
// More specific implementation is in writeToExcel.js and findOccurrences.js

const readFile = async (path, sheetName) => {
	const wb = xlsx.readFile(path);

	const ws = wb.Sheets[sheetName];

	const data = xlsx.utils.sheet_to_json(ws);
	console.log(data);
	return data;
};

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

const createExcelFile = async (sheetNameToCreate, fileName) => {
	try {
		const dataForExcel = await getDataWithEpisodesNames(await readFile(path,sheetNameToRead), 'ProgramCode');
		const newWB = xlsx.utils.book_new();
		const newWS = xlsx.utils.json_to_sheet(dataForExcel);
		xlsx.utils.book_append_sheet(newWB, newWS, sheetNameToCreate);
		xlsx.writeFile(newWB, fileName + '.xlsx');
	} catch (e) {
		console.log(e);
	}
};

// createExcelFile('newTestSheet', 'TestFile');
