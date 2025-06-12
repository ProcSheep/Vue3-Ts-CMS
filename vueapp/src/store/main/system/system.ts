import { deletePageById, deleteUserById, editPageData, editUserData, newPageData, newUserData, postPageListData, postUsersListData } from "@/service/main/system/system";
import { defineStore } from "pinia";
import type { ISystemStore } from "../type/type";

export const useSystemStore = defineStore('system', {
  state: (): ISystemStore => ({
    userList: [],
    userTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUsersListData(queryInfo)
      // console.log(userListResult)
      const { list, totalCount } = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    },

    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      // 重新请求一次数据并再次显示
      this.postUserListAction({ offset: 0, size: 10 })
    },

    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      console.log(newResult)
      // 重新请求一次数据并再次显示
      this.postUserListAction({ offset: 0, size: 10 })
    },

    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      // 重新请求一次数据并再次显示
      this.postUserListAction({ offset: 0, size: 10 })
    },


    /** ================================================================================ */
    /** 针对页面数据的网络请求: 增删改查 */
    // 后端返回的页面数据是很规范的

    // 请求页面数据
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount ?? 0 // 可能没有值(undefined),比如menu页
      // 后续^: 不过已经解决了,配置了hasPagination项,menu不渲染分页部分
    },

    // 删除页面数据: 先确定删除页面的名字,是删除部门还是用户还是其他的... ,然后再删除
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      // 重新请求一次数据并再次显示
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    // 新建页面数据: 同上
    async newPageDataAction(pageName: string, queryInfo: any) {
      const newResult = await newPageData(pageName, queryInfo)
      console.log(newResult)
      // 重新请求一次数据并再次显示
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    // 编辑页面数据: 同上
    async editPageDataAction(pageName: string, id:number, queryInfo: any) {
      const editResult = await editPageData(pageName ,id, queryInfo)
      console.log(editResult)
      // 重新请求一次数据并再次显示
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})


