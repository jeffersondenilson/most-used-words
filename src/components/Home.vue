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
			<!-- <div v-for="(n, index) in 5" :key="n">{{index}} - {{n}}</div> -->
			<div v-if="groupedWords.length > 0">
				<Pill 
					v-for="(n, index) in limit" :key="n"
					v-if="groupedWords[startAtItem + index]"
					:word="groupedWords[startAtItem + index]"
					:color="pillColor(startAtItem + index)" />
				<!-- 
				<Pill 
					v-for="(word, index) in groupedWords" :key="word.name"
					:name="word.name" :amount="word.amount" :color="pillColor(index)" />
				-->
			</div>
			<v-pagination
				v-if="groupedWords.length > 0"
        v-model="page"
        :length="numberOfPages"
        class="my-4"
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

		computed: {
			numberOfPages(){
				// const numberOfPages = Math.ceil(this.groupedWords.length / this.limit);
				// if(this.groupedWords.length > 0 && numberOfPages < 1){
				// 	return 1;
				// }
				return Math.ceil(this.groupedWords.length / this.limit);
			},
			startAtItem(){
				return (this.page * this.limit) - this.limit;
			}
		},

		mounted(){
			ipcRenderer.on('process-subtitles', (event, res)=>{
				if(res.error){
					console.log(res.error);
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