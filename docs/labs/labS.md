# Lab S

## 勘误

`include/common.h` 中需要额外包含头文件：`#include <bitset>`。

## handout

- [PDF](/pdf/LAB_S.pdf)
- [框架](/LAB_S_Attachment.zip)

[可能需要的 C++ 知识](/resource/cpp.html)

- 要求得到能正确执行的模拟器，不严格要求使用框架代码/框架提供的构建方式，但要求使用 C/C++ 语言完成。

## 提交说明

- 实验需要检查代码，具体形式（腾讯会议 or 线下）待定
- BB 上需要提交 report (5% 分数)
  - 没有格式要求，简略说明即可

## DDL

未定，不早于 12 月 28 日 23:30。

## Boost 库

在 labA 的介绍中，我们提到 Linux 下可以很方便的使用包管理器。本实验就将体现这一点。

> Boost 库是为 C++ 语言标准库提供扩展的一些 C++ 程序库的总称。Boost 库由 Boost 社区组织开发、维护。其目的是为 C++ 程序员提供免费、同行审查的、可移植的程序库。Boost 库可以与 C++ 标准库完美共同工作，并且为其提供扩展功能。Boost 库使用 BoostLicense 来授权使用，根据该协议，商业的非商业的使用都是允许并鼓励的。

Boost 库一般以源文件（头文件，便于知道函数声明）和链接库形式在包管理器分发。对于 Ubuntu 系统而言：

```bash
sudo apt install libboost-all-dev
```

即可安装上 Boost 库。

可以尝试使用 `find /usr -name boost` 来找到安装后的 `boost` 库的位置。

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