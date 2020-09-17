import {$createElement as h} from "../../../utils/$createElement";
import './index.scss'
import {Datepicker} from "../../../components/datepicker";
import mainEvent from "../../../mainEvent";

export const createDatepicker = (data) => {
  return h('div',
      {
        className: ['datepicker-tab-box']
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
                  let value = '';
                  for (let i = 0; i < (data.childrenProps.timeValidate || []).length; ++i) {
                    if (data.childrenProps.timeValidate[i].key === 'defaultValue') {
                      value = data.childrenProps.timeValidate[i].value;
                    }
                  }
                  const confirmHandle = (value) => {
                    for (let i = 0; i < (data.childrenProps.timeValidate || []).length; ++i) {
                      if (data.childrenProps.timeValidate[i].key === 'defaultValue') {
                        data.childrenProps.timeValidate[i].value = value;
                      }
                    }
                    mainEvent.emit('dataChange', mainEvent.store.data);
                  };
                  return h('div',
                      {
                        className: ['datepicker-box-item'],
                      }, [
                        h('span', {}, [item.name + ':']),
                        new Datepicker({
                          props: {
                            ...data.childrenProps,
                            value,
                            right: true
                          }, confirmHandle
                        }).$el,
                      ]
                  );
                }
                if (item.key === 'startTime') {
                  let value = '';
                  for (let i = 0; i < (data.childrenProps.timeValidate || []).length; ++i) {
                    if (data.childrenProps.timeValidate[i].key === 'startTime') {
                      value = data.childrenProps.timeValidate[i].value;
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
                        className: ['datepicker-box-item'],
                      }, [
                        h('span', {}, [item.name + ':']),
                        new Datepicker({
                          props: {
                            ...data.childrenProps,
                            value,
                            right: true
                          }, confirmHandle
                        }).$el,
                      ]
                  );
                }
                if (item.key === 'endTime') {
                  let value = '';
                  for (let i = 0; i < (data.childrenProps.timeValidate || []).length; ++i) {
                    if (data.childrenProps.timeValidate[i].key === 'endTime') {
                      value = data.childrenProps.timeValidate[i].value;
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
                        className: ['datepicker-box-item'],
                      }, [
                        h('span', {}, [item.name + ':']),
                        new Datepicker({
                          props: {
                            ...data.childrenProps,
                            value,
                            right: true
                          }, confirmHandle
                        }).$el,
                      ]
                  );
                }
              })
            ]
        )
      ]
  )
};
