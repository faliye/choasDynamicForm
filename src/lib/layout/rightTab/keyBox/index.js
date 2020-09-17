import {$createElement as h} from "../../../utils/$createElement";
import mainEvent from "../../../mainEvent";
import {Modal} from "../../../components/modal";
import './index.scss';

export const createKeyBox = (data) => {
  return h('div',
      {
        className: ['key-box']
      },
      [
        h('div',
            {
              className: ['title-box']
            }
            ,
            ['字段：']
        ),
        h('div',
            {
              className: ['content-box']
            },
            [
              h('div',
                  {
                    className: ['key-name-box']
                  }, [
                    h('span',
                        {
                          style:{
                            width: '70px',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }
                        },
                        [
                          h('b',
                              {
                                className: ['require-notice']
                              },
                              ['*']
                          ),
                          h('span',
                              {
                                style:{
                                  width: '55px'
                                }
                              },
                              ['字段名:']
                          ),
                        ]
                    ),
                    h('input',
                        {

                          props: {
                            value: data.childrenProps.keyName || '',
                            type: 'text'
                          },
                          on: {
                            blur: (e) => {
                              const {value} = e.target;
                              if(/^[a-zA-Z][\w_]{4,63}$/.test(value)){
                                data.childrenProps.keyName = e.target.value;
                                data.isError = 0;
                              }else{
                                data.isError = 1;
                                new Modal('字段名错误！','字段名以字母开头，仅包含数字字母下划线，且长度不小于5不大于60！').show();
                              }
                              mainEvent.emit('dataChange', mainEvent.store.data);
                            }
                          }
                        },
                    ),
                  ]
              ),
              h('div',
                  {
                    className: ['key-name-box']
                  }, [
                    h('span',
                        {},
                        [
                          h('span',
                              {
                                style:{
                                  width: '70px'
                                }
                              },
                              ['支持搜索:']
                          ),
                        ]
                    ),
                    h('input',
                        {
                          props: {
                            type: 'checkbox',
                            checked: Boolean(data.childrenProps.isSearch)
                          },
                          on: {
                            change: (e) => {
                              data.childrenProps.isSearch = Number(e.target.checked);
                              mainEvent.emit('dataChange', mainEvent.store.data);
                            }
                          }
                        },
                    ),
                  ]
              ),
            ]
        )

      ]
  )
};
