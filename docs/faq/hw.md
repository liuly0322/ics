# HW && Lab Q&A

## Q：HW3 T4 题意不太清楚？

意思就是要你算执行这条指令每个 phase 花去多少 cycle, 然后对于不访存的 phase, 如果在这条指令执行时有这个 phase, 算 1 周期，不包含算 0, 对于访存的 phase, 按照题意算周期。

## Q：Lab5 一些问题和提示

1. 实验要求对于每次键盘输入即时响应，所以汉诺塔的合法输入也只能有一位，也就是说 $0\le N\le 9$。因此输出数字的范围也是有限的，为了方便起见，我们不要求去除输出的前导 0，也即输出 007 和 7 同样都是正确的。

2. 编写递归程序涉及到用户栈 (USP)，用户栈使用的时候要给 R6 设置一个合法的初始位置，比如 xFDFF。

3. 本次实验只能使用 LC3Tools 进行测试，没有网站的评测。同时在使用软件测试时，需要注意：

   - 键盘输入需要点进左下角的 console 再输入 (click to focus)，不然不能正常读入。
   - LC3Tools 使用时可能会出现 bug，例如循环输出学号时对键盘输入没有任何反应，如果你出现了这样的情况，有很大可能是 LC3Tools 的 bug，建议重启软件再重新尝试。
   > 需要重启软件可能是因为之前键盘有输入把 kbsr 最高位设为 1(kbsr 从 x4000 变为 xC000)，但是没有读 kbdr(trap x21/ldi r0,kbdr) 把 kbsr 最高位复位 (kbsr 变回 x4000)。kbsr 没有复位的情况下不会对后续的键盘输入做相应，也就是上边说的输入无效的问题。LC3 tool 的 reinitialize machine 部分不会重置 IO 相关内存 (这个时候 kbsr 一直是 xC000，reinitialize 之后还是不能输入)，所以只能通过重启解决。避免这个问题的方法是接收到键盘输入以后及时读出 kbdr 的数据使 kbsr 复位。

4. 实验只需要在提供的 starter code 的基础上编写 x3000 的 user program 和 x1000 的 interrupt service，两部分之间的关联（也即中断），已经在 x800 的地方写好了。至于 x3FFF 处的注释，只是说明 `HANOI_N` 是存在这个地方的，并不需要在这里写代码。不理解中断请仔细阅读书本第九章。

5. 有人问 x800 的 code set KBSR 的时候为什么这么麻烦，这是为了不改变其他位，这里的处理是 clear bit 14，之后在 ADD 掩码，也可以考虑对 KBSR 取反后，clear bit 14 再取反，也能达到一样的目的。

6. 一开始一大段的汉诺塔介绍只是为了教大家汉诺塔的递推公式，要求大家编写满足递推式的递归程序来计算 `HANOI(N)`，并不需要模拟柱子的移动之类的东西。

7. 出现 `Privilege violation` 错误，大概率是访问了不该访问的内存，看看你的跳转指令是否有问题，比如忘记 save R7。

8. `Illegal opcode`，大概率是把数据当成指令执行，跟 7 的错误很像，可以通过打断点单步调试来找 bug。同时请注意，JSR 后面的 subroutine，需要你通过 step in 才能进去调试，而不是 step over（这和高级语言的调试器是一致的）。

9. 不同的 `.ORIG` 块作用是把代码插在不同的地址，程序将会从第一个 `.ORIG` 块开始执行，在本次实验中也就是 x800。同时多个 `.ORIG` 块也并不是并行运行的，如果还不理解中断，请仔细阅读书本第九章的相关知识。不同的 `.ORIG` 块不能 share label，因此对于同一个地址，例如 `HANOI_N`，你需要在不同的 `.ORIG` 块中用不同的名字 `.FILL` 相同的值。

## Q：关于 Windows 下连接 Vlab 的常见问题

1. 配置文件中的 `~` 指的是家目录，Windows 下的家目录是 `C:\Users\你的用户名`，例如你的用户名是 ikun，那你的配置文件路径就是 `C:\Users\ikun\.ssh\config`。这也可以通过在 VSCode 下使用 `ctrl + shift + p`，选择 `Remote-SSH: Open SSH Configuration File` 来打开。同时这个文件也是没有后缀名的，不要写成 json 之类的乱七八糟的格式，按照我 PPT 里写的来就行，注意 IdentityFile 的路径一定要改对。

2. 修改权限那一步，请参考 [知乎文章](https://zhuanlan.zhihu.com/p/364189095)。

3. 写完配置文件后，可以打开终端（也就是 Powershell），输入 `ssh vlab`（这里的 `vlab` 是你配置文件里的 `HostName`），如果出现 `Permission denied (publickey).` 的错误，那就是你的权限没改好。只有在终端成功连接，VSCode 才能成功连接。如何打开终端之类的问题，**请善用搜索引擎**。

4. 上一步中如果报错“garbage at end of line 1”，说明 IdentityFile 的路径中含有空格，请用双引号将路径括起来。

5. 使用 VSCode 第一次连接时会弹出让你选择 Remote Platform 的选项框，需要选择 Linux，否则会卡住。
