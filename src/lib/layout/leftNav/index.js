import {$getEle} from '../../utils';
import $ from 'jquery'
import {$createElement as h} from '../../utils/$createElement';
import eventBus from "../../mainEvent";
import leftNavConfig from "../../config/leftNavConfig";
import sizeConfig from "../../config/size.config";


const createLeftNav = (mountDOM, themeConfig) => {
  const leftNav = h('div', {
        className: ['left-nav'],
        style: {
          width: sizeConfig.leftNav.width + 'px',
        },
      },
      [
        h('div',
            {
              className: ['left-nav-title'],
            },
            [
                h('i',
                    {
                      className: ["iconfont", "icon-zhengfangti"]
                    }),
                h('span',{},['表单组件'])
            ]
        ),
        ...leftNavConfig.map((leftNav,index) => {
          return h('div',
              {
                className: ['left-nav-item'],
                on: {
                  mouseenter:()=>{
                    const childrenArr = $('.type-check-box');
                    let len = childrenArr.length;
                    for ( let i = 0;i<len;++i){
                      childrenArr[i].style.display = 'none';
                    }
                    childrenArr[index].style.display = 'block'
                  },
                  mouseleave:()=>{
                    const childrenArr = $('.type-check-box');
                    let len = childrenArr.length;
                    for ( let i = 0;i<len;++i){
                      childrenArr[i].style.display = 'none';
                    }
                  }
                }
              },
              [
                h('i',
                    {
                      className: leftNav.prefixClass,
                    }
                ),
                h('span',
                    {
                      className: ['left-nav-item-list']
                    },
                    [
                      leftNav.title
                    ]
                ),
                h('i',
                    {
                      className: leftNav.behindClass,
                    },
                    []
                ),
                h('div',
                    {
                      className: ['type-check-box'],
                    },
                    [
                      h('div',
                          {
                            className: ['type-rows'],
                            on:{
                              click: ()=>{
                                const childrenArr = $('.type-check-box');
                                childrenArr[index].style.display = 'none';
                                eventBus.emit('addElement',{componentName: leftNav.componentName, type: 'row'})
                              }
                            }
                          },
                          ['左右布局']
                      ),
                      h('div',
                          {
                            className: ['type-rows'],
                            on:{
                              click: ()=>{
                                const childrenArr = $('.type-check-box');
                                childrenArr[index].style.display = 'none';
                                eventBus.emit('addElement',{componentName: leftNav.componentName, type: 'col'})

                              }
                            }
                          },
                          ['上下布局']
                      )
                    ]
                )
              ])
        })
      ]);
  mountDOM.appendChild(leftNav);
};

export default createLeftNav;
