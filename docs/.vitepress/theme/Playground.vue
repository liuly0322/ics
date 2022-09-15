<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  default: {
    type: String,
    required: true,
  },
})

const input = ref(props.default)
const output = ref('')

const funcName = 'eval'
const click = () => {
  output.value = String(window[funcName](input.value))
}
</script>

<template>
  <div style="border: 1px solid; padding: 10px">
    <div style="margin: 0 0 10px 0">
      JavaScript 试一试
    </div>
    <input v-model="input" type="text" style="display: block; width: 100%; padding: 0 .5em; border: .5px solid">
    <div style="margin: 10px 0 0 0; display: flex">
      <button style="width: 60px; border: .5px solid; margin: .5em 0" @click="click">
        Run
      </button>
      <div class="output">
        {{ output ? `> ${output}` : '' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .output {
    border: .5px;
    border-radius: 1px;
    width: 100%;
    margin: .5em 0 .5em .5em;
    padding: 0 .5em;
    background-color: #efefef;
  }

  html.dark .output {
    background-color: #343434;
  }
</style>
