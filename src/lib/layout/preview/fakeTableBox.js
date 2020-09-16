import {$createElement as h} from '../../utils/$createElement';
import {deepClone} from "../../utils";
import './fakeTableBox.scss'

export const fakeTableBox = (storeData) => {
  const data = deepClone(storeData);
  const table = h('table',
      {
        colSpan: 0,
        rowSpan: 0,
        cellPadding: 0,
        cellSpacing: 0,
        style: {
          borderCollapse: 'collapse',
        }
      },
      [
        ...data.map(item => {
              return h('tr',
                  {},
                  [
                    ...item.map(td => {
                      const {
                        location = [],
                        isEmpty = 0,
                        parentTdNode = [],
                        childrenTdNode = [],
                        childrenProps = {},
                        isHidden = 0,
                        colSpan = 1,
                        rowSpan = 1,
                        style,
                      } = td;
                      let tdStyle = {
                        // width: '140px',
                        // height: '32px',
                      };
                      let tdChildren = '';
                      if (!isEmpty) {
                        tdChildren = h(childrenProps.tagName, {
                          props: {
                            parentTdNode,
                            location,
                            childrenTdNode,
                            ...childrenProps
                          }, style: {
                            ...tdStyle,
                            ...style,
                          }
                        });
                        if (childrenProps.tagName === 'TitleBox') {
                          tdStyle = {
                            ...tdStyle,
                            background: "#f8f8f9",
                            color: '#515a6e',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }
                        }
                      }
                      return h('td', {
                        style: tdStyle,
                        colSpan,
                        rowSpan,
                      }, [
                        tdChildren
                      ])
                    })
                  ]
              )
            }
        )
      ]
  );
  return h('div',
      {
        className: ['table-box']
      },
      [
        h('button',
            {
              style: {
                background: '#1780E3',
                color: '#fff',
                padding: '4px 10px',
                margin: '8px 0',
                fontWeight: 'bold',
              },
              on: {
                click: () => {
                  const tr = h('tr', {}, [
                    ...data[data.length - 1].map(td => {
                      const {
                        location = [],
                        isEmpty = 1,
                        parentTdNode = [],
                        childrenTdNode = [],
                        childrenProps = {},
                        style,
                      } = td;
                      let tdStyle = {
                        // width: '140px',
                        // height: '32px',
                      };
                      let tdChildren = '';
                      if (!isEmpty) {
                        tdChildren = h(childrenProps.tagName, {
                          props: {
                            parentTdNode,
                            location,
                            childrenTdNode, ...childrenProps
                          }, style
                        });
                        if (childrenProps.tagName === 'TitleBox') {
                          tdStyle = {
                            ...tdStyle,
                            background: "#f8f8f9",
                            color: '#515a6e',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }
                        }
                      }

                      return h('td', {
                        style: tdStyle
                      }, [
                        tdChildren
                      ])
                    })
                  ]);
                  table.appendChild(tr)
                }
              }
            },
            ['新增']
        ),
        table
      ]
  );
};
