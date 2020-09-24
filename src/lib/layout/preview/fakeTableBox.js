import $ from 'jquery'
import _ from 'lodash'
import {$createElement as h} from '../../utils';
import './fakeTableBox.scss'




export const fakeTableBox = (storeData, themeConfig) => {
  const {tdInitWidth, tdInitHeight} = themeConfig.sizeConfig;
  const data = _.cloneDeep(storeData);
  const table = $('<table></table>');
  table.attr({
    colSpan: 0,
    rowSpan: 0,
    cellPadding: 0,
    cellSpacing: 0,
    border: '1'
  }).css({
    borderCollapse: 'collapse',
    width: data[0].length * 140
  });
  data.forEach(trData=>{
    const tr  = $('<tr></tr>');
    trData.forEach(tdData=>{
      const {
        insertType,
        rowSpan,
        colSpan,
        location = [],
        isHidden = 0,
        isEmpty = 1,
        parentTdNode = [],
        childrenTdNode = [],
        childrenProps = {},
      } = tdData;
      let tdChildren = '';
      if (!isEmpty) {
        tdChildren = h(childrenProps.tagName, {props: {parentTdNode, location, childrenTdNode,insertType, ...childrenProps},themeConfig});
      }
      const tdStyle = {
        width: colSpan*tdInitWidth + 'px',
        height: rowSpan * tdInitHeight + 'px',
      };
      const td = $('<td><div></div></td>');
      td.attr({colSpan, rowSpan}).children('div')
          .css({tdStyle});
      $(tdChildren).each((k,v)=>{
        td.append($(v));
      });
      if(isHidden){
        td.css({
          display: 'none'
        })
      }
      tr.append(td)
    });
    table.append(tr)
  });
  let wrap = h('div',
      {
        className: ['preview-table-box']
      },
      []
  );
  wrap = $(wrap);
  wrap.append(table);
  return wrap;
};
