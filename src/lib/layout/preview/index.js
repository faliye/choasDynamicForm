import {$createElement as h} from '../../utils';
import $ from 'jquery'
import _ from 'lodash'
import {fakeSearchBox} from "./fakeSearchBox";
import {fakeTableBox} from "./fakeTableBox";
import {fakePagination} from "./fakePagination";
import './index.scss'

const previewModal = (mountDOM, storeData, themeConfig = {}) => {
  const {mode: themeMode} = themeConfig;
  const {primary, danger, borderColor, shadowColor} = themeConfig.colorConfig[themeMode];
  const box = h('div',
      {
        className: ['preview-modal-content'],
        style: {
          border: `1px solid ${borderColor}`,
        }
      },
      []
  );

  const modalWrap = h('div',
      {
        style: {
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          zIndex: '999',
          background: 'rgba(0,0,0,0.4)',
          cursor: 'pointer',
        },
        title: '点击关闭预览',
        on: {
          click: () => {
            modalWrap.remove();
          }
        }
      },
      [

      ]);
  const modal = h('div',
      {
        className: ['preview-modal'],
        style: {
          border: `1px solid ${borderColor}`,
          boxShadow: `1px 1px 10px ${shadowColor}`,
        }
      },
      [
        h('div',
            {
              className: ['preview-modal-title']
            },
            ['预览表单']
        ),
      ]
  );

  const data = _.cloneDeep(storeData);
  const searchData = [];
  for (let j = 0; j < (data || []).length; ++j) {
    for (let i = 0; i < (data[j] || []).length; ++i) {
      if (!data[j][i].isEmpty && data[j][i].childrenProps.tagName === 'TitleBox' && data[j][i].childrenProps.isSearch) {
        const itemData = {
          cnName: data[j][i].childrenProps.cnName,
        };
        if (data[j][i].childrenProps.dataListId) {
          itemData.tagName = 'Select'
        }
        if (data[j][i].childrenProps.timeValidate) {
          itemData.tagName = 'Datepicker'
        }
        searchData.push(itemData)
      }
    }
  }
  box.append(fakeSearchBox(searchData,themeConfig),fakeTableBox(data, themeConfig),fakePagination(data,themeConfig));
  modal.append(box);
  modalWrap.append(modal);
  mountDOM.append(modalWrap);
};

export default previewModal;
