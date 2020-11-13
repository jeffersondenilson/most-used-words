module.exports = words => {
	return new Promise((resolve, reject)=>{
		try{
			// conta palavras diferentes e junta em um objeto
			// ['word1', 'word1', 'word2', ...] -> {word1: 2, word2: 1, ...}
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
				.sort((key1, key2) => groupedWords[key2] - groupedWords[key1])
				.map((key, index) => {
					return {name: key, amount: groupedWords[key], position: index}
				});

			resolve(groupedWordsArray);
		}catch(err){
			reject(err);
		}
	});
}