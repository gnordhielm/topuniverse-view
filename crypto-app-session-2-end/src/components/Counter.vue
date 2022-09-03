<script setup>
import { ref } from "vue";
let props = defineProps(["initialCount"]);

let count = ref(parseInt(props.initialCount) || 0);
let getNewCount = (last) => {
  count.value = last + 1;
};
</script>

<template>
  <button v-on:click="getNewCount(count)">
    You clicked me {{ count }} times.
  </button>
</template>
