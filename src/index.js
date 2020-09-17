import DynamicForm from './lib';

export default DynamicForm;
const save1 = (data) => {
  console.log(data)
};
const save2 = (data) => {
  console.log(data)
};
const dynamicForm = new DynamicForm('app', save1, save2);


const data = [[{"tag":"td","insertType":"col","colSpan":1,"rowSpan":5,"location":[0,0],"isEmpty":0,"isError":0,"style":{},"parentTdNode":[],"childrenTdNode":[],"childrenProps":{"tagName":"TitleBox","keyName":"","cnName":"A","isSearch":1,"value":"","placeholder":"","style":{"textAlign":"center","alignItems":"center","borderTopStyle":"dotted","borderRightStyle":"dotted","borderBottomStyle":"dash","borderBottomWidth":"10","borderBottomColor":"#c03535","borderLeftColor":"#cc6161","borderRightWidth":"1","borderRightColor":"#ad3838","borderTopWidth":"6","borderTopColor":"#a92323"},"dataListId":"","isMultiple":0,"validate":[]}},{"tag":"td","insertType":"col","colSpan":1,"rowSpan":1,"location":[0,1],"isHidden":0,"isEmpty":0,"isError":0,"style":{},"parentTdNode":[],"childrenTdNode":[],"childrenProps":{"tagName":"TitleBox","keyName":"","cnName":"A","isSearch":1,"value":"","placeholder":"","style":{},"dataListId":"","isMultiple":0,"validate":[]}},{"tag":"td","insertType":"col","colSpan":1,"rowSpan":1,"location":[0,2],"isHidden":0,"isEmpty":0,"isError":0,"style":{},"parentTdNode":[],"childrenTdNode":[],"childrenProps":{"tagName":"TitleBox","keyName":"","cnName":"A","isSearch":1,"value":"","placeholder":"","style":{},"dataListId":"","isMultiple":0,"validate":[]}},{"tag":"td","insertType":"col","colSpan":1,"rowSpan":1,"location":[0,3],"isHidden":0,"isEmpty":0,"isError":0,"style":{},"parentTdNode":[],"childrenTdNode":[],"childrenProps":{"tagName":"TitleBox","keyName":"","cnName":"B","isSearch":1,"value":"","placeholder":"","style":{},"dataListId":"","isMultiple":0,"validate":[]}},{"tag":"td","insertType":"row","colSpan":1,"rowSpan":1,"location":[0,4],"isHidden":0,"isEmpty":1,"isError":0,"parentTdNode":[],"childrenTdNode":[],"childrenProps":{}},{"tag":"td","insertType":"row","colSpan":1,"rowSpan":1,"location":[0,5],"isHidden":0,"isEmpty":1,"isError":0,"parentTdNode":[],"childrenTdNode":[],"childrenProps":{}},{"tag":"td","insertType":"row","colSpan":1,"rowSpan":1,"location":[0,6],"isHidden":0,"isEmpty":1,"isError":0,"parentTdNode":[],"childrenTdNode":[],"childrenProps":{}},{"tag":"td","insertType":"row","colSpan":1,"rowSpan":1,"location":[0,7],"isHidden":0,"isEmpty":1,"isError":0,"parentTdNode":[],"childrenTdNode":[],"childrenProps":{}},{"tag":"td","insertType":"row","colSpan":1,"rowSpan":1,"location":[0,8],"isHidden":0,"isEmpty":1,"isError":0,"parentTdNode":[],"childrenTdNode":[],"childrenProps":{}},{"tag":"td","insertType":"row","colSpan":1,"rowSpan":1,"location":[0,9],"isHidden":0,"isEmpty":1,"isError":0,"parentTdNode":[],"childrenTdNode":[],"childrenProps":{}}]]
// 获取值后设置值
setTimeout(() => {
  dynamicForm.getTableData(data);
  // dynamicForm.previewHandle();
}, 200);

dynamicForm.getDataList([]);
