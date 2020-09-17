import $ from 'jquery';
import _ from 'lodash'
import {
  addEvent,
  calcSelectHeight,
  calcSelectWidth,
  deepClone,
  deleteFn,
  judgeDataType
} from './utils';
import {$createElement as h} from './utils/$createElement';
import eventBus from './mainEvent';
import {ChildrenProps, defaultTimeValidate, defaultValidate, TdBoxClass,} from "./config/componentApiConfig";
import {Modal} from "./components/modal";
// TODO 字段  搜索框类型
import createLeftNav from './layout/leftNav';
import mountMidBox from './layout/midBox';
import previewModal from './layout/preview';
import mountRightBox from './layout/rightTab';
import {createBorderBox} from './layout/rightTab/borderBox';
import {createFontSizeBox} from './layout/rightTab/fontBox';
import {createDataType} from './layout/rightTab/dataType';
import {createKeyBox} from './layout/rightTab/keyBox';
import {createValidateBox} from './layout/rightTab/validateBox';
import {selectSourceBox} from './layout/rightTab/selectSourceBox';
import {createDatepicker} from './layout/rightTab/datepickerBox';

import './assets/iconFont/iconFont.scss';
import './index.scss';
import sizeConfig from './config/size.config';

const tablePaddingTop = sizeConfig.table.paddingTop;
const tablePaddingLeft = sizeConfig.table.paddingLeft;
const leftNavWidth = sizeConfig.leftNav.width;
const rightNaveWidth = sizeConfig.navRight.width;
const tdWidth = sizeConfig.midLeftTd.width;
const tdHeight = sizeConfig.midLeftTd.height;


class DynamicForm {
  constructor(mountId, saveDraftHandle, saveFileHandle, themeConfig) {
    this.mountDOM = document.getElementById(mountId);
    this.saveFileHandle = saveFileHandle;
    this.saveDraftHandle = saveDraftHandle;
    this.themeConfig = themeConfig || {};
    this.table = null; // 表格
    this.addSelectedArea = null; // 右下角拖动点
    this.tabBox = null; // 右侧切换区
    this.isSelectArea = false; // table选区是否可拖动
    this.isAddSelectedArea = false; //  右下角选区是否可拖动
    this.init(); // 初始化
  }

  init() {
    this.mountDOM.innerHTML = '';
    this.registerEvent(); // 注册事件
    createLeftNav(this.mountDOM, this.themeConfig);
    mountMidBox(this.mountDOM, this.themeConfig); // 创建中间DOM
    mountRightBox(this.mountDOM, this.themeConfig); // 右侧选项卡
    this.appendIconFontToBD(); // 添加字体样式
    this.addDOMEvent(); // 注册DOM事件
  }

  // 向DOM节点添加事件
  addDOMEvent() {
    this.table = $('#edit-table');
    $(document).on('keydown', (e) => {
      if (e.key === 'Shift' && !e.ctrlKey) {
        this.isSelectArea = true;
        this.table.css({
          cursor: 'cell'
        });
      }
    }).on('keyup', () => {
      this.isSelectArea = false;
      this.table.css({cursor: 'default'});
    });
    this.table.on('mousedown', (e) => {
      if (e.which === 1) {
        this.isSelectArea = true;
      }
    }).on('mouseup', () => {
      this.isSelectArea = false;
      this.isAddSelectedArea = false;
      this.table.css({cursor: 'default'});
    }).on('mouseleave', () => {
      this.isSelectArea = false;
      this.table.css({cursor: 'default'});
      this.isAddSelectedArea = false;
    });
    // 左下角拖动点
    this.addSelectedArea = $('.add-selected-area')[0];
    addEvent(this.addSelectedArea, 'mousedown', () => {
      this.isAddSelectedArea = true;
    });
    // 右侧切换区域
    this.tabBox = $('.tab-box')[0];
  }

