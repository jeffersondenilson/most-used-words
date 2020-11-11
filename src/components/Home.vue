<template>
	<v-container fluid>
			<Pill 
				v-for="(word, index) in groupedWords" :key="word.name"
				:name="word.name" :amount="word.amount" :color="pillColor(index)" />
	</v-container>
</template>

<script>
	import Pill from './Pill.vue'

	export default {
		name: 'Home',
		
		components: { Pill },

		data: () => ({
			groupedWords: [
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
			],
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
			}
		},
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