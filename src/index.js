import DynamicForm from './lib';
import mockData from './mockData'

export default DynamicForm;
const save1 = (data) => {
  console.log(data)
};
const save2 = (data) => {
  console.log(data)
};
const dynamicForm = new DynamicForm('app', save1, save2);


// 获取值后设置值
setTimeout(() => {
  dynamicForm.getTableData(mockData);
  // dynamicForm.previewHandle();
}, 200);

dynamicForm.getDataList([]);
