import {$createElement as h} from "../../../../utils";
import mainEvent from "../../../../mainEvent";
import './index.scss'

export const selectSourceBox = (data) => {
  const {key= 'key', value='value'} = mainEvent.store.reflectKey || {};
  return h('div',
      {
        className: ['source-box']
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
                    className: ['source-box-item']
                  },
                  [
                    h('span', {}, ['可选分类:']),
                    h('select',
                        {
                          props:{
                            value: data.childrenProps.dataListId,
                          },
                          style:{
                            width: '150px',
                            overflow: 'hidden',
                          },
                          on: {
                            change(e) {
                              data.childrenProps.dataListId = e.target.value;
                              mainEvent.emit('dataChange', mainEvent.store.data);
                            }
                          }
                        }, [
                          ...mainEvent.store.datalist.map(item=>{
                            return h('option',
                                {
                                  props:{
                                    value: item[value],
                                    selected: item[value] === data.childrenProps.dataListId
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
              className: ['source-box-item']
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
