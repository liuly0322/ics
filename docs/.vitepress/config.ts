import { defineConfig } from 'vitepress'
import { nav } from './utils/nav'
import { sidebar } from './utils/sidebar'

/**
 * 参考：https://vitepress.vuejs.org/config/app-configs.html
 *
 * 修改这里需要重启项目才可以生效
 */

const config = defineConfig({
  title: 'ICS Fall 2022',
  description: 'USTC ICS CS1002A.02 Fall 2022 Homepage',
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '最后更新时间',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/liuly0322',
      },
    ],
    editLink: {
      pattern: 'https://github.com/liuly0322/ics/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页 ',
    },
    nav,
    sidebar,
  },
})

export default config
