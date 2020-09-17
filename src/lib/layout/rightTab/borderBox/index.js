import {$createElement as h} from "../../../utils/$createElement";
import mainEvent from "../../../mainEvent";
import './index.scss';

const borderConfig = [
  {
    key: 'borderTop',
    name: '上边框',
    className: 'border-control-box'
  },
  {
    key: 'borderRight',
    name: '右边框',
    className: 'border-control-box'
  },
  {
    key: 'borderBottom',
    name: '下边框',
    className: 'border-control-box'
  },
  {
    key: 'borderLeft',
    name: '左边框',
    className: 'border-control-box'
  },
];

export const createBorderBox = (data) => {
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
            ['边框：']
        ),
        h('div',
            {
              className: ['content-box']
            },
            [
              ...borderConfig.map(item => {
                    return h('div',
                        {
                          className: ['border-control-box']
                        },
                        [
                          h('span',
                              {
                                className: ['border-control-title']
                              },
                              [item.name + ':']
                          ),
                          h('input',
                              {
                                props: {
                                  value: _.get(data, `childrenProps.style.${item.key + 'Width'}`, 1),
                                  className: ['border-width-input']
                                },
                                on: {
                                  change: (e) => {
                                    data.childrenProps.style[item.key + 'Width'] = e.target.value;
                                    mainEvent.emit('dataChange', mainEvent.store.data);
                                  }
                                }
                              },
                          ),
                          h('span', {}, ['px']),
                          h('select',
                              {
                                on: {
                                  change: (e) => {
                                    data.childrenProps.style[item.key + 'Style'] = e.target.value;
                                    mainEvent.emit('dataChange', mainEvent.store.data);
                                  }
                                }
                              },
                              [
                                h('option',
                                    {
                                      value: 'solid',
                                      selected: _.get(data, `childrenProps.style.${item.key + 'Style'}`, 'solid')==='solid',
                                    },
                                    [
                                      h('span', {
                                        className: ['solid-line']
                                      }, ['实线'])
                                    ]
                                ),
                                h('option',
                                    {
                                      value: 'dotted',
                                      selected: _.get(data, `childrenProps.style.${item.key + 'Style'}`, 'solid')==='dotted',
                                    },
                                    [
                                      h('span', {
                                        className: ['dotted-line']
                                      }, ['点线'])
                                    ]
                                ),
                                h('option',
                                    {
                                      value: 'dashed',
                                      selected: _.get(data, `childrenProps.style.${item.key + 'Style'}`, 'solid')==='dashed',
                                    },
                                    [
                                      h('span', {
                                        className: ['dash-line']
                                      }, ['虚线'])
                                    ]
                                )
                              ]
                          ),
                          h('input', {
                                type: 'color',
                                props: {
                                  value: _.get(data, `childrenProps.style.${item.key + 'Color'}`, '#000')
                                },
                                on: {
                                  change: (e) => {
                                    data.childrenProps.style[item.key + 'Color'] = e.target.value;
                                    mainEvent.emit('dataChange', mainEvent.store.data);
                                  }
                                }
                              }
                          ),
                        ]
                    );
                  }
              )
            ]
        )
      ]
  )
};
