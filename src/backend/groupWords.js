module.exports = words => {
	return new Promise((resolve, reject)=>{
		try{
			// conta palavras diferentes e junta em um objeto
			const groupedWords = words.reduce((obj, word) => {
				if(obj[word]){
					// se já existe, adiciona a contagem
					obj[word] = obj[word] + 1;
				}else{
					// insere no objeto e começa a contagem
					obj[word] = 1;
				}

				return obj;
			}, {});
			// cria um array de objetos com base nas palavras diferentes
			const groupedWordsArray = Object.keys(groupedWords)
				.map(key => {
					return {name: key, amount: groupedWords[key]}
				})
				.sort((w1, w2) => w2.amount - w1.amount);

			resolve(groupedWordsArray);
		}catch(err){
			reject(err);
		}
	});
}