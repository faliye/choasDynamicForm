import DynamicForm from './lib';

export default DynamicForm;
const save1 = (data) => {
  console.log(data)
};
const save2 = (data) => {
  console.log(data)
};
const dynamicForm = new DynamicForm('app', save1, save2);


const data = [
  [
    {
      "tag": "td",
      "insertType": "col",
      "colSpan": 1,
      "rowSpan": 1,
      "location": [0, 0],
      "isHidden": 0,
      "isEmpty": 0,
      "isError": 0,
      "style": {},
      "parentTdNode": [],
      "childrenTdNode": [],
      "childrenProps": {
        "tagName": "TitleBox",
        "keyName": "",
        "cnName": "A",
        "isSearch": 1,
        "value": "",
        "placeholder": "",
        "style": {
          textAlign: 'center',
          alignItems: 'center'
        },
        "dataListId": "",
        "isMultiple": 0,
        "validate": []
      }
    },
    {
      "tag": "td",
      "insertType": "col",
      "colSpan": 1,
      "rowSpan": 1,
      "location": [0, 1],
      "isHidden": 0,
      "isEmpty": 0,
      "isError": 0,
      "style": {},
      "parentTdNode": [],
      "childrenTdNode": [],
      "childrenProps": {
        "tagName": "TitleBox",
        "keyName": "",
        "cnName": "A",
        "isSearch": 1,
        "value": "",
        "placeholder": "",
        "style": {},
        "dataListId": ""
        , "isMultiple": 0,
        "validate": []
      }
    },
    {
      "tag": "td",
      "insertType": "col",
      "colSpan": 1,
      "rowSpan": 1,
      "location": [0, 2],
      "isHidden": 0,
      "isEmpty": 0,
      "isError": 0,
      "style": {},
      "parentTdNode": [],
      "childrenTdNode": [],
      "childrenProps": {
        "tagName": "TitleBox",
        "keyName": "",
        "cnName": "A",
        "isSearch": 1,
        "value": "",
        "placeholder": "",
        "style": {},
        "dataListId": "",
        "isMultiple": 0,
        "validate": []
      }
    },
    {
      "tag": "td",
      "insertType": "col",
      "colSpan": 1,
      "rowSpan": 1,
      "location": [0, 3],
      "isHidden": 0,
      "isEmpty": 0,
      "isError": 0,
      "style": {},
      "parentTdNode": [],
      "childrenTdNode": [],
      "childrenProps": {
        "tagName": "TitleBox",
        "keyName": "",
        "cnName": "B",
        "isSearch": 1,
        "value": "",
        "placeholder": "",
        "style": {},
        "dataListId": "",
        "isMultiple": 0,
        "validate": []
      }
    }
  ]
];
// 获取值后设置值
setTimeout(() => {
  dynamicForm.getTableData(data);
  // dynamicForm.previewHandle();
}, 200);

dynamicForm.getDataList([]);
