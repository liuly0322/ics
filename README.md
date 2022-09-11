# ICS FALL 2022 USTC CS1002A.03

## 说明

课程主页仓库

`docs/` 下的 md 文件即对应网站相应 url

对本仓库的修改会自动 push 到网页上, 欢迎 PR 和 Issue

LC3 评测使用 <https://github.com/wchargin/lc3web>, 参照原项目协议

其余使用 MIT 协议, 感谢第三方库

- Vitepress
- fighting-design
- sakana-widget
- ......

## 部署

> 环境准备：[Node.js](http://nodejs.cn/download/)（版本建议 v16 以上）

clone 本仓库

```
git clone --depth=1 -b main https://github.com/liuly0322/ics.git
cd ics  # 进入目录
```

安装 pnpm（已安装的可以跳过）

```
npm install pnpm -g
```

使用 pnpm 安装本项目所需依赖

```
pnpm install
```

浏览器预览

```
pnpm dev
```

生成静态文件

```
pnpm build
```
