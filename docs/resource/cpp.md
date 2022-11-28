# C++: A brief introduction

## C++ 相关参考资料网站

（待补充）

## C++ IO

用 `iostream` 里的 `std::cin` 和 `std::cout`。

例如:

```cpp
#include <iostream>

int main() {
    int a = 0;
    std::cin >> a; // 读入 a
    std::cout << a << std::endl; // 输出 a
}
```

这里的 `std` 是 `namespace` (命名空间), 用来将代码组织到逻辑组中, 同时防止函数变量等的重名。

> 不要随意的 `using namespace std;`，而应按需使用具体的 `using std::string;` 等

## STL

`STL` 提供了非常丰富的各种容器和算法的模板标准库。

参考 https://www.runoob.com/cplusplus/cpp-stl-tutorial.html

STL (Standard Template Library), 意为标准模板库, 核心包含容器, 算法和迭代器. 本次实验主要需要两个容器的 API, 分别是

- `std::unordered_map`: 哈希表: https://cplusplus.com/reference/unordered_map/unordered_map/
- `std::vector`: 动态数组: https://cplusplus.com/reference/vector/vector/

## C++ string

C 对于 `string` 提供的 API 很少, 也不太好用, 因此 C++ 提供了 `std::string` 这个类, 具体的 API 可以看 https://cplusplus.com/reference/string/string/。

常用方法的诸如:

`length`: 返回字符串长度。

`push_back(c)`: 在字符串末尾添加一个字符 `c`。

`append(str)`: 在字符串末尾添加字符串 `str` 。

`substr`: 取子串。

`find`: 在字符串中进行查找。

## 面向对象简介

C++ 是一门面向对象的语言, 对象指的是类 (class) 的实例 (instance), 把对象的数据和操作封装到一起。

在 C 中操作称为函数, C++ 里类中的函数称为方法 (method)。

```cpp
class A {
  public:
    std::string get_name() { return name_; };
    void set_name(std::string &name) { name_ = name; };

  private:
    std::string name_;
};
```

`A` 是一个 class。相当于声明了一个 `A` 类型。上面的类声明意思为：`A` 类型有私有变量 `name_` 和两个可以公开调用的方法 `get_name` 和 `set_name`。

对比结构体，一个区别是，如果一个变量被声明在 `private` 下，那么只能通过类的方法来访问它，而不能像结构体一样直接访问。

```cpp
int main() {
    A a;
    std::string a_name = "xiaoming";
    a.set_name(a_name);
    std::cout << a.get_name();
    // std::cout << a.name_; 私有变量直接访问会出错
}
```

这里就是实例化了 `A` 类的一个对象 `a`，并设置了它的属性，再打印。

类的方法的声明和实现可以分离。

```cpp
class A {
  public:
    std::string get_name();
    void set_name(std::string &name);

  private:
    std::string name_;
};

std::string A::get_name() { return name_; }

void A::set_name(std::string &name) { name_ = name; }
```

## Auto keyword

参考 https://learn.microsoft.com/zh-cn/cpp/cpp/auto-cpp?view=msvc-170

当变量类型已知时，可以用 auto 简化变量声明。

例如：

```cpp
std::tuple<std::string, unsigned, bool> foo() {
    ......
};

int main() {
    auto result = foo();
}
```

可以看到，`result` 的类型很复杂（这里我们不用关心它具体类型是什么），但是是确定的。这个时候我们就可以使用 `auto` 来简化变量类型的声明。

`auto` 初始化表达式可以采用多种形式：

- 通用初始化语法, 例如 `auto a { 42 };`
- 赋值语法, 例如 `auto b = 0;`
- 通用赋值语法, 它结合了上述两种形式, 例如 `auto c = { 3.14156 };`
- 直接初始化或构造函数样式的语法, 例如 `auto d( 1.41421f );`

## C++11 迭代器遍历

语法:

```cpp
for (元素类型 元素变量 : 可迭代的元素) {
    循环体
}
```

例如:

```cpp
int a[] = { 1, 1, 4, 5, 1, 4};
for (int i : a) {
    std::cout << it << ",";
}

// 输出：1,1,4,5,1,4,
```

跟 Python 的 for 循环很像。