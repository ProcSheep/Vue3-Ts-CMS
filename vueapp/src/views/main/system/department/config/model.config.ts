const modelConfig = {
  pageName: 'department',
  header: {
    newTitle: "新建部门",
    editTitle: "编辑部门",
  },
  formItems: [
    { type: "input", label: "部门名称", prop: "name", placeholder: "请输入部门名称" },
    { type: "input", label: "部门领导", prop: "leader", placeholder: "请输入部门领导" },
    {
      type: "select", label: "上级部门", prop: "parentId", placeholder: "请输入上级部门",
      options: [
        // 这里的数据不是写死的,而是服务器发送过来的
        // { label: "财务部", value:"111" },
        // { label: "保安部", value:"222" },
      ] as any[] // 默认类型推导这是个never类型,这是不对的
    }
  ]
}

export default modelConfig


