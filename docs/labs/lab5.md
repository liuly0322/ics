# 实验五

本次实验 [PDF](/pdf/lab5.pdf)

本次实验的代码模板：[中断例程](/interrupt.asm)

ddl: 12.28 23:30

- BB 系统提交 zip 压缩包，压缩包内目录结构
  ```
  PB21******_姓名.zip
  ├── PB21******_姓名_report.pdf
  └── lab5.asm
  ```

(PDF 更新) Please initialize USP by setting R6 to a appropriate value such as xFDFF at the
begining of your user program.

> 实验有困难？请仔细阅读第九章以下内容：
> - 特权级与地址空间布局
> - MMIO 及基于轮询的输入输出，TRAP 服务例程
> - 中断驱动的 I/O 及中断服务例程

以下 python 脚本可能会帮助你理解题目和验证结果

```python
def honoi(n):
    if n == 0:
        return 0
    return 2 * honoi(n-1) + 1

for i in range(10):
    print(f"Tower of honoi with {i} disk(s) needs {honoi(i)} move(s).")
```

## 实验说明

- 本次实验详细说明已包含在实验 pdf 文档内
- 你可以使用中文或英文完成实验报告
- 本实验测试方法见文档说明

