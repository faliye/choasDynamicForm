import {$createElement as h} from "../../../utils/$createElement";
import mainEvent from "../../../mainEvent";

const borderConfig = [
  {
    key: 'borderTopWidth',
    name: '上边框',
    className: 'border-control-box'
  },
  {
    key: 'borderTopWidth',
    name: '右边框',
    className: 'border-control-box'
  },
  {
    key: 'borderBottomWidth',
    name: '下边框',
    className: 'border-control-box'
  },
  {
    key: 'borderLeftWidth',
    name: '左边框',
    className: 'border-control-box'
  },
  {
    key: 'borderStyle',
    name: '线型',
    className: 'border-style-box'
  },
  {
    key: 'borderColor',
    name: '边框颜色',
    className: 'border-color-box'
  },

];

export const createBorderBox = (data) => {
  const {childrenTdNode} = data;
  let childrenTd = null
  if(childrenTdNode.length){
    childrenTd = mainEvent.store.data[childrenTdNode[0]][childrenTdNode[1]];
  }
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
                if (item.className === 'border-control-box') {
                  return h('div',
                      {
                        className: ['border-control-box']
                      }, [
                        h('span', {}, [item.name + ':']),
                        h('input',
                            {
                              props: {
                                value: '1'
                              },
                              on: {
                                change: (e) => {
                                  data.style[item.key] = e.target.value + 'px';
                                  childrenTd && (childrenTd.style[item.key] = e.target.value + 'px');
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
                if (item.className === 'border-style-box') {
                  return h('div',
                      {
                        className: ['border-style-box']
                      },
                      [
                        h('span', {}, [item.name + ':']),
                        h('select',
                            {
                              props: {
                                value: 'solid'
                              },
                              on: {
                                change: (e) => {
                                  data.style[item.key] = e.target.value;
                                  childrenTd && (childrenTd.style[item.key] = e.target.value);
                                  mainEvent.emit('dataChange', mainEvent.store.data);
                                }
                              }
                            },
                            [
                              h('option',
                                  {
                                    value: 'solid'
                                  },
                                  [
                                    h('span', {
                                      className: ['solid-line']
                                    }, ['实线'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'dotted'
                                  },
                                  [
                                    h('span', {
                                      className: ['dotted-line']
                                    }, ['点线'])
                                  ]
                              ),
                              h('option',
                                  {
                                    value: 'dash'
                                  },
                                  [
                                    h('span', {
                                      className: ['dash-line']
                                    }, ['虚线'])
                                  ]
                              )
                            ]
                        ),
                      ]
                  )
                }
                if (item.className === 'border-color-box') {
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
                                  childrenTd && (childrenTd.style[item.key] = e.target.value);
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
