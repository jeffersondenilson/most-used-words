module.exports = rows => {
	return new Promise((resolve, reject) => {
		try{
			const words = rows
				.filter(filterValidRows)
				.map(removePunctuation)
				.map(removeTags)
				.reduce(mergeRows)// ?
				.split(' ')
				.map(word => word.toLowerCase())
				.map(word => word.replace('""', ''))
			resolve(words);
		}catch(err){
			reject(err);
		}
	});
}

function filterValidRows(row){
	// linhas que só contém número serão desconsideradas 
	// (e.g. número da linha em legendas .srt)
	const notNumber = isNaN(row.trim());
	// string vazia será convertida para falso
	const notEmpty = !!row.trim();
	// intervalo em legendas .srt
	const notInterval = !row.includes('-->');

	return notNumber && notEmpty && notInterval;
}

const removePunctuation = row => row.replace(/[,?!,-]/g, '');
// remove tags como <font> em legendas .srt
const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim();

const mergeRows = (fullText, row) => `${fullText} ${row}`;