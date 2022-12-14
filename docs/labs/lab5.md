# 实验五

本次实验 [PDF](/pdf/lab5.pdf)

本次实验的代码模板：[中断例程](/interrupt.asm)

ddl：12.28 23:30

- BB 系统提交 zip 压缩包，压缩包内目录结构
  ```
  PB21******_姓名.zip
  ├── PB21******_姓名_report.pdf
  └── lab5.asm
  ```

以下 python 脚本可能会理解题目和验证结果

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

