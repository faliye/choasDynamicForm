import $ from 'jquery'
import _ from 'lodash'
import {$createElement as h} from '../../utils/$createElement';
import sizeConfig from "../../config/size.config";
import './fakeTableBox.scss'


const tdWidth = sizeConfig.midLeftTd.width;
const tdHeight = sizeConfig.midLeftTd.height;

export const fakeTableBox = (storeData) => {
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
    width: '100%',
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
        tdChildren = h(childrenProps.tagName, {props: {parentTdNode, location, childrenTdNode,insertType, ...childrenProps}});
      }
      const borderTopWidth = _.get(childrenProps, 'style.borderTopWidth', '1');
      const borderTopStyle = _.get(childrenProps, 'style.borderTopStyle', 'solid');
      const borderTopColor = _.get(childrenProps, 'style.borderTopColor', '#000');
      const borderRightWidth = _.get(childrenProps, 'style.borderRightWidth', '1');
      const borderRightStyle = _.get(childrenProps, 'style.borderRightStyle', 'solid');
      const borderRightColor = _.get(childrenProps, 'style.borderRightColor', '#000');
      const borderBottomWidth = _.get(childrenProps, 'style.borderBottomWidth', '1');
      const borderBottomStyle = _.get(childrenProps, 'style.borderBottomStyle', 'solid');
      const borderBottomColor = _.get(childrenProps, 'style.borderBottomColor', '#000');
      const borderLeftWidth = _.get(childrenProps, 'style.borderLeftWidth', '1');
      const borderLeftStyle = _.get(childrenProps, 'style.borderLeftStyle', 'solid');
      const borderLeftColor = _.get(childrenProps, 'style.borderLeftColor', '#000');
      const tdStyle = {
        position: 'relative',
        width: colSpan * tdWidth + (colSpan - 1) * 2 + parseInt(borderLeftWidth, 10) + parseInt(borderRightWidth, 10) + 'px',
        height: rowSpan * tdHeight + (rowSpan - 1) * 2 + parseInt(borderTopWidth, 10) + parseInt(borderBottomWidth, 10) + 'px',
        padding: 0,
        borderTop: `${borderTopWidth}px ${borderTopStyle} ${borderTopColor}`,
        borderRight: `${borderRightWidth}px ${borderRightStyle} ${borderRightColor}`,
        borderBottom: `${borderBottomWidth}px ${borderBottomStyle} ${borderBottomColor}`,
        borderLeft: `${borderLeftWidth}px ${borderLeftStyle} ${borderLeftColor}`,
      };
      const td = $('<td></td>');
      td.attr({colSpan, rowSpan})
          .css({tdStyle})
          .append($(tdChildren));
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