  // 注册事件
  registerEvent() {
    // 改变数据
    eventBus.on('dataChange', (data) => {
      eventBus.store.data = data;
      this.upDateTable();
      this.updateSelectedArea();
    });
    // 备份数据
    eventBus.on('backupData', (data) => {
      if (eventBus.store.backupData.length > 10) {
        eventBus.store.backupData.shift();
      }
      eventBus.store.backupData.push(deepClone(data));
      eventBus.store.backupDataStep = eventBus.store.backupData.length - 1;
    });
    // 表单起点选定
    eventBus.on('selectStartChange', (data) => {
      eventBus.store.selectStart = data.map((item) => parseInt(item, 10));
      eventBus.store.selectEnd = data.map((item) => parseInt(item, 10));
      this.updateSelectedArea();
      const targetData = eventBus.store.data[data[0]][data[1]] || {};
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
    eventBus.on('selectEndChange', (data) => {
      eventBus.store.selectEnd = data.map((item) => parseInt(item, 10));
      this.updateSelectedArea();
    });
    // 合并表单
    eventBus.on('formMerge', () => {
      this.mergeTableTd();
    });
    // 拆分表单
    eventBus.on('splitForm', () => {
      this.splitTableTd();
    });
    // 撤销与恢复
    eventBus.on('backupDataStepChange', (data) => {
      const {backupDataStep, backupData} = eventBus.store;
      if (data < 0) {
        data = 0;
      }
      if (data > backupData.length - 1) {
        data = backupData.length - 1;
      }
      if (data !== backupDataStep) {
        eventBus.store.backupDataStep = data;
        eventBus.emit('dataChange', deepClone(backupData[data]));
      }
    });
    // 行变化
    eventBus.on('colChange', () => {
      const {data: storeData, col, row} = eventBus.store;
      storeData[row] = [];
      for (let i = 0; i < col; ++i) {
        storeData[row].push(new TdBoxClass({
          location: [row, i],
        }));
      }
      eventBus.store.row++;
      eventBus.emit('dataChange', storeData);
    });
    // 列变化
    eventBus.on('rowChange', (data) => {
      const {data: storeData} = eventBus.store;
      storeData.forEach((item, j) => {
        for (let i = 0; i < data; ++i) {
          item.push(new TdBoxClass({
            location: [j, item.length],
          }));
        }
      });
      eventBus.store.col++;
      eventBus.emit('dataChange', storeData);
    });
    // 切换列表
    eventBus.on('toggleTab', () => {
      const {selectEnd, data: storeData} = eventBus.store;
      // 切换tab时
      const targetData = storeData[selectEnd[0]][selectEnd[1]];
      if (!targetData.isEmpty) {
        if (targetData.childrenTdNode.length) {
          eventBus.emit('selectStartChange', targetData.childrenTdNode);
          this.renderTabBox(1);
        }
        if (targetData.parentTdNode.length) {
          eventBus.emit('selectStartChange', targetData.parentTdNode);
          this.renderTabBox(0);
        }
      }
    });
    // 添加数据
    eventBus.on('addElement', (data) => {
      this.insertTable(data)
    });
    // 预览
    eventBus.on('preview', () => {
      const {data: storeData} = eventBus.store;
      const data = this.simpleData(storeData);
      if (!this.checkData(data)) {
        return
      }
      previewModal(this.mountDOM, data, this.themeConfig); // 右侧选项卡
    });
    // 保存
    eventBus.on('saveFileHandle', () => {
      if (judgeDataType(this.saveFileHandle) === 'function') {
        const {data: storeData} = eventBus.store;
        const data = this.simpleData(storeData);
        if (!this.checkData(data)) {
          return
        }
        this.saveFileHandle(JSON.stringify(data));
      }
    });
    // 存草稿
    eventBus.on('saveDraftHandle', () => {
      if (judgeDataType(this.saveDraftHandle) === 'function') {
        const {data: storeData} = eventBus.store;
        const data = this.simpleData(storeData);
        if (!this.checkData(data)) {
          return
        }
        this.saveDraftHandle(JSON.stringify(data));
      }
    });
  }

  // 初始化表单
  getTableData(data) {
    const dataCol = (data[0] || []).length;
    const dataRow = (data || []).length || 0;
    const formData = data || [];
    // 未获取到表单数据时初始化空白表单
    let col = Math.floor(
        (this.table.width() - tablePaddingLeft * 2) / (tdWidth + 2)
    ) + 5;
    let row = Math.floor(
        (this.table.height() - tablePaddingTop * 2) / (tdHeight + 2)
    );
    if (col < dataCol) {
      col = dataCol;
    }
    if (row < dataRow) {
      row = dataRow;
    }
    this.table.css({
      width: col * (tdWidth + 2) + 'px',
      height: row * (tdHeight + 2) + 'px',
    }).attr({
      border: 1,
      cellSpacing: 0,
      cellPadding: 0,
      borderSpacing: 0,
    });
    eventBus.store.row = row;
    eventBus.store.col = col;
    for (let j = 0; formData.length < row; ++j) {
      formData[j] = formData[j] || [];
      for (let i = formData[j].length; formData[j].length < col; ++i) {
        formData[j].push(new TdBoxClass({
          location: [j, i],
        }));
      }
    }
    eventBus.emit('dataChange', formData);
    eventBus.emit('backupData', formData);
    eventBus.emit('selectStartChange', [0, 0]);
  }

  // 更新表单视图
  upDateTable() {
    const {data, col, row} = eventBus.store;
    const mid = $('.mid-box-bottom-left-box')[0];
    const addCol = $('.add-col')[0];
    const addRow = $('.add-row')[0];
    this.table.html('');
    this.table.css({
      width: col * (tdWidth + 2),
      height: row * (tdHeight + 2),
    });
    mid.style.width = col * (tdWidth + 2) + tablePaddingLeft + 'px';
    mid.style.height = row * (tdHeight + 2) + tablePaddingTop + 'px';
    addCol.style.right = 0;
    addRow.style.bottom = 0;
    data.forEach((trData, j) => {
      const tr = $('<tr></tr>');
      trData.forEach((tdData, i) => {
        tr.append(this.renderTd(tdData, j, i));
      });
      this.table.append(tr);
    });
  }

  // 更新选区
  updateSelectedArea() {
    const {selectStart, selectEnd} = eventBus.store;
    if (selectEnd[1] < selectStart[1] || selectEnd[0] < selectEnd[0]) {
      return;
    }
    const startEle = $('#td-' + selectStart.join('-'));
    let {left, top} = startEle.position();
    let width = calcSelectWidth(selectStart, selectEnd);
    let height = calcSelectHeight(selectStart, selectEnd);
    const selectedArea = $('.selected-div').eq(0);
    this.addSelectedArea = $('.add-selected-area').eq(0);
    selectedArea.css({
      width,
      height,
      top: top,
      left: left,
    });
    this.addSelectedArea.css({
      top: top + height -4,
      left: left + width -4,
    });
  }

  // 合并单元格
  mergeTableTd() {
    const {selectStart, selectEnd} = eventBus.store;
    if (selectEnd[1] < selectStart[1] || selectEnd[0] < selectEnd[0]) {
      return;
    }
    const {data, sign} = this.splitFnc(eventBus.store);
    if (sign) {
      eventBus.emit('dataChange', data);
      eventBus.emit('backupData', data);
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
          data[j][i].colSpan = 1;
          data[j][i].rowSpan = 1;
          data[j][i].isHidden = 1;
          data[j][i].parentTdNode = [];
          data[j][i].childrenTdNode = [];
        }
      }
    }
    eventBus.emit('dataChange', data);
    eventBus.emit('backupData', data);
    eventBus.emit('selectStartChange', selectStart);
    eventBus.emit('selectEndChange', selectStart);
  }

