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
  mode: 'edit'
});
setTimeout(()=>{
  dynamicForm.getTableData(mockData);
},1000);
// dynamicForm.previewHandle();
