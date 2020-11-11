<template>
	<v-container fluid>
			<v-form>
				<v-file-input
					label="Select text file (.srt, .txt, etc...)"
					prepend-icon="mdi-message-text"
					append-outer-icon="mdi-send"
					outlined
					multiple
					chips
					v-model="files"
					@click:append-outer="processSubtitles" />
			</v-form>
			<Pill 
				v-for="(word, index) in groupedWords" :key="word.name"
				:name="word.name" :amount="word.amount" :color="pillColor(index)" />
	</v-container>
</template>

<script>
	import Pill from './Pill.vue';

	export default {
		name: 'Home',
		
		components: { Pill },

		data: () => ({
			groupedWords: [],
			files: [],
			colors: [
				'red accent-4',
				'orange',
				'yellow accent-4',
				'green',
				'cyan',
				'blue darken-1',
				'grey darken-1'
			],
		}),

		methods: {
			// seleciona cor de acordo com o item da repetição
			pillColor(position){
				// porcentagem dos items percorridos
				let positionPercent = position / this.groupedWords.length;
				// cor correspendente em this.colors pela porcentagem
				let colorsPosition = Math.floor(positionPercent * this.colors.length);
				return this.colors[colorsPosition];
			},
			processSubtitles(){
				const paths = this.files.map(file => file.path);
				ipcRenderer.send('process-subtitles', paths);
			}
		},

		mounted(){
			ipcRenderer.on('process-subtitles', (event, res)=>{
				this.groupedWords = res;
			});
		}
	}
</script>

<!-- 
colors: [
	/*
	'red accent-4', 
	'pink accent-3', 
	'purple', 
	'blue', 
	'green', 
	'yellow darken-1', 
	'grey darken-1'
	*/
	/*
	'red accent-4',
	'purple',
	'blue',
	'cyan',
	'green',
	'yellow darken-1', 
	'grey darken-1'
	*/
	/*
	'red accent-4',
	'orange',
	'yellow accent-4',
	'green',
	'cyan',
	'blue darken-1',
	'grey darken-1'
	*/
],
 -->