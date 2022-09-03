<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { presets, getPreset } from './lc3/lc3_preset'
import lc3Bench from './lc3/lc3_bench'


const instrLimit = ref(100000)
const lab = ref('自定义')
const model = ref(getPreset(lab.value))
const code = ref('')
const log = ref(false)
const outputs = ref([] as string[])

const cases = computed(() =>
  model.value.testCases.split(',').map((s: string) => s.trim()).filter(Boolean)
)

watch(lab, (cur) => {
  model.value = getPreset(cur)
  outputs.value = []
})

watch(log, (cur) => {
  if (cur) {
    window.alert(
      '开启调试模式后，将只显示第一个测试样例的完整执行过程，其余样例会被忽略...'
    )
  }
})

const bench = async () => {
  outputs.value = []
  if (!code.value) {
    outputs.value.push('没有填写待评测代码，无法评测...')
  }
  if (!model.value.testCode) {
    outputs.value.push('没有评测函数，无法评测...')
  }
  if (!model.value.ansCode) {
    outputs.value.push('没有答案函数，无法评测...')
  }
  if (!cases.value.length) {
    outputs.value.push('没有测试样例，无法评测...')
  }
  if (!outputs.value.length) {
    outputs.value = lc3Bench(
      code.value,
      model.value.testCode,
      model.value.ansCode,
      cases.value,
      instrLimit.value,
      log.value
    )
  }
  await nextTick()
  window.scrollTo(0, document.documentElement.scrollHeight)
}
</script>

<template>
  <f-card>
    <div class="form-item">
      <span class="label">单样例最大指令数</span>
      <input type="number" style="border: 0.5px solid; margin: 4px" v-model="instrLimit" />
    </div>

    <div class="form-item">
      <span class="label">选择评测实验</span>
      <div style="display: flex">
        <div v-for="preset in presets" :key="preset" style="margin: 4px">
          <input type="radio" :id="preset" :value="preset" v-model="lab" />
          <label :for="preset">{{ preset }}</label>
        </div>
      </div>
    </div>

    <f-card title="实验要求" style="margin-bottom: 2em">
      {{ model.description }}
    </f-card>

    <div class="form-item">
      <span class="label">测试样例，样例之间以英文逗号分割</span>
      <input style="border: 0.5px solid; margin: 4px; box-sizing: border-box; width: 100%" v-model="model.testCases" />
    </div>

    <div class="form-item">
      <span class="label">代码文本</span>
      <textarea rows="10" placeholder="在此输入待评测的汇编代码或者机器码" style="border: 0.5px solid; margin: 4px"
        v-model="code"></textarea>
    </div>

    <div class="form-item" v-show="lab === '自定义'">
      <span class="label">评测函数</span>
      <textarea rows="10" placeholder="一个 js 函数，接受单个样例（字符串）作为参数，初始化 lc3.r 和 lc3.memory（寄存器数组和内存数组），并返回对于每个样例而言预期的输出"
        style="border: 0.5px solid; margin: 4px" v-model="model.testCode"></textarea>
    </div>

    <div class="form-item" v-show="lab === '自定义'">
      <span class="label">答案函数</span>
      <textarea rows="10"
        placeholder="一个 js 函数，返回测试结束后读取 lc3 模拟器的哪个变量（如 lc3.r 和 lc3.memory 数组中的某一项）的值作为用户程序运行的输出（即评测依据）"
        style="border: 0.5px solid; margin: 4px" v-model="model.ansCode"></textarea>
    </div>

    <div class="form-item">
      <span class="label">启用调试模式（支持追踪 pc 和寄存器变化）</span>
      <f-switch v-model="log"></f-switch>
    </div>

    <div style="display: flex; justify-content: flex-end">
      <f-button type="primary" @click="bench()"> 评测 </f-button>
    </div>
    <f-card v-if="outputs.length" title="评测结果" style="margin-top: 2em">
      <ul>
        <li v-for="output in outputs" :key="output">{{ output }}</li>
      </ul>
    </f-card>
  </f-card>


</template>

<style>
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
  padding: 0.5em
}
</style>