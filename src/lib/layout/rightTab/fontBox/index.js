import _ from 'lodash'
import {$createElement as h} from "../../../utils/$createElement";
import mainEvent from "../../../mainEvent";
import './index.scss'

export const createFontSizeBox = (data) => {
  const fontSize = _.get(data, 'childrenProps.style.fontSize', '14');
  const textAlign = _.get(data, 'childrenProps.style.textAlign', '');
  const alignItems = _.get(data, 'childrenProps.style.alignItems', '');
  return h('div',
      {
        className: ['font-box']
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
              h('div',
                  {
                    className: ['border-style-box']
                  }, [
                    h('span', {}, ['大小:']),
                    h('span',
                        {
                          className: ['fontsize-box']

                        },
                        [
                          h('input',
                              {
                                props: {
                                  value: fontSize,
                                },
                                on: {
                                  change: (e) => {
                                    data.childrenProps.style['fontSize'] = e.target.value + 'px';
                                    mainEvent.emit('dataChange', mainEvent.store.data);
                                  }
                                }
                              },
                          ),
                          h('span', {}, ['px']),
                        ]),
                  ],
              ),
              h('div',
                  {
                    className: ['border-style-box']
                  },
                  [
                    h('span', {}, ['水平对齐:']),
                    h('select',
                        {
                          on: {
                            change: (e) => {
                              data.childrenProps.style['textAlign'] = e.target.value;
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
                                h('span', {}, ['左对齐'])
                              ]
                          ),
                          h('option',
                              {
                                value: 'center',
                                selected: textAlign === 'center'

                              },
                              [
                                h('span', {}, ['居中'])
                              ]
                          ),
                          h('option',
                              {
                                value: 'right',
                                selected: textAlign === 'right'

                              },
                              [
                                h('span', {}, ['右对齐'])
                              ]
                          )
                        ]
                    ),
                  ]
              ),
              h('div',
                  {
                    className: ['border-style-box']
                  },
                  [
                    h('span', {}, ['竖直对齐:']),
                    h('select',
                        {
                          on: {
                            change: (e) => {
                              data.childrenProps.style['alignItems'] = e.target.value;
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
                                h('span', {}, ['顶对齐'])
                              ]
                          ),
                          h('option',
                              {
                                value: 'center',
                                selected: alignItems === 'center'
                              },
                              [
                                h('span', {}, ['居中'])
                              ]
                          ),
                          h('option',
                              {
                                value: 'flex-end',
                                selected: alignItems === 'flex-end'
                              },
                              [
                                h('span', {}, ['底对齐'])
                              ]
                          )
                        ]
                    ),
                  ]
              ),
              h('div',
                  {
                    className: ['border-color-box']
                  },
                  [
                    h('span', {}, ['字体颜色:']),
                    h('input', {
                          type: 'color',
                          props: {
                            value: _.get(data, `childrenProps.style.color`, '#000')
                          },
                          on: {
                            change: (e) => {
                              data.childrenProps.style['color'] = e.target.value;
                              mainEvent.emit('dataChange', mainEvent.store.data);
                            }
                          }
                        }
                    ),
                  ]
              ),
              h('div',
                  {
                    className: ['border-color-box']
                  },
                  [
                    h('span', {}, ['背景颜色:']),
                    h('input', {
                          type: 'color',
                          props: {
                            value: _.get(data, `childrenProps.style.backgroundColor`, '#000')
                          },
                          on: {
                            change: (e) => {
                              data.childrenProps.style['backgroundColor'] = e.target.value;
                              mainEvent.emit('dataChange', mainEvent.store.data);
                            }
                          }
                        }
                    ),
                  ]
              )
            ]
        )
      ]
  )
};
