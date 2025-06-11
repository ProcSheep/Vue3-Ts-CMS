import { getEntireRoles,getEntireDepartments } from "@/service/main/main";
import { defineStore } from "pinia";
import type { DepartmentList, RoleList } from "./type/type";

interface IMainState{
  entireRoles: RoleList[],
  entireDepartments: DepartmentList[]
}

export const useMainStore = defineStore('main', {
  state: ():IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions:{
    async fetchEntireDataAction(){
      // 分别拿角色表和部门表的数据
      const rolesResponse = await getEntireRoles()
      const rolesResult = rolesResponse.data.list
      const departmentsResponse = await getEntireDepartments()
      const departmentsResult = departmentsResponse.data.list
      // 保存数据
      this.entireRoles = rolesResult
      this.entireDepartments = departmentsResult
    }
  }
})