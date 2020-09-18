import eventBus from "../../mainEvent";

import {getHeight, getWidth} from "../../utils";
import {$createElement as h} from "../../utils/$createElement";
import sizeConfig from "../../config/size.config";
import colorConfig from "../../config/color.config";

const leftNavWidth = sizeConfig.leftNav.width;
const midTopHeight = sizeConfig.midTop.height;
const midLeftPaddingLeft = sizeConfig.midLeft.paddingLeft;
const midLeftPaddingTop = sizeConfig.midLeft.paddingTop;
const navRightWidth = sizeConfig.navRight.width;
const tablePaddingTop = sizeConfig.table.paddingTop;
const tablePaddingLeft = sizeConfig.table.paddingLeft;


function mountMidBox(mountDOM, themeConfig = {}) {
  const midBoxWidth = getWidth(mountDOM) - leftNavWidth - navRightWidth - 20 - 1;
  const topLeftBtnBoxWidth = midBoxWidth;
  const tableBoxWidth = topLeftBtnBoxWidth - midLeftPaddingLeft * 2 - 2;
  const tableBoxHeight = getHeight(mountDOM) - 60 - midLeftPaddingTop * 2 - 1;

  const midBox = h('div',
      {
        className: ['mid-box'],
        style: {
          width: midBoxWidth + 'px',
        }
      },
      [
        h('div',
            {
              className: ['mid-box-top'],
              style: {
                width: midBoxWidth + 'px',
                height: midTopHeight + 'px',
              }
            },
            [
              /* 合并单元格 */
              h('div',
                  {},
                  [
                    h('button',
                        {
                          className: ['left-left-btn'],
                          title: '合并单元格',
                          on: {
                            click: () => {
                              eventBus.emit('formMerge', null);
                            }
                          }
                        },
                        [
                          h('i', {className: ["iconfont", "icon-hebingdanyuange"]})
                        ]
                    ),
                    h('button',
                        {
                          className: ['left-left-btn'],
                          title: '拆分单元格',
                          on: {
                            click: () => {
                              eventBus.emit('splitForm', null);
                            }
                          }
                        },
                        [
                          h('i', {className: ["iconfont", "icon-chaifen"]})
                        ]
                    ),
                    //  撤销
                    h('button',
                        {
                          className: ['left-left-btn'],
                          title: '上一步',
                          on: {
                            click: () => {
                              let {backupDataStep} = eventBus.store;
                              --backupDataStep;
                              eventBus.emit('backupDataStepChange', backupDataStep);
                            }
                          }
                        },
                        [
                          h('i', {className: ["iconfont", "icon-chexiao"]})
                        ]
                    ),
                    //  恢复
                    h('button',
                        {
                          className: ['left-left-btn'],
                          title: '下一步',
                          on: {
                            click: () => {
                              let {backupDataStep} = eventBus.store;
                              ++backupDataStep;
                              eventBus.emit('backupDataStepChange', backupDataStep);
                            }
                          }
                        },
                        [
                          h('i', {className: ["iconfont", "icon-qianjin"]})
                        ]
                    ),
                  ]
              ),
              h('div',
                  {},
                  [
                    h('button',
                        {
                          className: ['left-right-btn'],
                          style: {
                            background: themeConfig.primaryColor || colorConfig.primaryColor,
                            color: themeConfig.darkBtnColor || colorConfig.darkBtnColor,
                          },
                          on: {
                            click: () => {
                              eventBus.emit('saveFileHandle');
                            }
                          }
                        },
                        [
                          h('i', {className: ["iconfont", "icon-baocun"]}),
                          '保存'
                        ]
                    ),
                    h('button',
                        {
                          className: ['left-right-btn'],
                          style: {
                            background: themeConfig.primaryColor || colorConfig.primaryColor,
                            color: themeConfig.darkBtnColor || colorConfig.darkBtnColor,
                          },
                          on: {
                            click: () => {
                              eventBus.emit('saveDraftHandle');
                            }
                          }
                        },
                        [
                          h('i', {className: ["iconfont", "icon-wenjian"]}),
                          '存草稿'
                        ]
                    ),
                    h('button',
                        {
                          className: ['left-right-btn'],
                          style: {
                            background: themeConfig.primaryColor || colorConfig.primaryColor,
                            color: themeConfig.darkBtnColor || colorConfig.darkBtnColor,
                          },
                          on: {
                            click: () => {
                              eventBus.emit('preview')
                            }
                          }
                        },
                        [
                          h('i',
                              {
                                className: ["iconfont", "icon-yulan"]
                              }
                          ),
                          '预览'
                        ]
                    ),
                  ]
              )
            ]
        ),
        h('div',
            {
              className: ['mid-box-bottom'],
              style: {
                height: getHeight(mountDOM) - 40 - 1 + 'px',
              }
            },
            [
              h('div',
                  {
                    className: ['mid-box-bottom-left-box'],
                    style: {
                      // width: tableBoxWidth + 'px',
                      // height: tableBoxHeight + 'px',
                      width: tableBoxWidth + 'px',
                      height: tableBoxHeight + 'px',
                      padding: tablePaddingTop + 'px ' + tablePaddingLeft + 'px',
                    }
                  },
                  [
                    h('table',
                        {
                          id: 'edit-table',
                        },
                        []
                    ),
                    h('div',
                        {
                          className: ['selected-div'],
                          style: {}
                        }
                    ),
                    h('div',
                        {
                          className: ['add-selected-area'],
                          style: {}
                        }
                    ),
                    h('i',
                        {
                          className: ['iconfont', 'icon-tianjiajiahaowubiankuang', 'add-col'],
                          on: {
                            click: () => {
                              eventBus.emit('rowChange', 1);
                            }
                          }
                        }
                    ),
                    h('i',
                        {
                          className: ['iconfont', 'icon-tianjiajiahaowubiankuang', 'add-row'],
                          on: {
                            click: () => {
                              eventBus.emit('colChange', 1)
                            }
                          }
                        }
                    )
                  ]
              )
            ]
        )
      ]
  );
  mountDOM.appendChild(midBox);
}

export default mountMidBox
