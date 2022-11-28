<script setup lang="ts">
import { FMessage } from 'fighting-design'
import { getPreset, presets } from './lc3/lc3_preset'
import type { ActualAnsFunc, BenchResult, ExpectedAnsFunc } from './lc3/lc3_bench'
import lc3Bench from './lc3/lc3_bench'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'

const instrLimit = ref(1000000)
const lab = ref('lab2')
const labModel = ref(getPreset(lab.value))
const code = ref('')
const debug = ref(false)
const outputs = ref<BenchResult>({ state: null, logs: [] })

const cases = computed(() =>
  labModel.value.testCases
    .replace(/，/g, ',')
    .split(',')
    .map((s: string) => s.trim())
    .filter(Boolean),
)

// load & save user's code
onMounted(() => {
  code.value = window.localStorage.getItem('lc3code') ?? ''
  watchEffect(() => {
    window.localStorage.setItem('lc3code', code.value)
  })
})

// debug mode hint
watchEffect(() => {
  if (debug.value) {
    FMessage({
      message: '开启调试模式后为了避免混淆，只显示第一个样例，同时限制最多执行 10000 条指令',
      type: 'primary',
    })
  }
})

// change presets
watch(lab, (cur) => {
  labModel.value = getPreset(cur)
  outputs.value = { state: null, logs: [] }
})

const expectedAnsFunc = computed(() => {
  try {
    // eslint-disable-next-line no-new-func
    return Function('lc3', 'testcase', labModel.value.testCode) as ExpectedAnsFunc
  }
  catch (e) {
    return String(e)
  }
})
const isValidTestCode = computed(() => typeof expectedAnsFunc.value != 'string')

const actualAnsFunc = computed(() => {
  try {
    // eslint-disable-next-line no-new-func
    return Function('lc3', labModel.value.ansCode) as ActualAnsFunc
  }
  catch (e) {
    return String(e)
  }
})
const isValidAnsCode = computed(() => typeof actualAnsFunc.value != 'string')

const bench = () => {
  outputs.value = { state: null, logs: [] }

  const errors = [[!cases.value.length, '缺少测试样例'],
    [!code.value, '缺少待测代码'],
    [!labModel.value.testCode, '缺少评测函数'],
    [!isValidTestCode.value, '评测函数有语法错误'],
    [!labModel.value.ansCode, '缺少答案函数'],
    [!isValidAnsCode.value, '答案函数有语法错误']]
    .filter(err => err[0])
    .map(err => err[1])
    .map(err =>
      FMessage({
        message: err,
        type: 'danger',
      }),
    )

  if (errors.length)
    return

  outputs.value = lc3Bench(
    code.value,
    expectedAnsFunc.value as ExpectedAnsFunc,
    actualAnsFunc.value as ActualAnsFunc,
    cases.value,
    debug.value ? 10000 : instrLimit.value,
    debug.value,
  )
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

    <div class="form-item">
      <span class="label">测试样例，样例之间以逗号分割</span>
      <input
        v-model="labModel.testCases"
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
        v-model="labModel.testCode" rows="10"
        :class="typeof expectedAnsFunc == 'string' ? 'border-red' : ''"
        placeholder="一个 js 函数的函数体，接受单个样例（字符串）作为参数，初始化 lc3.r 和 lc3.memory（寄存器数组和内存数组），并返回对于每个样例而言预期的输出"
        style="border: 0.5px solid; margin: 4px"
      />
      <div v-if="!isValidTestCode" style="color: red">
        {{ expectedAnsFunc }}
      </div>
    </div>

    <div v-show="lab === '自定义'" class="form-item">
      <span class="label">答案函数</span>
      <textarea
        v-model="labModel.ansCode" rows="10"
        :class="typeof actualAnsFunc == 'string' ? 'border-red' : ''"
        placeholder="一个 js 函数的函数体，返回测试结束后读取 lc3 模拟器的哪个变量（如 lc3.r 和 lc3.memory 数组中的某一项）的值作为用户程序运行的输出（即评测依据）"
        style="border: 0.5px solid; margin: 4px"
      />
      <div v-if="!isValidAnsCode" style="color: red">
        {{ actualAnsFunc }}
      </div>
    </div>

    <div class="form-item">
      <span class="label">调试模式</span>
      <f-switch v-model="debug" />
    </div>

    <div style="display: flex; justify-content: flex-end">
      <f-button type="primary" @click="bench()">
        评测
      </f-button>
    </div>

    <div v-if="outputs.logs.length" class="card" style="margin-top: 2em">
      <span class="label">{{ outputs.state === 'assembly' ? '汇编' : outputs.state === 'machine' ? '机器码' : '' }}评测</span>
      {{ outputs.logs[0] }}
      <ul>
        <li v-for="(output, index) in outputs.logs.slice(1)" :key="index">
          {{ output }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.card {
  border: #e5e5e5 solid 1px;
  margin: 1em 0;
  padding: 1.5em
}

.form-item {
  margin-bottom: 1em
}

.label {
  display: block;
  margin-bottom: 0.5em
}

textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5em;
  font-family: "Fira Code", Consolas, "Courier New", Courier, FreeMono, monospace
}

.border-red {
  border-color: red !important;
}
</style>
