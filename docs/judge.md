# lc3 评测

<Judge />

## 功能

本工具受到 [lc3web](https://github.com/wchargin/lc3web) 的启发，可用于 lc3 程序的自助评测及程序调试

预设的每次实验的测试样例仅供参考，<span style="color: #0095d9;">验收实验时可能会增添更多样例</span>，鼓励自行补充测试样例

如果你更偏好本地命令行测试，可以查看 [lc3tools](https://github.com/chiragsakhuja/lc3tools) 项目提供的 [单元测试文档](https://github.com/chiragsakhuja/lc3tools/blob/master/docs/TEST.md) 及该项目 README 中提到的命令行工具的使用

## 使用说明

约定如下：

- 统一以 0x3000 作为评测程序入口
- 机器码开头可以包含 0011000000000000 (0x3000) 入口地址，也可以不包含
- 注意格式：
  - 代码中的注释需要写在英文分号之后
  - 汇编代码需要写 `.ORIG` 和 `.END`
  - 汇编代码参数需要用英文逗号分割
  - ......

## 自定义评测

（如果只需要评测实验可略过）

用户需要补全评测函数和答案函数两个函数的函数体

其中，评测函数需要负责初始化寄存器和（重置每次使用到的）内存的值，具体来说，函数内部可以通过 `lc3.r` 和 `lc3.memory` 来访问寄存器数组变量和内存数组变量。前者长度为 `8`，后者长度为 `65536`

例如，如果初始输入存储在 R0, 目标是将 R0 + R0 存在 R7，对应的评测函数体示例：

```js
// 可以访问两个参数
// lc3 为模拟器对象，testcase 为输入样例（字符串类型）

// 字符串转换为数字
const input = parseInt(testcase)
// 初始化寄存器
lc3.r[0] = input
// 返回预计的正确答案
return (input + input) % 65536
```

答案函数体示例：

```js
// 函数接受一个参数 lc3

// 返回评测结束后获取到的答案
return lc3.r[7]
```

两个函数的返回值需要保持类型一致

<script setup>
import Judge from '@theme/Judge.vue'
</script>
