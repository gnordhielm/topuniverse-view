<script setup>
import Counter from "./components/Counter.vue";
import ControlledCounter from "./components/ControlledCounter.vue";
import BarChart from "./components/BarChart.vue";

import { ref, watchEffect } from "vue";

let limit = ref(5);
let coins = ref([]);
let activeCoinId = ref(null);
let currency = ref("USD");

watchEffect(async () => {
  let url = `https://api.coinstats.app/public/v1/coins?skip=0&limit=${limit.value}&currency=${currency.value}`;

  let rawResult = await window.fetch(url);
  let resultJson = await rawResult.json();

  coins.value = resultJson.coins;
  console.log(coins.value);
});

let onSelectCoin = (coinId) => {
  activeCoinId.value = coinId;
};

let controlledCount = ref(9);
let onControlledCountChange = (count) => {
  controlledCount.value = count + 3;
};
</script>

<template>
  <div>
    <Counter initialCount="4" />
    <Counter />
    <hr />
    <ControlledCounter
      v-bind:value="controlledCount"
      v-on:onChange="onControlledCountChange"
    />
    <hr />
    <h1 class="text-3xl font-bold underline">Coins</h1>
    <div>{{ activeCoinId }}</div>
    <hr />
    <button v-on:click="limit--">-</button>
    <code>{{ limit }}</code>
    <button v-on:click="limit++">+</button>
    <hr />
    <div v-for="coin in coins" :key="coin.id" class="coin">
      <h2>{{ coin.name }} ({{ coin.symbol }})</h2>
      <p>{{ coin.price }}</p>
      <img
        :src="coin.icon"
        alt=""
        class="icon"
        v-on:click="onSelectCoin(coin.id)"
      />
    </div>
    <BarChart />
  </div>
</template>

<style scoped>
.icon {
}
</style>
