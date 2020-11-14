const { ipcMain } = require('electron');
import pathToRows from './pathToRows';
import prepareData from './prepareData';
import groupWords from './groupWords';

ipcMain.on('process-subtitles', async (event, paths)=>{
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