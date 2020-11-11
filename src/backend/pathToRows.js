const { readFileSync } = require('fs');

module.exports = paths => {
	return new Promise((resolve, reject) => {
		try{
			const rows = paths
				.map(path => readFileSync(path, 'utf-8'))
				.reduce((fullText, fileText) => `${fullText}\n${fileText}`)
				.split('\n');
			resolve(rows);
		}catch(err){
			reject(err);
		}
	});
}