const contentConfig = {
  pageName: "menu",
  header: {
    title: "菜单列表",
    btnTitle: "新建菜单"
  },
  propsList: [
    // 组件使用config的时候,采用v-bind,所以type属性最终也会:type=XX的形式加入到组件中,但是table展开行的组件内部应该有type相关的数据设置,所以加type覆盖了组件内原有的设置后,组件会失效,失去展开行的能力,删除type:normal类也无所谓(v-else类,没有判定条件==="normal")
    { label: "菜单名称", prop: "name", width: "120px" },
    { label: "级别", prop: "type", width: "70px" },
    { label: "菜单url", prop: "url", width: "165px" },
    { label: "菜单icon", prop: "icon", width: "215px" },
    { label: "排序", prop: "sort", width: "70px" },
    { label: "权限", prop: "permission", width: "170px" },
    { type: "timer", label: "创建时间", prop: "createAt" },
    { type: "timer", label: "更新时间", prop: "updateAt" },
    { type: "handler", label: "操作", width: "150px" }
  ],
  childrenTree : {
    rowKey: 'id'
  },
  hasPagination: false
}

export default contentConfig