import _ from 'lodash'
import {$createElement as h} from "../../../utils/$createElement";
import mainEvent from "../../../mainEvent";

const fontConfig = [
  {
    key: 'fontSize',
    name: '大小',
    className: 'font-size-box'
  },
  {
    key: 'color',
    name: '颜色',
    className: 'font-color-box'
  },
  {
    key: 'textAlign',
    name: '水平对齐',
    className: 'text-align-box'
  },
  {
    key: 'alignItems',
    name: '竖直对齐',
    className: 'vertical-align-box'
  },
];

export const createFontSizeBox = (data) => {
  const textAlign = _.get(data,'childrenProps.style.textAlign','');
  const alignItems = _.get(data,'childrenProps.style.alignItems','');
  return h('div',
      {
        className: ['border-box']
      },
      [
        h('div',
            {
              className: ['title-box']
            }
            ,
            ['字体：']
        ),
        h('div',
            {
              className: ['content-box']
            },
            [
              ...fontConfig.map(item => {
                if (item.className === 'font-size-box') {
                  return h('div',
                      {
                        className: ['border-control-box']
                      }, [
                        h('span', {}, [item.name + ':']),
                        h('input',
                            {
                              props: {
                                value: '16'
                              },
                              on: {
                                change: (e) => {
                                  data.childrenProps.style[item.key] = e.target.value + 'px';
                                  mainEvent.emit('dataChange', mainEvent.store.data);
                                }
                              }
                            },
                        ),
                        h('span', {}, ['px']),
                      ]
                  );
                }
                // 居中
                if (item.className === 'text-align-box') {
                  return h('div',
                      {
                        className: ['border-style-box']
                      },
                      [
                        h('span', {}, [item.name + ':']),
                        h('select',
                            {
                              on: {
                                change: (e) => {
                                  data.childrenProps.style[item.key] = e.target.value;
                                  mainEvent.emit('dataChange', mainEvent.store.data);
                                }
                              }
                            },
                            [
                              h('option',
                                  {
                                    value: 'left',
                                    selected: textAlign === 'left'
                                  },
                                  [
                                    h('span', {
                                    }, ['左对齐'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'center',
                                    selected: textAlign === 'center'

                                  },
                                  [
                                    h('span', {
                                    }, ['居中'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'right',
                                    selected: textAlign === 'right'

                                  },
                                  [
                                    h('span', {
                                    }, ['右对齐'])
                                  ]
                              )
                            ]
                        ),
                      ]
                  )
                }
                // 竖直对齐
                if (item.className === 'vertical-align-box') {
                  return h('div',
                      {
                        className: ['border-style-box']
                      },
                      [
                        h('span', {}, [item.name + ':']),
                        h('select',
                            {
                              on: {
                                change: (e) => {
                                  data.childrenProps.style[item.key] = e.target.value;
                                  mainEvent.emit('dataChange', mainEvent.store.data);
                                }
                              }
                            },
                            [
                              h('option',
                                  {
                                    value: 'flex-start',
                                    selected: alignItems === 'flex-start'
                                  },
                                  [
                                    h('span', {
                                    }, ['顶对齐'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'center',
                                    selected: alignItems === 'center'
                                  },
                                  [
                                    h('span', {
                                    }, ['居中'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'flex-end',
                                    selected: alignItems === 'flex-end'
                                  },
                                  [
                                    h('span', {
                                    }, ['底对齐'])
                                  ]
                              )
                            ]
                        ),
                      ]
                  )
                }
                if (item.className === 'font-color-box') {
                  return h('div',
                      {
                        className: ['border-color-box']
                      },
                      [
                        h('span', {}, [item.name + ':']),
                        h('input', {
                              type: 'color',
                              on: {
                                change: (e) => {
                                  data.childrenProps.style[item.key] = e.target.value;
                                  mainEvent.emit('dataChange', mainEvent.store.data);
                                }
                              }
                            }
                        ),
                      ]
                  )
                }
              })
            ]
        )

      ]
  )
};
