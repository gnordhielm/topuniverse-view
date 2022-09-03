<script setup>
let props = defineProps(["value", "getNewCount"]);
</script>

<template>
  <button v-on:click="$emit('onChange', props.value)">
    You clicked me {{ props.value }} times [CONTROLLED].
  </button>
</template>
