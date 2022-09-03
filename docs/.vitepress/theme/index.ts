import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'

import FightingDesign from 'fighting-design'
import 'fighting-design/dist/index.css'

const sakanaInit = async () => {
  const SakanaWidget = (await import('sakana-widget')).default

  const sakana = document.createElement('div')
  sakana.id = 'sakana'
  Object.assign(sakana.style, {
    position: 'fixed',
    right: '0',
    bottom: '0',
    zIndex: '20',
  })
  document.body.appendChild(sakana)

  const takina = SakanaWidget.getCharacter('takina')!
  takina.initialState = {
    ...takina.initialState,
    i: 0.001,
    d: 1,
  }
  SakanaWidget.registerCharacter('takina-slow', takina)
  new SakanaWidget({ character: 'takina-slow' }).mount('#sakana')
}

export default {
  ...DefaultTheme,
  setup() {
    onMounted(sakanaInit)
  },
  enhanceApp({ app }) {
    app.use(FightingDesign)
  },
}
