const fsp = require('fs').promises;
xml2js = require('xml2js');
const xlsx = require('xlsx');

const root = 'files/PlayedFiles202003/';
const fileName = 'ShortVideos';
const path = 'files/' + fileName + '.xlsx';
sheetNameToCreate = path => {
	const wb1 = xlsx.readFile(path);
	return wb1.SheetNames[0];
};

function parsedXML(xml) {
	const parser = new xml2js.Parser({ explicitArray: false });

	return new Promise((resolve, reject) => {
		parser.parseString(xml, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

const occurrences = async program => {
	let initialArray = [];
	try {
		const allFiles = await fsp.readdir(root);
		for (i = 0; i < allFiles.length; i++) {
			let file = allFiles[i];
			let XMLFile = await fsp.readFile(root + file, 'utf8');
			let result = await parsedXML(XMLFile);

			for (j = 0; j < result.Element.Play.length; j++) {
				let element = result.Element.Play[j];

				if (element.FileName.includes(program) && !element.FileName.includes('F:\\Media\\F\\MLInclude\\Anons')) {
					initialArray.push(element.TimeCode);
				}
			}
		}
	} catch (e) {
		console.log(e);
	}
	// console.log(initialArray.length);
	return initialArray.length;
};

const readFile = async path => {
	const wb = xlsx.readFile(path);
	const sheetName = wb.SheetNames[0];
	const ws = wb.Sheets[sheetName];
	const data = xlsx.utils.sheet_to_json(ws);
	return data;
};

const getDataWithOccurrences = async data => {
	const newData = [];
	try {
		for (l = 0; l < data.length; l++) {
			let calculatedOccurrences = await occurrences(data[l]['code']);
			console.log(data[l]['code'] + ' ----- ' + calculatedOccurrences);
			data[l].Occurrences = calculatedOccurrences;
			newData.push(data[l]);
		}
		return newData;
	} catch (e) {
		console.log(e);
	}
};

const createExcelFile = async (sheetNameToCreate, fileName) => {
	try {
		const dataForExcel = await getDataWithOccurrences(await readFile(path));
		const newWB = xlsx.utils.book_new();
		const newWS = xlsx.utils.json_to_sheet(dataForExcel);
		xlsx.utils.book_append_sheet(newWB, newWS, sheetNameToCreate);
		xlsx.writeFile(newWB, 'files/completed/' + fileName + '.xlsx');
	} catch (e) {
		console.log(e);
	}
};

createExcelFile(sheetNameToCreate(path), fileName);

// const allFoldersForFullVideo = new RegExp(/(F:\\Media\\F\\MLInclude\\manua(l)*ly added files\\|F:\\Media\\F\\MLInclude\\Ingested Files\\|F:\\Media\\F\\Archive_16_9\\[A-Z]{4}\\)[A-Z]{4}\d+\.(mp4|mov|avi)/,'g');

// function filterOutAnonsFolder(fileName){
//     let result = fileName.match(allFoldersForFullVideo);
//     if (result){
//         return result[0];

//     }
// }
