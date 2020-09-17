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


dynamicForm.getTableData(mockData);
dynamicForm.previewHandle();
