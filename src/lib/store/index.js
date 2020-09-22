const store = {
  col: 0,
  maxInCol: 0,
  row: 0,
  data: [],
  backupData: [], // 十步撤销备份
  isBackupData: false, // 备份数据
  backupDataStep: 0, // 撤回步
  selectStart: [0, 0], // 起始坐标
  selectEnd: [0, 0], // 终止坐标
  datalist: [], // 列表
};

export default store;
