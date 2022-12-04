# Lab A

## 勘误

`src/assembler.h` 中，对 BR 的注释：

```cpp
"BR",     // 02: "0000000" + pcoffset(line[1],9)
```

改为：

```cpp
"BR",     // 02: "0000111" + pcoffset(line[1],9)
```

实验文档 pdf 最后一面的测试指令改为：

```bash
# 创建存放输出的文件夹，若已经创建可忽略
mkdir /test/actual
# 运行汇编器，对测试样例汇编
./assembler -f ./test/testcases/test1.asm -o ./test/actual/test1.bin
# 比较实际输出和预期输出，如果一致，应该什么都不显示
diff ./test/actual/test1.bin ./test/expected/test1.bin
```

## handout

- [PDF](/pdf/LAB_A.pdf)
- [框架](/LAB_A_Attachment.zip)

[可能需要的 C++ 知识](/resource/cpp.html)

- 要求得到能正确执行的汇编器，不严格要求使用框架代码/框架提供的构建方式，但要求使用 C/C++ 语言完成。

## 提交说明

- 实验需要检查代码，具体形式（腾讯会议 or 线下）待定
- BB 上需要提交 report (5% 分数)
  - 没有格式要求，简略说明即可

## DDL

未定，不早于 12 月 28 日 23:30。

## 为什么你应该开始学习 Linux

回顾一下我们常用的 Windows 系统：
- 图形化操作为主
- 没有方便的自带的「包管理」

包管理是什么？我们都知道，不同软件间，很多基础的代码是可以被复用的：例如，我写一个压缩软件，和我写一个通信软件，可能都需要加密模块。所以，我们希望有一个方便的办法来获取「加密模块」的代码，这样我直接 #include 就可以继续使用了。这样的代码被称为库代码。我们常说的「调库」，就是指使用别的库提供的接口，来实现丰富的自定义功能。

当然，实际分发的不一定是加密模块的代码，还可能是已经被编译为可链接文件的静态/动态二进制库等，但功能是类似的，都是为了实现「复用」。

所以，我们需要一个类似「软件市场」的程序来上传，下载这些常用的库（当然也可以直接上传，下载应用程序）。

这样的类似「软件市场」的程序就称为包管理器。Linux 系统一般都自带包管理器，所以软件开发经常会需要使用 Linux 系统（Windows 配置起来可能会更加麻烦）。

## 如何使用/学习 Linux

可以在自己的实体机上安装 Linux（采用双系统等），也可以采用虚拟机（模拟一个 Linux 系统）。

「虚拟机」能让我们方便的用上 Linux 系统：
- Windows 下安装虚拟机，有 WSL2 等选择
- 采用在线虚拟机，Vlab

具体学习上，可以参考 [我校 lug 社团编篡的入门教程](https://101.lug.ustc.edu.cn/)。

## Makefile

为什么需要使用 Makefile？可以参考[这篇文章](https://www.zhaixue.cc/makefile/makefile-intro.html)。可以在阅读时思考以下问题：

- C/CPP 代码是如何编译到程序的？
- 一个 C/CPP 工程可能会包含很多源代码文件，如果每次都完全编译，会耗费大量的时间，Make 是如何解决这一问题的？

## 代码编辑

以下都是能够完成附加实验的代码编辑方案：

如果使用 Vlab:
- 采用 Vlab 图形界面的 VSCode
- 采用 Vlab 提供的[网页 VSCode](https://vlab.ustc.edu.cn/docs/apps/vscode/)
- 采用 SSH 远程连接（见习题课演示）

如果使用本地：
- 可以使用 IDE，比如 CLion
- 可以使用本地 VSCode
