<script setup>
import { ref, watchEffect } from "vue";

let limit = ref(10);
let coins = ref([]);

watchEffect(async () => {
  let url = `https://api.coinstats.app/public/v1/coins?skip=0&limit=${limit.value}&currency=EUR`;

  let rawResult = await window.fetch(url);
  let resultJson = await rawResult.json();

  coins.value = resultJson.coins;
});
</script>

<template>
  <div>
    <h1>Coins</h1>
    <hr />
    <button v-on:click="limit--">-</button>
    <code>{{ limit }}</code>
    <button v-on:click="limit++">+</button>
    <hr />
    <div v-for="coin in coins" :key="coin.id" class="coin">
      <h2>{{ coin.name }} ({{ coin.symbol }})</h2>
      <p>{{ coin.price }}</p>
    </div>
  </div>
</template>

<style scoped></style>
