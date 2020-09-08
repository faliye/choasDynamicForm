import {$createElement as h} from '../../utils/$createElement';
import "./fakeSearchBox.scss";

export const fakeSearchBox = (data) => {
  return h('div',
      {
        className: ['search-box']
      },
      [
        h('div',
            {},
            [
              ...data.map(item => {
                if (!item.tagName) {
                  return h('div',
                      {
                        className: ['search-box-item']
                      },
                      [
                        h('span', {}, [item.cnName+":"]),
                        h('input', {placeholder: '请输入搜索内容'})
                      ]
                  )
                }
              }),
              h('div',
                  {
                    className: ['search-box-item'],
                    style: {
                      width: (4 - data.length%4) * 25 +'%'
                    }
                  },
                  [
                    h('button',
                        {
                          style:{
                            background: '#1ac756',
                            color: '#fff',
                            padding: '4px 10px',
                            fontWeight: 'bold'
                          }
                        } ,
                        ['搜索']
                    ),
                    h('button',
                        {
                          style:{
                            background: '#1780E3',
                            color: '#fff',
                            padding: '4px 10px',
                            marginLeft: '8px',
                            fontWeight: 'bold'
                          }
                        } ,
                        ['重置']
                    )
                  ]
              )

            ]
        )
      ]
  );
};
