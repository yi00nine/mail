import { defineComponent, computed } from 'vue'
import styles from './styles.module.less'

import Navbar from './Navbar'
import MenuComponent from './menu'
import pageComponent from './pageComponent'
import tabComponent from './tabBar'
import { layoutStyleConfig } from '../types/constants'
import { useAppStore } from '@/store'
export default defineComponent({
  components: { pageComponent, tabComponent },
  setup() {
    const appStore = useAppStore()
    const paddingStyle = computed(() => {
      const paddingLeft = { paddingLeft: `${siderWidth.value}px` }
      const paddingTop = { paddingTop: layoutStyleConfig.navbarHeight + 'px' }

      return { ...paddingLeft, ...paddingTop }
    })
    const siderWidth = computed(() => {
      return appStore.menuCollapse ? 80 : appStore.menuWidth
    })
    return () => (
      <>
        <a-layout>
          <Navbar></Navbar>
          <a-layout>
            <a-layout-sider
              style={{
                paddingTop: paddingStyle.value.paddingTop
              }}
              class={styles.sider}
              width={siderWidth.value}
              v-model:collapsed={appStore.menuCollapse}
            >
              <MenuComponent></MenuComponent>
            </a-layout-sider>
            <a-layout style={paddingStyle.value} class={styles.main}>
              <tabComponent></tabComponent>
              <div>breadcrumb</div>
              <a-layout-content>
                <pageComponent></pageComponent>
              </a-layout-content>
              <div>footer</div>
            </a-layout>
          </a-layout>
        </a-layout>
      </>
    )
  }
})
