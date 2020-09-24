import _ from 'lodash';
import $ from 'jquery';
import theme from "./theme";
import createLeftNav from "./layout/leftNav";
import createRightTable from "./layout/rightNav";
import createMidBox from "./layout/midBox";
import mainEvent from "./mainEvent";
import {TdBoxClass} from "./config/componentApiConfig";
import {$createElement as h, computedTdStyle, deleteFn, calcSelectHeight, calcSelectWidth} from "./utils";
import './index.scss';

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

  renderTabBox() {

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
    const style =computedTdStyle(tdData, this.themeConfig);
    const td = h('td',
        {
          id: 'td-' + location.join('-'),
          className: ['td-div'],
          rowSpan,
          colSpan,
          isHidden,
          props,
          style,
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
                style:{
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
        trData.forEach((tdData, i) => {
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
      minWidth: (col + 1) * (tdInitWidth + 2),
      minHeight: row * (tdInitHeight + 2),
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
