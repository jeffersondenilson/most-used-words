<template>
	<v-container fluid>
			<Pill 
				v-for="word in groupedWords" :key="word.name"
				:name="word.name" :amount="word.amount" />
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
				{ name: 'u', amount: 9 },
				{ name: 'e', amount: 8 },
			],
			colors: [
				'red accent-4', 
				'pink', 
				'purple', 
				'blue', 
				'green', 
				'yellow', 
				'grey'
			],
		}),

		methods: {
			calculateTotalWords(){
				this.wordsTotal = groupedWords.reduce((total, word)=>{
					return total + word.amount;
				});
			},

			amountToColor(amount){
				const factor = groupedWords.length / 7;
				// return color;
			}
		},
	}
</script>