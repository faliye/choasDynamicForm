import {$createElement as h} from '../../utils/$createElement';
import {deepClone} from "../../utils";
import {fakeSearchBox} from "./fakeSearchBox";
import {fakeTableBox} from "./fakeTableBox";
import {fakePagination} from "./fakePagination";
import './index.scss'

const previewModal = (mountDOM, storeData, themeConfig = {}) => {

  const box= h('div',
      {
        className: ['preview-modal-content']
      },
      [
      ]
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
          background: 'rgba(0,0,0,0.4)'
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
              ['预览']
          ),
          box,
          h('div',
              {
                className: ['preview-modal-footer']
              },
              [
                h('button',
                    {
                      style: {
                        background: '#1780E3',
                        color: '#fff',
                        padding: '6px 14px'
                      },
                      on: {
                        click: () => {
                          modal.remove()
                        }
                      }
                    },
                    ['关闭']
                )
              ]
          ),
        ]
    )
  ]);
  mountDOM.appendChild(modal);

  const data = deepClone(storeData);
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
  box.appendChild(fakeSearchBox(searchData));
  box.appendChild(fakeTableBox(data));
  box.appendChild(fakePagination(data));
};

export default previewModal;
