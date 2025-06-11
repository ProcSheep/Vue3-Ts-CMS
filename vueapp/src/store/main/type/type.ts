/** 用户表 */
export interface IUserList {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: Date;
  updateAt: Date;
}

export interface ISystemStore {
  userList: IUserList[],
  userTotalCount: number,

  pageList: any[],
  pageTotalCount: number
}


/** 角色表 */
export interface RoleList {
  id: number;
  name: string;
  intro: string;
  createAt: Date;
  updateAt: Date;
  menuList: MenuList[];
}

export interface MenuList {
  id: number;
  name: string;
  type: number;
  url: string;
  icon?: string;
  sort: number;
  children: MenuList[] | null;
  parentId?: number;
}


/** 部门表 */
export interface DepartmentList {
  id: number;
  name: string;
  parentId: number;
  createAt: Date;
  updateAt: Date;
  leader: string;
}


