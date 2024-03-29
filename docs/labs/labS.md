# Lab S

## 勘误

`include/common.h` 中需要额外包含头文件：`#include <bitset>`。

## handout

- [PDF](/pdf/LAB_S.pdf)
- [框架](/LAB_S_Attachment.zip)
- [测试用例](/LAB_S_Test.zip)

[可能需要的 C++ 知识](/resource/cpp.html)

- 要求得到能正确执行的模拟器，不严格要求使用框架代码/框架提供的构建方式，但要求使用 C/C++ 语言完成。

## 提交说明

- 实验完成后腾讯会议线上提问检查，时间为每天上午 9:30 到 10:30
  - 每天检查前会在群内公布腾讯会议号
- BB 上需要提交 report (5% 分数)
  - 没有格式要求，简略说明即可

## DDL

检查实验时间最晚 2023 年 1 月 7 日上午 10:30，之后不接受检查 or 提交。

## Boost 库

在 labA 的介绍中，我们提到 Linux 下可以很方便的使用包管理器。本实验就将体现这一点。

> Boost 库是为 C++ 语言标准库提供扩展的一些 C++ 程序库的总称。Boost 库由 Boost 社区组织开发、维护。其目的是为 C++ 程序员提供免费、同行审查的、可移植的程序库。Boost 库可以与 C++ 标准库完美共同工作，并且为其提供扩展功能。Boost 库使用 BoostLicense 来授权使用，根据该协议，商业的非商业的使用都是允许并鼓励的。

Boost 库一般以源文件（头文件，便于知道函数声明）和链接库形式在包管理器分发。对于 Ubuntu 系统而言：

```bash
sudo apt update
sudo apt install libboost-all-dev
```

即可安装上 Boost 库。

可以尝试使用 `find /usr -name boost` 来找到安装后的 `boost` 库的位置。

### 附：APT

> APT 的全称是 Advance Package Tool，是一个处理在 Debian、Ubuntu 或者其他衍生发行版的 Linux 上安装和移除软件的自由软件。
> 
> 一般我们所认知的「软件商店」都是全程联网的，搜索等操作都会往服务器发送请求后返回最新的结果，但 APT 的策略有所不同：在计算机本地，系统会维护一个包列表，在这个列表里面，包含了软件信息以及软件包的依赖关系，在执行 `apt install` 命令时，会从这个列表中读取出想要安装的软件信息，包括下载地址、软件版本、依赖的包，同时 apt 会对依赖的包递归执行如上操作，直到不再有新的依赖包。如上得到的所有包，将会是在 `apt install some-package` 时安装的。
>
> 本地的这一包列表一般需要通过 `apt update` 命令手动更新。

以上内容参考自 [Linux 101-使用包管系统安装](https://101.lug.ustc.edu.cn/Ch03/#use-package-management-system)（[CC BY-SA 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/)）。

## CMake

之前我们已经介绍了 Makefile，那么 CMake 又有什么用呢？

- CMake 的语法更加简单
- CMake 能更好的跨平台，不仅可以生成 Makefile，还可以兼容其他构建系统

例如，如果你想在你的项目中使用你安装好的 Boost 库，使用 Make 可能需要手动指定 Boost 库的路径，但是 CMake 可以自动寻找 Boost 库，所以只需要有下面几行 CMake 代码就可以了：

```cmake
......
set(Boost_USE_STATIC_LIBS OFF)
set(Boost_USE_MULTITHREADED ON)
set(Boost_USE_STATIC_RUNTIME OFF)
find_package(Boost 1.45.0 COMPONENTS program_options)
......
if(Boost_FOUND)
    include_directories(${Boost_INCLUDE_DIRS})
    target_link_libraries(lc3simulator ${Boost_LIBRARIES})
endif()
```

当然，本次实验我们并不需要知道具体的 CMake 语法，只需要会使用就可以了。

```bash
mkdir build # 创建一个文件夹，名字叫 build，我们在这里生成可执行文件
cd build    # 进入 build 文件夹
cmake ..    # 两个点是上一级目录的意思，这里是根据上一级目录（也就是项目根目录）的 CMake 配置文件来产生 Makefile
make        # 最后构建出可执行文件 lc3simulator
```