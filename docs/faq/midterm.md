# 期中试卷部分问题讲解

## A2

这题指数 $e=255$, 小数部分都是 $0$, 前面是 $+\infty$, 后面是 $-\infty$, 结果是 NaN (Not a Number).

注：有同学后面问我 $\infty+0$ 是不是依然是 $\infty$, 我查了一下，确实是这样。

参考 https://www.doc.ic.ac.uk/~eedwards/compsys/float/nan.html, any arithmetic operation involving infinity yields infinity.

同时 NaN 会由如下的几种方式产生：

$\infty -\infty,-\infty+\infty,0\times \infty,0\div 0,\infty\div \infty$.

大家了解即可。

## A5

> What's the smallest positive integer that a **normalized** floating point number with $n$ bit fraction **cannot represent**?
>
> Assume the number of bit of the **exponent** is large enough.

题目意思是给定 $n$ bit fraction 和无限长的 exponent, 求不能表示的最小整数。

答案为 $2^{n+1}+1$.

我们首先论证能够表示小于等于 $2^{n+1}$ 的所有整数：

首先 $2^{n+1}$ 可以表示为 $1.0\dots0\times 2^{n+1}$ (小数部分为 $n$ 位，下同).

对于 $1\sim 2^{n+1}-1$ 中的任何整数，写成二进制形式，一定可以用 $n+1$ bit 表示 (因为 $n+1$ bit 能够表示范围 $[0,2^{n+1}-1]$ 的无符号数), 记作 $\overline{a_na_{n-1}\dots a_0}$, 其中 $a_{i}=0\ or\ 1,i=0,\dots n$, 我们取满足 $a_j=1$ 的最大的 $j$, 也即 $\overline {a_{n}\dots a_{j+1}}=0$. 可以将其表示为浮点数 $1.a_{j-1}\dots a_0\times 2^{j}$.

上面可能比较抽象，举个具体的例子，例如 $n=6$ 时，为了表示 $17$, $17=0\dots10001$, 这里 $j=4$, 因此可以记作 $1.0001\times 2^{4}$.

其次论证 $2^{n+1}+1$ 不能被表示：

考虑 $2^{n+1}$ 之后的整数，为了使增量最小，一定是让最低位的 $0$ 变成 $1$, 也即  $1.0\dots01\times 2^{n+1}$, 这个数是 $2^{n+1}+2$. 说明 $2^{n+1}+1$ 不能被表示。

另外，按照群里同学的说法，可以考虑找规律归纳：

例如当 $n=0$, 这时能表示的所有数为 $2^{k},k=0,1,2\dots$, 也即 $1,2,4\dots$, 显然 $3$ 就是最小不能表示的整数，以此类推也能够推出答案为 $2^{n+1}+1$.

## C2

这里 x3082 的语句是 $STR\ R_3,\ R_2,\ \#0$, 效果是 $M[R_2+offset]=R_3$, (这里 $offset$ 是 $0$), 因此是在 $x3085$ 处写入 $x4241$, 对指令不熟悉的同学一定要看看附录 A!
