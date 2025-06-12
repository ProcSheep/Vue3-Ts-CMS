import { ref } from "vue"
import type PageModel from '@/components/page-model/page-model.vue'

function usePageModel() {
  /** 点击model content内父子通信的操作 */
  const modelRef = ref<InstanceType<typeof PageModel>>()
  function handleNewClick() {
    modelRef.value?.setModelVisable()
  }
  function handleEditClick(itemData: any) {
    modelRef.value?.setModelVisable(false, itemData)
  }

  return {
    modelRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageModel