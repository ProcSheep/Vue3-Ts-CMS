import { getEntireRoles,getEntireDepartments, getEntireMenus } from "@/service/main/main";
import { defineStore } from "pinia";
import type { DepartmentList, RoleList } from "./type/type";

interface IMainState{
  entireRoles: RoleList[],
  entireDepartments: DepartmentList[],
  entireMenus: any[] // 懒得写了
}

export const useMainStore = defineStore('main', {
  state: ():IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions:{
    async fetchEntireDataAction(){
      // 分别拿角色表和部门表的数据
      const rolesResult = await getEntireRoles()
      const departmentsResult = await getEntireDepartments()
      const menusResult = await getEntireMenus()
      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsResult.data.list
      this.entireMenus = menusResult.data.list
    }
  }
})