<template>
	<v-chip 
		class="ma-3 py-5 rounded-pill text-body-1 font-weight-bold"
		:color="color" 
		text-color="white"
	>
		{{ word.name }}
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
					{{ word.amount }}
				</v-chip>
      </template>
      <span>{{ word.amount }}</span>
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

	export default {
		props: ['word', 'color'],
		name: 'Pill',
	}
</script>

<!-- 
red
purple
blue
cyan
green
yellow
gray

red
orange
yellow
green
cyan
blue
black
-->