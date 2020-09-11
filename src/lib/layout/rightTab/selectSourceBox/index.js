import {$createElement as h} from "../../../utils/$createElement";
import mainEvent from "../../../mainEvent";
import '../index.scss'

export const selectSourceBox = (data) => {
  const {key= 'key', value='value'} = mainEvent.store.reflectKey || {};
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
            ['选项来源：']
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
                    h('span', {}, ['可选分类:']),
                    h('select',
                        {
                          className: ['public-category-select'],
                          props:{
                            value: data.childrenProps.dataListId,
                          },
                          on: {
                            change(e) {
                              data.childrenProps.dataListId = e.target.value;
                              console.log(e.target.value);
                              mainEvent.emit('dataChange', mainEvent.store.data);
                            }
                          }
                        }, [
                          ...mainEvent.store.datalist.map(item=>{
                            return h('option',
                                {
                                  props:{
                                    value: item[value],
                                    selected: item.value === data.childrenProps.dataListId
                                  }
                                },
                                [item[key]]
                            )
                          })
                        ]
                    )
                  ])
            ]
        ),
        h('div',
            {
              className: ['public-category-item']
            }, [
              h('span', {}, ['是否多选:']),
              h('input',
                  {
                    props: {
                      value: data.childrenProps.isMultiple || '',
                      type: 'checkbox',
                      checked: Boolean(data.childrenProps.isMultiple)
                    },
                    on: {
                      change: (e) => {
                        data.childrenProps.isMultiple = e.target.value;
                        mainEvent.emit('dataChange', mainEvent.store.data);
                      }
                    }
                  },
              ),
            ]
        ),
      ]
  )
};