  // 拆分单元格
  splitTableTd() {
    const {data} = this.splitFnc(eventBus.store);
    eventBus.emit('dataChange', data);
    eventBus.emit('backupData', data);
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

  // 向表格中插入元素
  insertTable(data) {
    const {selectEnd, data: storeData, col} = eventBus.store;
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
        eventBus.store.col++;
      }
    } else {
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
        eventBus.store.row++;
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
    eventBus.emit('selectStartChange', selectEnd);
    eventBus.emit('dataChange', storeData);
    eventBus.emit('backupData', storeData);
  }

  // 渲染td
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
    let tdChildren = '';
    if (!isEmpty) {
      tdChildren = h(childrenProps.tagName, {props: {parentTdNode, location, childrenTdNode,insertType, ...childrenProps}});
    }
    const deleteI = h('i',
        {
          className: ['iconfont', 'icon-shanchu', 'td-controllers', 'td-controllers-del'],
          on: {
            click: (e) => {
              const {data, selectStart, selectEnd} = eventBus.store;
              // 目标在选区中 删除选区
              if (_.inRange(location[0], selectStart[0] - 1, selectEnd[0] + 1) && _.inRange(location[1], selectStart[1] - 1, selectEnd[1] + 1)) {
                deleteFn(data, selectStart, selectEnd);
              } else {
                deleteFn(data, location, location);
              }
              eventBus.emit('dataChange', data);
              eventBus.emit('backupData', data);
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
    const background = _.get(childrenProps, 'style.background', 'transparent');
    const borderTopWidth = _.get(childrenProps, 'style.borderTopWidth', '1');
    const borderTopStyle = _.get(childrenProps, 'style.borderTopStyle', 'solid');
    const borderTopColor = _.get(childrenProps, 'style.borderTopColor', '#000');
    const borderRightWidth = _.get(childrenProps, 'style.borderRightWidth', '1');
    const borderRightStyle = _.get(childrenProps, 'style.borderRightStyle', 'solid');
    const borderRightColor = _.get(childrenProps, 'style.borderRightColor', '#000');
    const borderBottomWidth = _.get(childrenProps, 'style.borderBottomWidth', '1');
    const borderBottomStyle = _.get(childrenProps, 'style.borderBottomStyle', 'solid');
    const borderBottomColor = _.get(childrenProps, 'style.borderBottomColor', '#000');
    const borderLeftWidth = _.get(childrenProps, 'style.borderLeftWidth', '1');
    const borderLeftStyle = _.get(childrenProps, 'style.borderLeftStyle', 'solid');
    const borderLeftColor = _.get(childrenProps, 'style.borderLeftColor', '#000');
    const tdStyle = {
      display: !isHidden ? 'table-cell' : 'none',
      position: 'relative',
      background: isError ? '#ff5e5c' : background,
      width: colSpan * tdWidth + (colSpan - 1) * 2 + parseInt(borderLeftWidth, 10) + parseInt(borderRightWidth, 10) + 'px',
      height: rowSpan * tdHeight + (rowSpan - 1) * 2 + parseInt(borderTopWidth, 10) + parseInt(borderBottomWidth, 10) + 'px',
      padding: 0,
      borderTop: `${borderTopWidth}px ${borderTopStyle} ${borderTopColor}`,
      borderRight: `${borderRightWidth}px ${borderRightStyle} ${borderRightColor}`,
      borderBottom: `${borderBottomWidth}px ${borderBottomStyle} ${borderBottomColor}`,
      borderLeft: `${borderLeftWidth}px ${borderLeftStyle} ${borderLeftColor}`,
    };

    const td = h('td',
        {
          id: 'td-' + location.join('-'),
          rowSpan,
          colSpan,
          isHidden,
          props,
          style: tdStyle,
          on: {
            mousedown: () => {
              eventBus.emit('selectStartChange', location);
            },
            mouseenter: () => {
              if (this.isSelectArea || this.isAddSelectedArea) {
                this.table.css({
                  cursor: 'cell'
                });
                eventBus.emit('selectEndChange', location);
              } else {
                // 显示图标
                if (!isEmpty) {
                  $(td).append($(deleteI))
                }
              }
            },
            mousemove: () => {
              const ele = $(td);
              if (this.isSelectArea || this.isAddSelectedArea) {
                _.debounce(() => {
                  if (($(this.mountDOM).width() - leftNavWidth - rightNaveWidth) < ele.offset().left) {
                    const midBoxBottom = $('.mid-box-bottom').eq(0);
                    const scrollLeft = midBoxBottom.scrollLeft();
                    midBoxBottom.scrollLeft(scrollLeft + ele.width() / 8)
                  }
                }, 10)()
              }
            },
            mouseleave: () => {
              $(td).children('.td-controllers').remove();
            }
          }
        },
        [
          tdChildren,
        ]
    );
    return td;
  }

  // 右侧选项卡
  renderTabBox(index) {
    const rightBtn = $('.right-tab-btn');
    const rightBtnLen = rightBtn.length;
    for (let i = 0; i < rightBtnLen; ++i) {
      rightBtn[i].className = 'right-tab-btn'
    }
    this.tabBox.innerHTML = '';
    const {selectEnd, data} = eventBus.store;
    // 获得目标
    let targetData = data[selectEnd[0]][selectEnd[1]] || [];
    let virDOM = [];
    if (index === 0) {
      rightBtn[0].className = 'right-tab-btn active';
      // 子项
      if (!targetData.isEmpty) {
        if (targetData.childrenTdNode.length) {
          virDOM.push(createKeyBox(targetData))
        }
        virDOM.push(createFontSizeBox(targetData))
      }
      virDOM.push(createBorderBox(targetData));

    }
    if (index === 1) {
      // 显示组件
      rightBtn[1].className = 'right-tab-btn active';
      if (!targetData.isEmpty) {
        if (targetData.childrenProps.tagName === 'Input') {
          virDOM.push(createDataType(targetData))
        }
        if (['Select', 'Radio', 'Checkbox'].includes(targetData.childrenProps.tagName)) {
          virDOM.push(selectSourceBox(targetData))
        } else {
          if (['Datepicker'].includes(targetData.childrenProps.tagName)) {
            virDOM.push(createDatepicker(targetData))
          } else {
            virDOM.push(createValidateBox(targetData))
          }
        }
      }
      virDOM.push(createBorderBox(targetData));

    }


    virDOM.forEach((item) => {
      this.tabBox.appendChild(item);
    });
  }

  // 添加图标元素
  appendIconFontToBD() {
    const link = document.createElement('link');
    link.href = './';
    link.rel = 'stylesheet';
    document.body.appendChild(link);
  }

  // 检测数据
  checkData(data) {
    const {data: storeData} = eventBus.store;
    for (let j = 0; j < data.length; j++) {
      for (let i = 0; i < data[j].length; i++) {
        const targetData = storeData[j][i];
        if (targetData.childrenTdNode.length) {
          if (!targetData.childrenProps.keyName) {
            targetData.isError = 1;
            new Modal('请注意!', '关联字段名只能为英文字母及下划线!').show();
            eventBus.emit('dataChange', storeData);
            eventBus.emit('selectStartChange', targetData.location);
            return false;
          } else if (!targetData.childrenProps.cnName) {
            targetData.isError = 1;
            new Modal('请注意!', '字段标题不能为空!').show();
            eventBus.emit('dataChange', storeData);
            eventBus.emit('selectStartChange', targetData.location);
            return false;
          }
          const childrenData = data[targetData.childrenTdNode[0]][targetData.childrenTdNode[1]];
          childrenData.isError = 1;
          if (['Select', 'Radio', 'Checkbox'].includes(childrenData.childrenProps.tagName)) {
            if (!childrenData.childrenProps.dataListId) {
              new Modal('请注意!', '选列表不能为空!').show();
              eventBus.emit('dataChange', storeData);
              eventBus.emit('selectStartChange', targetData.location);
              return false;
            }
          }
          if (['Input'].includes(childrenData.childrenProps.tagName)) {
            if (!childrenData.childrenProps.dataType) {
              new Modal('请注意!', '未选择数据类型!').show();
              eventBus.emit('dataChange', storeData);
              eventBus.emit('selectStartChange', targetData.location);
              return false;
            }
          }
          childrenData.isError = 0;
          eventBus.emit('dataChange', storeData);
        }
        if (!targetData.isEmpty && !targetData.childrenTdNode.length && !targetData.parentTdNode.length) {
          if (!targetData.childrenProps.cnName) {
            new Modal('请注意!', '标题不能为空!').show();
            eventBus.emit('dataChange', storeData);
            eventBus.emit('selectStartChange', targetData.location);
            targetData.isError = 1;
            return false;
          }
        }
        targetData.isError = 0;
        eventBus.emit('dataChange', storeData);
      }
    }

    return true
  }


  // 简化输出
  simpleData(storeData) {
    // 输出表单JSON
    const res = JSON.parse(JSON.stringify(storeData));
    let line = 0;
    for (let i = res.length - 1; i >= 0; --i) {
      const item = res[i];
      if (item.some(it => !it.isEmpty)) {
        line = i + 1;
        break;
      }
    }
    res.splice(line);
    return res.filter(Boolean);
  }

  // 获取表格的 可选项
  getDataList(data = [], reflectKey = {key: 'key', value: 'value'}) {
    eventBus.store.reflectKey = reflectKey;
    const key = reflectKey.key || 'key';
    const value = reflectKey.value || 'value';
    const dataList = data.map(item => {
      return {
        [key]: item[key],
        [value]: item[value],
      }
    });
    if (!dataList.length) {
      dataList.unshift({[key]: '暂无数据', [value]: ''});
    } else {
      dataList.unshift({[key]: '', [value]: ''})
    }
    eventBus.store.datalist = dataList;
  }

  // 预览
  previewHandle() {
    eventBus.emit('preview')
  }
}

export default DynamicForm;
