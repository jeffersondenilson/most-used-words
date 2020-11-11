const { ipcMain } = require('electron');
import pathToRows from './pathToRows';
import prepareData from './prepareData';

ipcMain.on('process-subtitles', async (event, paths)=>{
	const groupedWords = [
		{ name: 'unewq', amount: 1000000000},
		{ name: 'hellow', amount: 1200300 },
		{ name: 'you', amount: 100200 },
		{ name: 'he', amount: 1234 },
		{ name: 'hellw', amount: 900 },
		{ name: 'yu', amount: 800 },
		{ name: 'h', amount: 123 },
		{ name: 'i', amount: 12 },
		{ name: 'uboqw', amount: 9 },
		{ name: 'e', amount: 8 },
	];

	const rows = await pathToRows(paths);
	const words = await prepareData(rows);
	event.reply('process-subtitles', groupedWords);
});