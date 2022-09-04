<script setup lang="ts">
import { FMessage } from 'fighting-design'
import { getPreset, presets } from './lc3/lc3_preset'
import lc3Bench from './lc3/lc3_bench'
import { computed, nextTick, ref, watch } from 'vue'

const instrLimit = ref(100000)
const lab = ref('自定义')
const model = ref(getPreset(lab.value))
const code = ref(window.localStorage.getItem('lc3code') ?? '')
const log = ref(false)
const outputs = ref([] as string[])

const cases = computed(() =>
  model.value.testCases.split(',').map((s: string) => s.trim()).filter(Boolean),
)

watch(code, (cur) => {
  window.localStorage.setItem('lc3code', cur)
})

watch(lab, (cur) => {
  model.value = getPreset(cur)
  outputs.value = []
})

watch(log, (cur) => {
  if (cur) {
    FMessage({
      message: '开启调试模式后为了避免混淆，只显示第一个样例...',
      type: 'success',
    })
  }
})

const bench = async () => {
  outputs.value = []
  if (!code.value)
    outputs.value.push('没有填写待评测代码，无法评测...')

  if (!model.value.testCode)
    outputs.value.push('没有评测函数，无法评测...')

  if (!model.value.ansCode)
    outputs.value.push('没有答案函数，无法评测...')

  if (!cases.value.length)
    outputs.value.push('没有测试样例，无法评测...')

  if (!outputs.value.length) {
    outputs.value = lc3Bench(
      code.value,
      model.value.testCode,
      model.value.ansCode,
      cases.value,
      instrLimit.value,
      log.value,
    )
  }
  await nextTick()
  window.scrollTo(0, document.documentElement.scrollHeight)
}
</script>

<template>
  <div class="card">
    <div class="form-item">
      <span class="label">单样例最大指令数</span>
      <input v-model="instrLimit" type="number" style="border: 0.5px solid; padding:0.5em; margin: 4px">
    </div>

    <div class="form-item">
      <span class="label">选择评测实验</span>
      <div style="display: flex">
        <div v-for="preset in presets" :key="preset" style="margin: 4px">
          <input :id="preset" v-model="lab" type="radio" :value="preset">
          <label :for="preset">{{ preset }}</label>
        </div>
      </div>
    </div>

    <div class="card" style="margin-bottom: 2em">
      <span class="label">实验要求</span>
      <div>{{ model.description }}</div>
    </div>

    <div class="form-item">
      <span class="label">测试样例，样例之间以英文逗号分割</span>
      <input
        v-model="model.testCases"
        style="border: 0.5px solid; padding: 0.5em; margin: 4px; box-sizing: border-box; width: 100%"
      >
    </div>

    <div class="form-item">
      <span class="label">代码文本</span>
      <textarea v-model="code" rows="10" placeholder="在此输入待评测的汇编代码或者机器码" style="border: 0.5px solid; margin: 4px" />
    </div>

    <div v-show="lab === '自定义'" class="form-item">
      <span class="label">评测函数</span>
      <textarea
        v-model="model.testCode" rows="10"
        placeholder="一个 js 函数，接受单个样例（字符串）作为参数，初始化 lc3.r 和 lc3.memory（寄存器数组和内存数组），并返回对于每个样例而言预期的输出"
        style="border: 0.5px solid; margin: 4px"
      />
    </div>

    <div v-show="lab === '自定义'" class="form-item">
      <span class="label">答案函数</span>
      <textarea
        v-model="model.ansCode" rows="10"
        placeholder="一个 js 函数，返回测试结束后读取 lc3 模拟器的哪个变量（如 lc3.r 和 lc3.memory 数组中的某一项）的值作为用户程序运行的输出（即评测依据）"
        style="border: 0.5px solid; margin: 4px"
      />
    </div>

    <div class="form-item">
      <span class="label">启用调试模式（支持追踪 pc 和寄存器变化）</span>
      <f-switch v-model="log" />
    </div>

    <div style="display: flex; justify-content: flex-end">
      <f-button type="primary" @click="bench()">
        评测
      </f-button>
    </div>

    <div v-if="outputs.length" class="card" style="margin-top: 2em">
      <span class="label">评测结果</span>
      <ul>
        <li v-for="output in outputs" :key="output">
          {{ output }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.card {
  border: #e5e5e5 solid 1px;
  padding: 20px
}

.form-item {
  margin-bottom: 1em
}

.label {
  display: block;
  margin-bottom: 0.5em;
}

textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5em;
  font-family: Consolas, "Courier New", Courier, FreeMono, monospace
}
</style>
