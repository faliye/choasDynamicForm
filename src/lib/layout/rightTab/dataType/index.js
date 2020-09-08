import {$createElement as h} from "../../../utils/$createElement";
import mainEvent from "../../../mainEvent";
import '../index.scss'

const optionsSetting = [
  {
    key: '',
    name: ''
  },
  {
    key: 'string',
    name: '字符串'
  },
  {
    key: 'int',
    name: '整数'
  },
  {
    key: 'double',
    name: '小数'
  },
  {
    key: 'date',
    name: '时间'
  },
];

export const createDataType = (data) => {
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
            ['数据类型：']
        ),
        h('div',
            {
              className: ['content-box'],
            },
            [
              h('div',
                  {
                    className: ['public-category-item', 'key-name-box']
                  },
                  [
                    h('span', {}, ['数据类型:']),
                    h('select',
                        {
                          className: ['public-category-select'],
                          value: data.childrenProps.dataType,
                          on: {
                            change(e) {
                              data.childrenProps.dataType = e.target.value;
                              mainEvent.emit('dataChange', mainEvent.store.data);
                            }
                          }
                        }, [
                          ...optionsSetting.map(item => {
                            return h('option',
                                {
                                  value: item.key,
                                  selected: data.childrenProps.dataType === item.key
                                },
                                [item.name]
                            )
                          })
                        ]
                    ),
                  ]
              )
            ]
        ),
      ]
  )
};
