// 和html页面结构对应 (相似页面的配置互相拷贝即可)
const searchConfig = {
  formItems: [
    {
      type: "input",
      prop: "name",
      label: "角色名称",
      placeholder: "请输入角色名称"
    },
    {
      type: "input",
      prop: "leader",
      label: "权限介绍",
      placeholder: "请输入权限介绍"
    },
    {
      type: "date-picker",
      prop: "createAt",
      label: "创建时间"
    }
  ]
}

export default searchConfig