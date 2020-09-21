import {$createElement as h} from '../../utils/$createElement';
import $ from 'jquery'
import _ from 'lodash'
import {fakeSearchBox} from "./fakeSearchBox";
import {fakeTableBox} from "./fakeTableBox";
import {fakePagination} from "./fakePagination";
import './index.scss'

const previewModal = (mountDOM, storeData, themeConfig = {}) => {

  const box= h('div',
      {
        className: ['preview-modal-content']
      },
      []
  );

  const modal = h('div',
      {
        style:{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          zIndex: '999',
          background: 'rgba(0,0,0,0.4)',
          cursor: 'pointer',
        },
        title:'点击关闭预览',
        on:{
          click: ()=>{
            modal.remove();
          }
        }
      },
      [
    h('div',
        {
          className: ['preview-modal']
        },
        [
          h('div',
              {
                className: ['preview-modal-title']
              },
              ['预览表单']
          ),
          box,
        ]
    )
  ]);
  mountDOM.appendChild(modal);

  const data = _.cloneDeep(storeData);
  const searchData = [];
  for (let j=0; j<(data || []).length;++j){
    for (let i=0;i<(data[j] || []).length;++i){
      if(!data[j][i].isEmpty && data[j][i].childrenProps.tagName === 'TitleBox' && data[j][i].childrenProps.isSearch){
        const itemData = {
          cnName: data[j][i].childrenProps.cnName,
        };
        if(data[j][i].childrenProps.dataListId){
          itemData.tagName = 'Select'
        }
        if(data[j][i].childrenProps.timeValidate){
          itemData.tagName = 'Datepicker'
        }
        searchData.push(itemData)
      }
    }
  }
  $(box).append(fakeSearchBox(searchData),fakeTableBox(data),fakePagination(data));
};

export default previewModal;
