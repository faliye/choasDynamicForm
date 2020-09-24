import {$createElement as h} from "../../../../utils";
import mainEvent from "../../../../mainEvent";
import {Modal} from "../../../../components/modal";
import './index.scss';

export const createValidateBox = (data) => {
  let validate = {
    key: 'regexp',
  };
  let addBox, addBtnBox;
  addBox = h('div',
      {
        className: ['validate-add-box'],
        style: {
          display: 'none',
        }
      },
      [
        h('div', {
          className: ['title-box']
        }, ['新增验证']),
        h('div',
            {
              className: ['validate-box-item'],
            }, [
              h('span', {}, ['验证规则:']),
              h('input',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      change: (e) => {
                        validate.value = e.target.value;
                      },
                    },
                  },
              )
            ]
        ),
        h('div',
            {
              className: ['validate-box-item'],
            }, [
              h('span', {}, ['验证名称:']),
              h('input',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      change: (e) => {
                        validate.name = e.target.value;
                      },
                    },
                  },
              )
            ]
        ),
        h('div',
            {
              className: ['validate-box-item'],
            }, [
              h('span', {}, ['提示语句:']),
              h('input',
                  {
                    props: {
                      type: 'text'
                    },
                    on: {
                      change: (e) => {
                        validate.msg = e.target.value;
                      },
                    },
                  },
              )
            ]
        ),
        h('div',
            {
              className: ['validate-box-item'],
            },
            [
              h('span',
                  {},
                  ['验证时间:']
              ),
              h('select',
                  {
                    props: {},
                    on: {
                      change: (e) => {
                        validate.event = e.target.value;
                      },
                    },
                  },
                  [
                    h('option',
                        {
                          value: 'input',
                        },
                        ['输入时']
                    ),
                    h('option',
                        {
                          value: 'focus',
                        },
                        ['获取焦点']
                    ),
                    h('option',
                        {
                          value: 'blur',
                        },
                        ['失去焦点']
                    ),
                    h('option',
                        {
                          value: 'change',
                        },
                        ['值发生改变']
                    ),

                  ]
              )
            ]
        ),
        h('div',
            {
              className: ['validate-box-item'],
              style: {
                textAlign: 'center'
              }
            },
            [
              h('button',
                  {
                    on: {
                      click: () => {
                        if (!validate.value) {
                          return new Modal('请注意!', '验证规则不能为空!').show();
                        }
                        if (!validate.name) {
                          return new Modal('请注意!', '说明不能为空!').show();
                        }
                        if (!validate.msg) {
                          return new Modal('请注意!', '提示语不能为空!').show();
                        }
                        if (!validate.event) {
                          return new Modal('请注意!', '触发事件不能为空!').show();
                        }
                        data.childrenProps.validate.push(validate);
                        validate = {
                          key: 'regexp',
                        };
                        addBox.style.display = 'none';
                        addBtnBox.style.display = 'flex';
                        mainEvent.emit('dataChange', mainEvent.store.data);
                        mainEvent.emit('selectStartChange', data.location)
                      }
                    }
                  },
                  ['确认']
              ),
              h('button',
                  {
                    on: {
                      click: () => {
                        validate = {};
                        addBox.style.display = 'none';
                        addBtnBox.style.display = 'flex';
                      }
                    }
                  },
                  ['取消']
              ),
            ]
        ),
      ]
  );
  addBtnBox = h('div',
      {
        className: ['validate-add-box'],
      },
      [
        h('button',
            {
              className: ['validate-add-btn'],
              on: {
                click: () => {
                  addBox.style.display = 'block';
                  addBtnBox.style.display = 'none';
                }
              }
            },
            [
              h('span', {}, ['新增验证']),
              h('i',
                  {
                    className: ['iconfont', 'icon-tianjiajiahaowubiankuang'],
                  }
              ),
            ]),
      ]
  );
  return h('div',
      {
        className: ['validate-box']
      },
      [
        h('div',
            {
              className: ['title-box']
            }
            ,
            ['验证规则：']
        ),
        h('div',
            {
              className: ['content-box'],
            },
            [
              ...data.childrenProps.validate.map(item => {
                if (item.key === 'isRequire') {
                  return h('div',
                      {
                        className: ['validate-box-item'],
                      }, [
                        h('div',
                            {
                              style:{
                                width: '130px',
                              },
                            },
                            [
                              h('span', {}, [item.name + ':']),
                              h('input',
                                  {
                                    props: {
                                      checked: item.value,
                                      type: 'checkbox',
                                    },
                                    on: {
                                      change: (e) => {
                                        item.value = Number(e.target.value);
                                        mainEvent.emit('dataChange', mainEvent.store.data);
                                      },
                                    },
                                  },
                              ),
                            ]
                        ),
                        h('div',
                            {},
                            [
                              h('select',
                                  {
                                    props: {},
                                    on: {
                                      change: (e) => {
                                        item.event = e.target.value;
                                        mainEvent.emit('dataChange', mainEvent.store.data);
                                      },
                                    },
                                  },
                                  [
                                    h('option',
                                        {
                                          value: 'input',
                                          selected: item.event === 'input',
                                        },
                                        ['输入时']
                                    ),
                                    h('option',
                                        {
                                          value: 'focus',
                                          selected: item.event === 'focus',
                                        },
                                        ['获得焦点']
                                    ),
                                    h('option',
                                        {
                                          value: 'blur',
                                          selected: item.event === 'blur',
                                        },
                                        ['失去焦点']
                                    ),
                                    h('option',
                                        {
                                          value: 'change',
                                          selected: item.event === 'change',
                                        },
                                        ['值改变']
                                    ),

                                  ]
                              ),
                              h('span',
                                  {},
                                  ['验证']
                              ),
                            ]
                        )
                      ]
                  );
                }
                return h('div',
                    {
                      className: ['validate-box-item'],
                    }, [
                      h('div',
                          {
                            style:{
                              width: '140px',
                            },
                          },
                          [
                            h('span', {}, [item.name + ':']),
                            h('input',
                                {
                                  props: {
                                    value: item.value,
                                    type: 'text'
                                  },
                                  on: {
                                    change: (e) => {
                                      item.value = e.target.value;
                                      mainEvent.emit('dataChange', mainEvent.store.data);
                                    },
                                  },
                                },
                            ),
                          ]
                      ),
                      h('div',
                          {},
                          [
                            h('select',
                                {
                                  props: {},
                                  on: {
                                    change: (e) => {
                                      item.event = e.target.value;
                                      mainEvent.emit('dataChange', mainEvent.store.data);
                                    },
                                  },
                                },
                                [
                                  h('option',
                                      {
                                        value: 'input',
                                        selected: item.event === 'input',
                                      },
                                      ['输入时']
                                  ),
                                  h('option',
                                      {
                                        value: 'focus',
                                        selected: item.event === 'focus',
                                      },
                                      ['获得焦点']
                                  ),
                                  h('option',
                                      {
                                        value: 'blur',
                                        selected: item.event === 'blur',
                                      },
                                      ['失去焦点']
                                  ),
                                  h('option',
                                      {
                                        value: 'change',
                                        selected: item.event === 'change',
                                      },
                                      ['值改变']
                                  ),
                                ]
                            ),
                            h('span',
                                {},
                                ['验证']
                            ),
                          ]
                      )
                    ]
                );
              }),
              addBox,
            ]
        ),
        addBtnBox,
      ]
  )
};
