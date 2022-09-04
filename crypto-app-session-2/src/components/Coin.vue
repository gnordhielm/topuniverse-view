<script setup>
let props = defineProps(["coin", "selectedCoinId"]);
</script>

<template>
  <li
    class="mx-auto w-60 m-2 py-2 px-4 border rounded-lg flex gap-4 hover:border-blue-300"
    :class="{
      'border-blue-500': props.selectedCoinId === props.coin.id,
    }"
    v-on:click="$emit('onSelectCoin', props.coin.id)"
  >
    <img class="w-12 h-12" v-bind:src="props.coin.icon" />
    <div class="flex-1 min-w-0 overflow-hidden">
      <h2 class="text-l">{{ props.coin.name }} ({{ props.coin.symbol }})</h2>
      <p class="truncate">{{ props.coin.price }}</p>
      <p v-if="props.selectedCoinId === props.coin.id">SELECTED</p>
    </div>
  </li>
</template>
