import {$createElement as h} from "../../../utils/$createElement";
import '../index.scss'
import {Datepicker} from "../../../components/datepicker";
import mainEvent from "../../../mainEvent";

export const createDatepicker = (data) => {
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
            ['时间选项：']
        ),
        h('div',
            {
              className: ['content-box'],
            },
            [
              ...data.childrenProps.timeValidate.map(item => {
                if (item.key === 'defaultValue') {
                  return h('div',
                      {
                        className: ['date-validate-box'],
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
                }
                if (item.key === 'startTime') {
                  let value = '';
                  for (let i = 0; i < (data.childrenProps.timeValidate || []).length; ++i) {
                    if (data.childrenProps.timeValidate[i].key === 'startTime') {
                      value =data.childrenProps.timeValidate[i].value;
                    }
                  }
                  const confirmHandle = (value) => {
                    for (let i = 0; i < (data.childrenProps.timeValidate || []).length; ++i) {
                      if (data.childrenProps.timeValidate[i].key === 'startTime') {
                        data.childrenProps.timeValidate[i].value = value;
                      }
                    }
                    mainEvent.emit('dataChange', mainEvent.store.data);
                  };
                  return h('div',
                      {
                        className: ['date-validate-box'],
                      }, [
                        h('span', {}, [item.name + ':']),
                        new Datepicker({props: {
                            ...data.childrenProps,
                            value,
                          }, confirmHandle}).$el,
                      ]
                  );
                }
                if (item.key === 'endTime') {
                  let value = '';
                  for (let i = 0; i < (data.childrenProps.timeValidate || []).length; ++i) {
                    if (data.childrenProps.timeValidate[i].key === 'endTime') {
                      value =data.childrenProps.timeValidate[i].value;
                    }
                  }
                  const confirmHandle = (value) => {
                    for (let i = 0; i < (data.childrenProps.timeValidate || []).length; ++i) {
                      if (data.childrenProps.timeValidate[i].key === 'endTime') {
                        data.childrenProps.timeValidate[i].value = value;
                      }
                    }
                    mainEvent.emit('dataChange', mainEvent.store.data);
                  };
                  return h('div',
                      {
                        className: ['date-validate-box'],
                      }, [
                        h('span', {}, [item.name + ':']),
                        new Datepicker({props: {
                            ...data.childrenProps,
                            value,
                          }, confirmHandle}).$el,
                      ]
                  );
                }
              })
            ]
        )
      ]
  )
};
