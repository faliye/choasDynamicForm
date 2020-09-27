import DynamicForm from './lib';
import mockData from './mockData'

const save1 = (data) => {
  console.log(data)
};
const save2 = (data) => {
  console.log(data)
};


sessionStorage.setItem('accessToken', 'e99ea9ed6ef329642e7df3d53c2b3247');
sessionStorage.setItem('userInfo', '{"id":"3ecb9178ba2e4b32ade5eff9ee04398c","company":{"id":"af1206f815b2472fb9014475754d6e08","name":"省生态环境厅"},"office":{"id":"03c688ca67154de1bd1aa787a842b8ab","company":{"id":"af1206f815b2472fb9014475754d6e08","name":"省生态环境厅"},"parent":{"id":"ad657db5f9444d92b97cc6330735acab","name":"甘肃省生态环境厅（甘肃省核安全局）"},"parentIds":"0,ad657db5f9444d92b97cc6330735acab,","area":{"id":"620100000000","name":"兰州市","code":"620100000000"},"name":"兰州市生态环境局","code":"620100000000","shortName":"兰州市生态环境局","cancelFlag":"0","createBy":"3ecb9178ba2e4b32ade5eff9ee04398c","createDate":"2020-05-27 15:14:27","updateBy":"3ecb9178ba2e4b32ade5eff9ee04398c","updateDate":"2020-05-30 18:41:18","delFlag":"0"},"name":"hb001","loginName":"hb001","phone":"18702876538","mobile":"18702876536","roleList":[{"userId":"3ecb9178ba2e4b32ade5eff9ee04398c","roleId":"c64e95508f7e4ad28329d2a9334658f2"},{"userId":"3ecb9178ba2e4b32ade5eff9ee04398c","roleId":"c102567fc80d4d7784f04ff929519ae4"}],"roles":[{"id":"c102567fc80d4d7784f04ff929519ae4","name":"单位管理员","enname":"companyAdmin"},{"id":"c64e95508f7e4ad28329d2a9334658f2","name":"市权限","enname":"sqx"}],"areaCode":"620100000000","areaParentCode":"620000000000","indentifyCode":"18702876536","sortIndex":0,"userSex":"1"}');



const dynamicForm = new DynamicForm({
  mountId: '#app',
  saveDraftHandle: save1,
  saveFileHandle: save2,
});
setTimeout(()=>{
  dynamicForm.getTableData(mockData);
// dynamicForm.previewHandle();

},1000);


// setTimeout(()=>{
//   dynamicForm.getData(console.log)
// },15000)
