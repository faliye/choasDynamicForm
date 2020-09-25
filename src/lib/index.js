import _ from 'lodash';
import $ from 'jquery';
import theme from "./theme";
import createLeftNav from "./layout/leftNav";
import createRightTable from "./layout/rightNav";
import createMidBox from "./layout/midBox";
import mainEvent from "./mainEvent";
import {TdBoxClass, ChildrenProps, defaultTimeValidate, defaultValidate} from "./config/componentApiConfig";
import {$createElement as h, computedTdStyle, deleteFn, calcSelectHeight, calcSelectWidth} from "./utils";
import {Modal} from "./components/modal";
import {
  createKeyBox,
  createFontSizeBox,
  createDataType,
  selectSourceBox,
  createValidateBox,
  createDatepicker
} from "./layout/rightNav/components";
import './index.scss';
import previewModal from "./layout/preview";

class DynamicForm {
  constructor(initConfig = {}, themeConfig = {}) {
    const {mountId, saveDraftHandle, saveFileHandle, mode = 'design'} = initConfig;
    this.$mountDOM = $(mountId);
    this.setMountDOMCss();
    this.mode = mode;
    if (this.mode === 'design') {
      this.isSelectArea = false; // table选区是否可拖动
      this.saveDraftHandle = saveDraftHandle;
      this.saveFileHandle = saveFileHandle;
    }
    this.themeConfig = _.merge(theme, themeConfig);
    this.initTask();
  }


  // 预览
  previewHandle() {
    mainEvent.emit('preview')
  }

  // 检测数据结构
  checkData(data) {
    const {data: storeData} = mainEvent.store;
    for (let j = 0; j < data.length; j++) {
      for (let i = 0; i < data[j].length; i++) {
        const targetData = storeData[j][i];
        if (targetData.childrenTdNode.length) {
          if (!targetData.childrenProps.keyName) {
            targetData.isError = 1;
            new Modal('请注意!', '关联字段名只能为英文字母及下划线!').show();
            mainEvent.emit('dataChange', storeData);
            mainEvent.emit('selectStartChange', targetData.location);
            return false;
          }
          if (!targetData.childrenProps.cnName) {
            targetData.isError = 1;
            new Modal('请注意!', '字段标题不能为空!').show();
            mainEvent.emit('dataChange', storeData);
            mainEvent.emit('selectStartChange', targetData.location);
            return false;
          }
          const childrenData = data[targetData.childrenTdNode[0]][targetData.childrenTdNode[1]];
          const childrenPropsTagName = _.get(childrenData.childrenProps, 'tagName', '');
          if (['Select', 'Radio', 'Checkbox'].includes(childrenPropsTagName)) {
            if (!childrenData.childrenProps.dataListId) {
              childrenData.isError = 1;
              new Modal('请注意!', '选列表不能为空!').show();
              mainEvent.emit('dataChange', storeData);
              mainEvent.emit('selectStartChange', targetData.location);
              return false;
            }
          }
          if (['Input'].includes(childrenPropsTagName)) {
            if (!childrenData.childrenProps.dataType) {
              new Modal('请注意!', '未选择数据类型!').show();
              mainEvent.emit('dataChange', storeData);
              mainEvent.emit('selectStartChange', targetData.location);
              return false;
            }
          }
        }
        if (!targetData.isEmpty && !targetData.childrenTdNode.length && !targetData.parentTdNode.length) {
          if (!targetData.childrenProps.cnName) {
            new Modal('请注意!', '标题不能为空!').show();
            mainEvent.emit('dataChange', storeData);
            mainEvent.emit('selectStartChange', targetData.location);
            targetData.isError = 1;
            return false;
          }
        }
        targetData.isError = 0;
        mainEvent.emit('dataChange', storeData);
      }

    }

    return true
  }

  // 简化输出
  simpleData(storeData) {
    // 输出表单JSON
    const res = _.cloneDeep(storeData);
    let line = 0;
    for (let i = res.length - 1; i >= 0; --i) {
      const item = res[i];
      if (item.some(it => !it.isEmpty || it.isHidden)) {
        line = i + 1;
        break;
      }
    }
    res.splice(line);
    let maxCol = 0;
    for (let i = res.length - 1; i >= 0; --i) {
      const item = res[i];
      const index = item.findIndex(it => it.isEmpty && !it.isHidden && it.tag === 'td');
      if (maxCol < index) {
        maxCol = index
      }
    }
    res.forEach(item => item.splice(maxCol + 1, item.length));
    return res.filter(Boolean);
  }

