import {$createElement as h} from "../../../utils/$createElement";
import {Modal} from "../../../components/modal";
import mainEvent from "../../../mainEvent";

export const createValidateBox = (data) => {
  let validate ={
    key: 'regexp',
  };
  let addBox, addBtnBox;
  addBox = h('div',
      {
        style: {
          display: 'none'
        }
      },
      [
        h('div', {
          className: ['title-box']
        }, ['新增验证']),
        h('div',
            {
              className: ['key-name-box'],
            }, [
              h('span', {}, ['验证规则:']),
              h('input',
                  {
                    props: {},
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
              className: ['key-name-box'],
            }, [
              h('span', {}, ['中文说明:']),
              h('input',
                  {
                    props: {},
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
              className: ['key-name-box'],
            },
            [
              h('span',
                  {},
                  ['触发事件:']
              ),
              h('input',
                  {
                    props: {},
                    on: {
                      change: (e) => {
                        validate.event = e.target.value;
                      },
                    },
                  },
              )
            ]
        ),
        h('div',
            {
              className: ['key-name-box'],
            }, [
              h('span', {}, ['提示语句:']),
              h('input',
                  {
                    props: {},
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
              className: ['key-name-box'],
              style:{
                textAlign:'center'
              }
            },
            [
              h('button',
                  {
                    style: {
                      background: '#1780E3',
                      color: '#fff',
                      marginRight: '10px',
                      borderRadius: '4px',
                    },
                    on:{
                      click:()=>{
                        if(!validate.value){
                          return new Modal('请注意!', '验证规则不能为空!').show();
                        }
                        if(!validate.name){
                          return new Modal('请注意!', '说明不能为空!').show();
                        }
                        if(!validate.msg){
                          return new Modal('请注意!', '提示语不能为空!').show();
                        }
                        if(!validate.event){
                          return new Modal('请注意!', '触发事件不能为空!').show();
                        }
                        data.childrenProps.validate.push(validate);
                        validate ={
                          key: 'regexp',
                        };
                        addBox.style.display = 'none';
                        addBtnBox.style.display = 'block';
                        mainEvent.emit('dataChange', mainEvent.store.data);
                        mainEvent.emit('selectStartChange', data.location)
                      }
                    }
                  },
                  ['确认']
              ),
              h('button',
                  {
                    style: {
                      background: '#ff5e5c',
                      color: '#fff',
                      marginRight: '10px',
                      borderRadius: '4px',
                    },
                    on:{
                      click: ()=>{
                        validate = {};
                        addBox.style.display = 'none';
                        addBtnBox.style.display = 'block';
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
        className: ['border-box']
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
                        className: ['key-name-box'],
                      }, [
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
                        )
                      ]
                  );
                }
                return h('div',
                    {
                      className: ['key-name-box'],
                    }, [
                      h('span', {}, [item.name + ':']),
                      h('input',
                          {
                            props: {
                              value: item.value,
                            },
                            on: {
                              change: (e) => {
                                item.value = e.target.value;
                                mainEvent.emit('dataChange', mainEvent.store.data);
                              },
                            },
                          },
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
