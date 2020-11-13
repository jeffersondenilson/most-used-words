const { ipcMain } = require('electron');
import pathToRows from './pathToRows';
import prepareData from './prepareData';
import groupWords from './groupWords';

ipcMain.on('process-subtitles', async (event, paths)=>{
	/*const groupedWords = [
		{ name: 'unewq', amount: 1000000000, position: 0},
		{ name: 'hellow', amount: 1200300, position: 1},
		{ name: 'you', amount: 100200, position: 2},
		{ name: 'he', amount: 1234, position: 3},
		{ name: 'hellw', amount: 900, position: 4},
		{ name: 'yu', amount: 800, position: 5},
		{ name: 'h', amount: 123, position: 6},
		{ name: 'i', amount: 12, position: 7},
		{ name: 'uboqw', amount: 9, position: 8},
		{ name: 'e', amount: 8, position: 9},
	];*/
	try{
		const rows = await pathToRows(paths);
		const words = await prepareData(rows);
		const groupedWords = await groupWords(words);
		
		event.reply('process-subtitles', groupedWords);
	}catch(err){
		console.log(err);
		event.reply('process-subtitles', {error: 'Error processing subtitles.'});
	}
});