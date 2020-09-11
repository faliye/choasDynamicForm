import {$createElement as h} from "../../../utils/$createElement";
import mainEvent from "../../../mainEvent";
import '../index.scss'

export const createKeyBox = (data) => {
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
                    h('b', {}, ['*']),
                    h('span', {}, ['字段名:']),
                    h('input',
                        {
                          props: {
                            value: data.childrenProps.keyName || ''
                          },
                          on: {
                            change: (e) => {
                              data.childrenProps.keyName = e.target.value;
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
                    h('b', {}, ['']),
                    h('span', {}, ['支持搜索:']),
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
