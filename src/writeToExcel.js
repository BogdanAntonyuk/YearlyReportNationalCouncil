const xlsx = require('xlsx');
const getEpisodes = require('./utils/getAllEpisodes');

const path = 'files/Report2019.xlsx';

const formDataForExcel = async code => {
	const data = await getEpisodes(code);
	const newData = [];
	for (i = 0; i < data.length; i++) {
		newData.push({ code: data[i].code, title: data[i].title });
	}
	return newData;
};

const createExcelFile = async (searchCodeAndSheetNameToCreate, fileName) => {
	try {
		const dataForExcel = await formDataForExcel(searchCodeAndSheetNameToCreate);
		const newWB = xlsx.utils.book_new();
		const newWS = xlsx.utils.json_to_sheet(dataForExcel);
		xlsx.utils.book_append_sheet(newWB, newWS, searchCodeAndSheetNameToCreate);
		xlsx.writeFile(newWB, 'files/' + fileName + '.xlsx');
	} catch (e) {
		console.log(e);
	}
};

createExcelFile('LOUU', 'Postcards(children)');
