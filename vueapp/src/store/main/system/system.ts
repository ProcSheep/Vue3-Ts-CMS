import { postUsersListData } from "@/service/main/system/system";
import { defineStore } from "pinia";
import type { ISystemStore } from "../type/type";

export const useSystemStore = defineStore('system', {
  state: ():ISystemStore => ({
    userList: [],
    userTotalCount: 0
  }),
  actions:{
    async postUserListAction(){
      const userListResult = await postUsersListData()
      const {list,totalCount} = userListResult.data
      this.userList = list
      this.userTotalCount = totalCount
    }
  }
})


