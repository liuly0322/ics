import type { Plugin, UserConfigExport } from 'vite'
import { SearchPlugin } from 'vitepress-plugin-search'

const SearchOptions = {
  encode: false,
  tokenize: 'full',
}

// https://github.com/vuejs/vitepress/discussions/1015#discussioncomment-3177860
const NavLinkPatch = (): Plugin => ({
  name: 'override-target-blank',
  enforce: 'pre',
  transform: (code, id) => {
    if (id.endsWith('VPLink.vue'))
      return code.replace('_blank', '_self')
  },
})

export default (): UserConfigExport => {
  return {
    plugins: [NavLinkPatch(), SearchPlugin(SearchOptions)],
    optimizeDeps: {
      exclude: ['vitepress'],
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset')
                  atRule.remove()
              },
            },
          },
        ],
      },
    },
  }
}
