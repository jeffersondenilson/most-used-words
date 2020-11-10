<template>
	<v-chip 
		class="ma-3 py-5 rounded-pill text-body-1 font-weight-bold"
		:color="color" 
		text-color="white"
	>
		{{ name }}
		<v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-chip 
					class="ml-3 rounded-circle"
					color="white"
					:text-color="color"
					v-bind="attrs"
          v-on="on"
					v-number-shortener
				>
					{{ amount }}
				</v-chip>
      </template>
      <span v-comma-separated-number>{{ amount }}</span>
    </v-tooltip>
	</v-chip>
</template>

<script>
	import Vue from 'vue';

	Vue.directive('number-shortener', {
		inserted(el, binding){
			const amount = parseInt(el.innerText);

			if(amount >= 1000000000){
				el.innerText = (amount / 1000000000).toFixed(1) + 'bi';
			}else if(amount >= 1000000){
				el.innerText = (amount / 1000000).toFixed(1) + 'mi';
			}else if(amount >= 1000){
				el.innerText = (amount / 1000).toFixed(1) + 'k';
			}
		}
	});

	Vue.directive('comma-separated-number', {
		inserted(el, binding){
			// 1
			const amount = el.innerText;
			let newText = '';

			for(let i = amount.length; i > 0; i-=3){
				let substring = ',' + amount.substring(i, i-3);
				newText = substring + newText;
			}

			if(newText[0] === ','){
				newText[0] = '';
			}

			el.innerText = newText;
			// 2
			// const array = el.innerText.split(''); 
			// let newText = '', j = 0;
			// for(let i = array.length; i > 0; i--){
			// 	newText = array[i] + newText;
			// 	j++;
			// 	if(j===3){
			// 		newText+=',';
			// 		j=0;
			// 	}
			// }
			// el.innerText = newText;
		}
	});

	export default {
		props: ['name', 'amount', 'color'],
		name: 'Pill',
		data: () => ({
			colors: [
				'red accent-4', 
				'pink', 
				'purple', 
				'blue', 
				'green', 
				'yellow', 
				'grey'
			]
		})
	}
</script>