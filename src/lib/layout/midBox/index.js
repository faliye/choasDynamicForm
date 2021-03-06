import eventBus from "../../mainEvent";
import $ from 'jquery'
import {$createElement as h} from "../../utils";
import './index.scss';


const createMidBox = (mountDOM, mode, themeConfig = {}) => {
  const {mode: themeMode} = themeConfig;
  const {primary, borderColor, background, hoverColor,selectedArea} = themeConfig.colorConfig[themeMode];
  const midBox = h('div',
      {
        className: ['mid-box'],
        style: {
          width: mode !=='edit' ? `calc(100% - ${themeConfig.sizeConfig.rightWidth + themeConfig.sizeConfig.leftWidth}px)`: '100%',
        }
      },
      [
        mode !== 'design' ? null : h('div',
            {
              className: ['mid-box-top'],
              style: {
                height: themeConfig.sizeConfig.topBarHeight + 'px',
                borderBottom: `1px solid ${borderColor}`
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
              mode !== 'design' ? null : h('div',
                  {},
                  [
                    h('button',
                        {
                          className: ['left-right-btn'],
                          style: {
                            background: primary,
                            color: background,
                          },
                          on: {
                            click: () => {
                              eventBus.emit('saveFileHandle');
                            }
                          }
                        },
                        [
                          h('i', {className: ["iconfont", "icon-baocun"]}),
                          h('span', {}, ['保存'])
                        ]
                    ),
                    h('button',
                        {
                          className: ['left-right-btn'],
                          style: {
                            background: primary,
                            color: background,
                          },
                          on: {
                            click: () => {
                              eventBus.emit('saveDraftHandle');
                            }
                          }
                        },
                        [
                          h('i', {className: ["iconfont", "icon-wenjian"]}),
                          h('span', {}, ['存草稿'])
                        ]
                    ),
                    h('button',
                        {
                          className: ['left-right-btn'],
                          style: {
                            background: primary,
                            color: background,
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
                          h('span', {}, ['预览'])
                        ]
                    ),
                  ]
              )
            ]
        ),
        h('div',
            {
              className: ['mid-box-bottom'],
            },
            [
              h('div',
                  {
                    style: {
                      padding: themeConfig.sizeConfig.tablePadding + 'px',
                    }
                  },
                  [
                    h('table',
                        {
                          id: 'dynamic-table',
                        },
                        []
                    ),
                    mode !== 'design' ? null : h('div',
                        {
                          className: ['selected-div'],
                          style: {
                            background: selectedArea,
                            borderColor: primary,
                          }
                        }
                    ),
                    mode !== 'design' ? null : h('div',
                        {
                          className: ['add-selected-area'],
                          style: {
                            background: primary,
                          }
                        }
                    ),
                    mode !== 'design' ? null : h('i',
                        {
                          className: ['iconfont', 'icon-tianjiajiahaowubiankuang', 'add-col'],
                          style: {
                            background: primary,
                            color: hoverColor,
                            marginTop: -(themeConfig.sizeConfig.tablePadding / 2).toFixed(0) + 'px',
                          },
                          on: {
                            click: () => {
                              eventBus.emit('rowChange', 1);
                            }
                          }
                        }
                    ),
                    mode !== 'design' ? null : h('i',
                        {
                          className: ['iconfont', 'icon-tianjiajiahaowubiankuang', 'add-row'],
                          style: {
                            background: primary,
                            color: hoverColor,
                            marginLeft: -(themeConfig.sizeConfig.tablePadding / 2).toFixed(0) + 'px',
                          },
                          on: {
                            click: () => {
                              eventBus.emit('colChange', 1)
                            }
                          }
                        }
                    )
                  ],
              ),
            ]
        )
      ]
  );
  mountDOM.append(midBox);
};

export default createMidBox
