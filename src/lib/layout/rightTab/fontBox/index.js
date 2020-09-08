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
    key: 'verticalAlign',
    name: '竖直对齐',
    className: 'vertical-align-box'
  },
];

export const createFontSizeBox = (data) => {
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
                                  data.style[item.key] = e.target.value + 'px';
                                  mainEvent.emit('dataChange', mainEvent.store.data);
                                }
                              }
                            },
                        ),
                        h('span', {}, ['px']),
                      ]
                  );
                }
                // 边线类型
                if (item.className === 'text-align-box') {
                  return h('div',
                      {
                        className: ['border-style-box']
                      },
                      [
                        h('span', {}, [item.name + ':']),
                        h('select',
                            {
                              props: {
                                value: 'left'
                              },
                              on: {
                                change: (e) => {
                                  data.style[item.key] = e.target.value;
                                  mainEvent.emit('dataChange', mainEvent.store.data);
                                }
                              }
                            },
                            [
                              h('option',
                                  {
                                    value: 'left'
                                  },
                                  [
                                    h('span', {
                                    }, ['左对齐'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'center'
                                  },
                                  [
                                    h('span', {
                                    }, ['居中'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'right'
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
                if (item.className === 'vertical-align-box') {
                  return h('div',
                      {
                        className: ['border-style-box']
                      },
                      [
                        h('span', {}, [item.name + ':']),
                        h('select',
                            {
                              props: {
                                value: 'top'
                              },
                              on: {
                                change: (e) => {
                                  data.style[item.key] = e.target.value;
                                  mainEvent.emit('dataChange', mainEvent.store.data);
                                }
                              }
                            },
                            [
                              h('option',
                                  {
                                    value: 'top'
                                  },
                                  [
                                    h('span', {
                                    }, ['顶对齐'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'middle'
                                  },
                                  [
                                    h('span', {
                                    }, ['居中'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'bottom'
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
                                  data.style[item.key] = e.target.value;
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
