// 和html页面结构对应 (相似页面的配置互相拷贝即可)
const searchConfig = {
  formItems: [
    {
      type: "input",
      prop: "name",
      label: "部门名称",
      placeholder: "请输入查询部门名称"
    },
    {
      type: "input",
      prop: "leader",
      label: "部门领导",
      placeholder: "请输入查询部门领导名称"
    },
    {
      type: "date-picker",
      prop: "createAt",
      label: "创建时间"
    },
    // {
    //   type: "select",
    //   prop: "enable",
    //   label: "状态",
    //   placeholder: "请选择状态",
    //   options: [
    //     { label: "启用", value: 1},
    //     { label: "禁用", value: 0}
    //   ]
    // }
  ]
}


export default searchConfig