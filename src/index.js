import DynamicForm from './lib';
import mockData from './mockData'

const save1 = (data) => {
  console.log(data)
};
const save2 = (data) => {
  console.log(data)
};


const dynamicForm = new DynamicForm({
  mountId: '#app',
  saveDraftHandle: save1,
  saveFileHandle: save2,
});
setTimeout(()=>{
  dynamicForm.getTableData(mockData);
dynamicForm.previewHandle();
},1000);
