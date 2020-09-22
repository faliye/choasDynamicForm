import $ from 'jquery'
import {$createElement as h} from '../../utils/$createElement';
import eventBus from "../../mainEvent";
import leftNavConfig from "../../config/leftNavConfig";
import '../../assets/iconFont/iconFont.scss';
import './index.scss';


const createLeftNav = (mountDOM,mode,themeConfig) => {
  if(mode!=='design'){
    return null
  }
  const {mode: themeMode} = themeConfig;
  const { borderColor,shadowColor,fontColor, primary,hoverColor, } = themeConfig.colorConfig[themeMode];

  const leftNav = h('div', {
        className: ['left-nav'],
        style: {
          width: themeConfig.sizeConfig.leftWidth + 'px',
          borderRight: `1px solid ${borderColor}`
        },
      },
      [
        h('div',
            {
              className: ['left-nav-title'],
              style: {
                border: `1px solid ${borderColor}`,
                background: shadowColor,
              },
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
                style:{
                  border: `1px solid ${borderColor}`,
                },
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
                      style:{
                        border: `1px solid ${borderColor}`,
                      },
                    },
                    [
                      h('div',
                          {
                            className: ['type-rows'],
                            style:{
                              borderBottom: `1px solid ${borderColor}`,
                            },
                            on:{
                              click: ()=>{
                                const childrenArr = $('.type-check-box');
                                childrenArr[index].style.display = 'none';
                                let type= 'row';
                                if(leftNav.componentName === 'TitleBox'){
                                  type = '';
                                }
                                eventBus.emit('addElement',{componentName: leftNav.componentName, type})
                              },
                              mouseenter(){
                                $(this).css({
                                  background: primary,
                                  color: hoverColor,
                                })
                              },
                              mouseleave(){
                                $(this).css({
                                  background: background,
                                  color:fontColor,
                                })
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
                                let type= 'col';
                                if(leftNav.componentName === 'TitleBox'){
                                  type = '';
                                }
                                eventBus.emit('addElement',{componentName: leftNav.componentName, type})
                              },
                              mouseenter(){
                                $(this).css({
                                  background: themeConfig.colorConfig[themeMode].primary,
                                  color: themeConfig.colorConfig[themeMode].hoverColor,
                                });
                              },
                              mouseleave(){
                                $(this).css({
                                  background: themeConfig.colorConfig[themeMode].background,
                                  color:themeConfig.colorConfig[themeMode].fontColor,
                                });
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
  mountDOM.append(leftNav);
};

export default createLeftNav;
