<script setup>
import Coin from "./components/Coin.vue";
import { ref, watchEffect } from "vue";

let limit = ref(12);
let coins = ref([]);
let activeCoinId = ref(null);

watchEffect(async () => {
  let url = `https://api.coinstats.app/public/v1/coins?skip=0&limit=${limit.value}&currency=EUR`;

  let rawResult = await window.fetch(url);
  let resultJson = await rawResult.json();
  coins.value = resultJson.coins;
});

let onSetActiveCoin = (coinId) => {
  activeCoinId.value = coinId;
};
</script>

<template>
  <div>
    <h1 class="text-2xl text-blue-600 mb-6 text-center">Coins</h1>
    <pre>{{ activeCoinId }}</pre>
    <ul>
      <Coin
        v-for="coin in coins"
        v-bind:key="coin.id"
        v-bind:coin="coin"
        v-bind:selectedCoinId="activeCoinId"
        v-on:onSelectCoin="onSetActiveCoin"
      />
    </ul>
  </div>
</template>

<style scoped></style>