  // 向表格中插入元素
  insertTable(data) {
    const {selectEnd, data: storeData, col} = mainEvent.store;
    const {componentName: tag, type} = data;
    // 在已有的元素上再次插入 视为创建子表 子表会扩展父表的跨行和跨列
    const targetTd = storeData[selectEnd[0]][selectEnd[1]];

    if (!targetTd.isEmpty) {
      const modal = new Modal('警告', '该行已有元素，请删除后再添加!');
      modal.show();
      return
    }
    const colSpan = storeData[selectEnd[0]][selectEnd[1]].colSpan - 1;
    const rowSpan = storeData[selectEnd[0]][selectEnd[1]].rowSpan - 1;
    if (type === 'row') {
      if (storeData[selectEnd[0]][selectEnd[1] + 1 + colSpan] && storeData[selectEnd[0]][selectEnd[1] + 1 + colSpan].isHidden) {
        const modal = new Modal('警告', '右方单元格被合并,不可添加！');
        modal.show();
        return
      }
      if (storeData[selectEnd[0]][selectEnd[1] + 1 + colSpan] && !storeData[selectEnd[0]][selectEnd[1] + 1 + colSpan].isEmpty) {
        const modal = new Modal('警告', '当前单元格下一行已有元素，请删除后再添加!');
        modal.show();
        return
      }
      // 如果添加点在尾行  自动向后延伸一列 添加
      if (!storeData[selectEnd[0]][selectEnd[1] + 1 + colSpan]) {
        // 向后添加新的一列td
        storeData.forEach((item, j) => {
          for (let i = 0; i < 1; ++i) {
            item.push(new TdBoxClass({
              location: [j, selectEnd[1] + 1 + colSpan],
            }));
          }
        });
        mainEvent.store.col++;
      }
    }
    if (type === 'col') {
      if (storeData[selectEnd[0] + 1 + rowSpan] && storeData[selectEnd[0] + 1 + rowSpan][selectEnd[1]].isHidden) {
        const modal = new Modal('警告', '下方单元格被合并,不可添加!');
        modal.show();
        return
      }
      if (storeData[selectEnd[0] + 1 + rowSpan] && !storeData[selectEnd[0] + 1 + rowSpan][selectEnd[1]].isEmpty) {
        const modal = new Modal('警告', '当前单元格下一列已有元素,请删除后再添加!');
        modal.show();
        return
      }
      if (!storeData[selectEnd[0] + 1 + rowSpan]) {
        // 向后添加新的一行td
        storeData[selectEnd[0] + 1 + rowSpan] = [];
        for (let i = 0; i < col; ++i) {
          storeData[selectEnd[0] + 1 + rowSpan].push(new TdBoxClass({
            location: [selectEnd[0] + 1 + rowSpan, i],
          }));
        }
        mainEvent.store.row++;
      }
    }

    targetTd.isEmpty = 0;
    targetTd.insertType = type;
    targetTd.childrenProps = new ChildrenProps({
      tagName: 'TitleBox',
    });
    if (tag !== 'TitleBox') {
      let nextTd = storeData[selectEnd[0]][selectEnd[1] + 1 + colSpan];
      targetTd.childrenTdNode = [selectEnd[0], selectEnd[1] + 1 + colSpan];
      if (type === 'col') {
        nextTd = storeData[selectEnd[0] + 1 + rowSpan][selectEnd[1]];
        targetTd.childrenTdNode = [selectEnd[0] + 1 + rowSpan, selectEnd[1]];
      }
      nextTd.isEmpty = 0;
      nextTd.insertType = type;
      nextTd.parentTdNode = selectEnd;
      const params = {
        tagName: tag,
      };
      if (tag === 'Datepicker') {
        params.timeValidate = defaultTimeValidate;
        params.value = new Date().toLocaleDateString().replace(/\//g, '-');
      }
      if (!['Select', 'Radio', 'Checkbox'].includes(tag)) {
        params.validate = defaultValidate
      }
      nextTd.childrenProps = new ChildrenProps(params);
    }
    mainEvent.emit('selectStartChange', selectEnd);
    mainEvent.emit('dataChange', storeData);
    mainEvent.emit('backupData', storeData);
  }

  // 插入元素
  splitTableTd() {
    const {data} = this.splitFnc(mainEvent.store);
    mainEvent.emit('dataChange', data);
    mainEvent.emit('backupData', data);
  }

  // 公共拆分函数
  splitFnc(store) {
    const {data, selectStart, selectEnd} = store;
    if (selectEnd[1] < selectStart[1] || selectEnd[0] < selectEnd[0]) {
      return;
    }
    let sign = false;
    for (let j = selectStart[0]; j <= selectEnd[0]; ++j) {
      for (let i = selectStart[1]; i <= selectEnd[1]; ++i) {
        if (data[j][i].colSpan > 1 || data[j][i].rowSpan > 1) {
          // 记录折叠区信息
          sign = true;
          const y = j + data[j][i].rowSpan;
          const x = i + data[j][i].colSpan;
          for (let m = j; m < y; ++m) {
            for (let n = i; n < x; ++n) {
              data[m][n].colSpan = 1;
              data[m][n].rowSpan = 1;
              delete data[m][n].isHidden;
            }
          }
        }
      }
    }
    return {data, sign};
  }

  renderTabBox(index) {
    const rightBtn = $('.right-tab-btn');
    rightBtn.removeClass('active');
    this.tabBox.html('');
    const {selectEnd, data} = mainEvent.store;
    // 获得目标
    let targetData = data[selectEnd[0]][selectEnd[1]] || [];
    let virDOM = [];
    if (index === 0) {
      rightBtn.eq(index).addClass('active');
      // 子项
      if (!targetData.isEmpty) {
        if (targetData.childrenTdNode.length) {
          virDOM.push(createKeyBox(targetData, this.themeConfig))
        }
        virDOM.push(createFontSizeBox(targetData, this.themeConfig))
      }

    }
    if (index === 1) {
      // 显示组件
      rightBtn.eq(index).addClass('active');
      if (!targetData.isEmpty) {
        if (targetData.childrenProps.tagName === 'Input') {
          virDOM.push(createDataType(targetData, this.themeConfig))
        }
        if (['Select', 'Radio', 'Checkbox'].includes(targetData.childrenProps.tagName)) {
          virDOM.push(selectSourceBox(targetData, this.themeConfig))
        } else {
          if (['Datepicker'].includes(targetData.childrenProps.tagName)) {
            virDOM.push(createDatepicker(targetData, this.themeConfig))
          } else {
            virDOM.push(createValidateBox(targetData, this.themeConfig))
          }
        }
      }
    }
    $(this.tabBox).append(...virDOM);
  }

  // 合并单元格
  mergeTableTd() {
    const {selectStart, selectEnd} = mainEvent.store;
    if (selectEnd[1] < selectStart[1] || selectEnd[0] < selectEnd[0]) {
      return;
    }
    const {data, sign} = this.splitFnc(mainEvent.store);
    if (sign) {
      mainEvent.emit('dataChange', data);
      mainEvent.emit('backupData', data);
      return;
    }
    const mergeCol = selectEnd[1] - selectStart[1] + 1;
    const mergeRow = selectEnd[0] - selectStart[0] + 1;
    // 合并单元格
    for (let j = selectStart[0]; j <= selectEnd[0]; ++j) {
      for (let i = selectStart[1]; i <= selectEnd[1]; ++i) {
        if (j === selectStart[0] && i === selectStart[1]) {
          data[j][i].colSpan = mergeCol;
          data[j][i].rowSpan = mergeRow;
          delete data[j][i].isHidden;
        } else {
          // 逐行移除数据
          data[j][i].childrenProps = {};
          data[j][i].isEmpty = 1;
          data[j][i].isError = 0;
          data[j][i].colSpan = 0;
          data[j][i].rowSpan = 0;
          data[j][i].isHidden = 1;
          data[j][i].parentTdNode = [];
          data[j][i].childrenTdNode = [];
        }
      }
    }
    mainEvent.emit('dataChange', data);
    mainEvent.emit('backupData', data);
    mainEvent.emit('selectStartChange', selectStart);
    mainEvent.emit('selectEndChange', selectStart);
  }

  // 渲染子节点
  renderTd(tdData) {
    const {
      insertType,
      rowSpan,
      colSpan,
      location = [],
      isHidden = 0,
      isEmpty = 1,
      isError = 0,
      props = {},
      parentTdNode = [],
      childrenTdNode = [],
      childrenProps = {},
    } = tdData;
    const {mode: themeMode} = this.themeConfig;
    const {danger, background} = this.themeConfig.colorConfig[themeMode];

    const deleteI = h('i',
        {
          className: ['iconfont', 'icon-shanchu', 'td-controllers', 'td-controllers-del'],
          style: {
            color: danger,
            background,
            fontSize: '18px',
            width: '24px',
            height: '24px',
            top: '-12px',
            right: '5px',
            borderRadius: '100%',
          },
          on: {
            click: (e) => {
              const {data, selectStart, selectEnd} = mainEvent.store;
              // 目标在选区中 删除选区
              if (_.inRange(location[0], selectStart[0], selectEnd[0] + 1) && _.inRange(location[1], selectStart[1], selectEnd[1] + 1)) {
                deleteFn(data, selectStart, selectEnd);
              } else {
                deleteFn(data, location, location);
              }
              mainEvent.emit('dataChange', data);
              mainEvent.emit('backupData', data);
              e.stopPropagation();
              e.preventDefault();
              return false
            },
            mousedown: (e) => {
              e.stopPropagation();
              e.preventDefault();
              return false
            }
          }
        }
    );
    const style = computedTdStyle(tdData, this.themeConfig);
    const td = h('td',
        {
          id: 'td-' + location.join('-'),
          className: ['td-div'],
          rowSpan,
          colSpan,
          isHidden,
          isError,
          props,
          style: {
            display: isHidden ? 'none' : 'cell',
            background: isError? danger: 'transparent',
          },
          on: {
            mousedown: () => {
              mainEvent.emit('selectStartChange', location);
            },
            mouseenter: () => {
              if (this.isSelectArea || this.isAddSelectedArea) {
                this.$table.css({
                  cursor: 'cell'
                });
                mainEvent.emit('selectEndChange', location);
              } else {
                // 显示图标
                $(deleteI).css({
                  display: 'block'
                })
              }
            },
            mousemove: () => {
              const ele = $(td);
              if (this.isSelectArea || this.isAddSelectedArea) {
                _.debounce(() => {
                  if (($(this.mountDOM).width() - this.themeConfig.sizeConfig.leftWidth - this.themeConfig.sizeConfig.rightWidth) < ele.offset().left) {
                    const midBoxBottom = $('.mid-box-bottom').eq(0);
                    const scrollLeft = midBoxBottom.scrollLeft();
                    midBoxBottom.scrollLeft(scrollLeft + ele.width() / 8)
                  }
                }, 10)()
              }
            },
            mouseleave: () => {
              $(deleteI).css({
                display: 'none'
              })
            }
          }
        },
        [
          h('div',
              {
                className: ['td-content-wrap'],
                style: {
                  width: style.width,
                  height: style.height
                }
              },
              [
                isEmpty ? null : h(childrenProps.tagName, {
                  props: {
                    parentTdNode,
                    location,
                    childrenTdNode,
                    insertType,
                    ...childrenProps
                  },
                  themeConfig: this.themeConfig,
                  mode: this.mode,
                }),
              ]
          ),
          isEmpty ? null : deleteI,
        ]
    );
    return td;
  }

  // 更新表单
  updateTable(all = false) {
    // 全更新
    if (all) {
      this.$table.html('');
      const {data} = mainEvent.store;
      data.forEach((trData, j) => {
        const tr = $('<tr></tr>');
        trData.forEach((tdData) => {
          tr.append(this.renderTd(tdData));
        });
        this.$table.append(tr);
      });
    } else {
      // diff
    }
  }


  // 获取表格值
  getTableData(data = []) {
    const dataCol = (data[0] || []).length;
    const dataRow = (data || []).length || 0;
    const formData = data || [];
    let {col, row} = mainEvent.store;
    // 设计模式填充单元格
    if (this.mode === 'design') {
      if (col < dataCol) {
        col = dataCol;
      }
      if (row < dataRow) {
        row = dataRow;
      }
    } else {
      // 编辑模式
      col = dataCol;
      row = dataRow;
    }
    mainEvent.store.row = row;
    mainEvent.store.col = col;
    const {tdInitWidth, tdInitHeight} = this.themeConfig.sizeConfig;
    this.$table.parent().css({
      minWidth: col * (tdInitWidth),
      minHeight: row * (tdInitHeight),
    });
    for (let j = 0; formData.length < row; ++j) {
      formData[j] = formData[j] || [];
      for (let i = formData[j].length; formData[j].length < col; ++i) {
        formData[j].push(new TdBoxClass({
          location: [j, i],
        }));
      }
    }
    mainEvent.emit('dataChange', formData);
    mainEvent.emit('backupData', formData);
    mainEvent.emit('selectStartChange', [0, 0]);
  }

  updateSelectedArea() {
    const {selectStart, selectEnd} = mainEvent.store;
    if (selectEnd[1] < selectStart[1] || selectEnd[0] < selectEnd[0]) {
      return;
    }
    const startEle = $('#td-' + selectStart.join('-'));
    let {left, top} = startEle.position();
    let width = calcSelectWidth(selectStart, selectEnd);
    let height = calcSelectHeight(selectStart, selectEnd);
    const selectedArea = $('.selected-div');
    this.addSelectedArea = $('.add-selected-area');
    selectedArea.css({
      width,
      height,
      top: top,
      left: left,
    });
    this.addSelectedArea.css({
      top: top + height - 4,
      left: left + width - 4,
    });
  }


  // 注册事件
  registerEvent() {
    mainEvent.on('dataChange', (data) => {
      mainEvent.store.data = data;
      this.updateTable(true);
    });
    // 备份数据
    mainEvent.on('backupData', (data) => {
      if (mainEvent.store.backupData.length > 10) {
        mainEvent.store.backupData.shift();
      }
      mainEvent.store.backupData.push(_.cloneDeep(data));
      mainEvent.store.backupDataStep = mainEvent.store.backupData.length - 1;
    });
    // 设计模式 记录选区 表单起点选定
    if (this.mode === 'design') {
      // 选定单元格
      mainEvent.on('selectStartChange', (data) => {
        mainEvent.store.selectStart = data.map((item) => parseInt(item, 10));
        mainEvent.store.selectEnd = data.map((item) => parseInt(item, 10));
        this.updateSelectedArea();
        const targetData = mainEvent.store.data[data[0]][data[1]] || {};
        const {parentTdNode = [], isEmpty = 1} = targetData;
        if (parentTdNode.length) {
          return this.renderTabBox(1);
        }
        if (!isEmpty) {
          return this.renderTabBox(0);
        }
        this.renderTabBox(-1);
      });
      // 拖拽选区
      mainEvent.on('selectEndChange', (data) => {
        mainEvent.store.selectEnd = data.map((item) => parseInt(item, 10));
        this.updateSelectedArea();
      });
      // 合并表单
      mainEvent.on('formMerge', () => {
        this.mergeTableTd();
      });
      // 拆分表单
      mainEvent.on('splitForm', () => {
        this.splitTableTd();
      });
      // 撤销与恢复
      mainEvent.on('backupDataStepChange', (data) => {
        const {backupDataStep, backupData} = mainEvent.store;
        if (data < 0) {
          data = 0;
        }
        if (data > backupData.length - 1) {
          data = backupData.length - 1;
        }
        if (data !== backupDataStep) {
          mainEvent.store.backupDataStep = data;
          mainEvent.emit('dataChange', _.cloneDeep(backupData[data]));
        }
      });
      // 行变化
      mainEvent.on('colChange', () => {
        const {data: storeData, col, row} = mainEvent.store;
        storeData[row] = [];
        for (let i = 0; i < col; ++i) {
          storeData[row].push(new TdBoxClass({
            location: [row, i],
          }));
        }
        mainEvent.store.row++;
        mainEvent.emit('dataChange', storeData);
      });
      // 列变化
      mainEvent.on('rowChange', (data) => {
        const {data: storeData} = mainEvent.store;
        storeData.forEach((item, j) => {
          for (let i = 0; i < data; ++i) {
            item.push(new TdBoxClass({
              location: [j, item.length],
            }));
          }
        });
        mainEvent.store.col++;
        mainEvent.emit('dataChange', storeData);
      });
      // 切换列表
      mainEvent.on('toggleTab', () => {
        const {selectEnd, data: storeData} = mainEvent.store;
        // 切换tab时
        const targetData = storeData[selectEnd[0]][selectEnd[1]];
        if (!targetData.isEmpty) {
          if (targetData.childrenTdNode.length) {
            mainEvent.emit('selectStartChange', targetData.childrenTdNode);
            this.renderTabBox(1);
          }
          if (targetData.parentTdNode.length) {
            mainEvent.emit('selectStartChange', targetData.parentTdNode);
            this.renderTabBox(0);
          }
        }
      });
      // 添加数据
      mainEvent.on('addElement', (data) => {
        this.insertTable(data)
      });
      // 预览
      mainEvent.on('preview', () => {
        const {data: storeData} = mainEvent.store;
        const data = this.simpleData(storeData);
        if (!this.checkData(data)) {
          return
        }
        previewModal(this.$mountDOM, data, this.themeConfig); // 右侧选项卡
      });
      // 保存
      mainEvent.on('saveFileHandle', () => {
        if (_.isFunction(this.saveFileHandle)) {
          const {data: storeData} = mainEvent.store;
          const data = this.simpleData(storeData);
          if (!this.checkData(data)) {
            return
          }
          this.saveFileHandle(JSON.stringify(data));
        }
      });
      // 存草稿
      mainEvent.on('saveDraftHandle', () => {
        if (_.isFunction(this.saveDraftHandle)) {
          const {data: storeData} = mainEvent.store;
          const data = this.simpleData(storeData);
          if (!this.checkData(data)) {
            return
          }
          this.saveDraftHandle(JSON.stringify(data));
        }
      });
    }
  }

  // 初始化表格
  initTask() {
    this.createLayout();
    this.getCore$DOM();
    this.registerEvent();
    this.getTableData();
  }


  // 获取核心操作节点
  getCore$DOM() {
    this.$table = $('#dynamic-table');
    if (this.mode === 'design') {
      this.tabBox = $('.tab-box')
    }
    const {tdInitWidth, tdInitHeight} = this.themeConfig.sizeConfig;
    const initWidth = this.$table.parent().width();
    const initHeight = this.$table.parent().height();
    const col = (initWidth / (tdInitWidth + 2)).toFixed(0);
    const row = (initHeight / (tdInitHeight + 2)).toFixed(0);
    mainEvent.store.col = parseInt(col);
    mainEvent.store.row = parseInt(row);
    this.$table.attr({
      border: 0,
      cellSpacing: 0,
      cellPadding: 0,
      borderSpacing: 0,
    });
    // 设计模式下拖动
    if (this.mode === 'design') {
      this.$table.on('mousedown', (e) => {
        if (!e.button) {
          this.isSelectArea = true;
          this.$table.css({cursor: 'cell'});
        }
      }).on('mouseup mouseleave', () => {
        this.isSelectArea = false;
        this.$table.css({cursor: 'default'});
      });
      $(document).on('keydown', (e) => {
        if (e.key === 'Shift' && !e.ctrlKey) {
          this.isSelectArea = true;
          this.$table.css({cursor: 'cell'});
        }
      }).on('keyup', () => {
        this.isSelectArea = false;
        this.$table.css({cursor: 'default'});
      });
    }
  }

  // 创建基础骨架
  createLayout() {
    createLeftNav(this.$mountDOM, this.mode, this.themeConfig);
    createMidBox(this.$mountDOM, this.mode, this.themeConfig);
    createRightTable(this.$mountDOM, this.mode, this.themeConfig);
  }

  // 设置挂载节点
  setMountDOMCss() {
    if (!this.$mountDOM.length) {
      throw new Error('挂载节点不能为空!');
    }
    this.$mountDOM.css({
      display: 'flex',
      flexWrap: 'no-wrap',
    });
  }
}


export default DynamicForm;
