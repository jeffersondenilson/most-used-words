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

			<div v-if="isProcessing">Processing Subtitles...</div>

			<div v-if="groupedWords.length > 0">
				<Pill 
					v-for="word in wordsByPage" :key="word.name"
					:name="word.name" :amount="word.amount" :position="word.position"
					:color="pillColor(word.position)" />
			</div>
			<!-- 
			<Pill 
				v-for="(word, index) in groupedWords" :key="word.name"
				:name="word.name" :amount="word.amount" :color="pillColor(index)" />
			-->
			<v-pagination
        class="my-4"
				v-if="groupedWords.length > 0"
        v-model="page"
        :length="numberOfPages"
      ></v-pagination>
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
			limit: 50,
			page: 1,
			isProcessing: false,
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
			processSubtitles(){
				const paths = this.files.map(file => file.path);
				ipcRenderer.send('process-subtitles', paths);
				this.isProcessing = true;
			},
			// seleciona cor de acordo com o item da repetição
			pillColor(position){
				// porcentagem dos items percorridos
				let positionPercent = position / this.groupedWords.length;
				// cor correspendente em this.colors pela porcentagem
				let colorsPosition = Math.floor(positionPercent * this.colors.length);
				
				const test = `pos: ${position},
				pos%: ${positionPercent},
				cPos: ${colorsPosition},
				color: ${this.colors[colorsPosition]}`;
				// console.log(test);

				return this.colors[colorsPosition];
			},
			selectWordsByPage(){
				// console.log(this.groupedWords)
				const start = (this.page - 1) * this.limit;
				const end = start + this.limit;
				// return `${start} - ${end - 1}`;
				return this.groupedWords.splice(start, end);
			}
		},

		computed: {
			numberOfPages(){
				return Math.ceil(this.groupedWords.length / this.limit);
			},
			wordsByPage(){
				// console.log(this.groupedWords)
				const start = (this.page - 1) * this.limit;
				const end = start + this.limit;
				// return `${start} - ${end - 1}`;
				const words = this.groupedWords.filter((word, index)=>{
					return index >= start && index < end;
				});
				return words;
				// return this.selectWordsByPage();
			}
		},

		mounted(){
			ipcRenderer.on('process-subtitles', (event, res)=>{
				this.isProcessing = false;

				if(res.error){
					console.error(res.error);
					alert(res.error);
				}else{
					this.groupedWords = res;
				}
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