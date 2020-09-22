import $ from 'jquery';
import eventBus from "../../mainEvent";
import {$createElement as h} from "../../utils";
import './index.scss'

const createRightTable = (mountDOM, mode, themeConfig = {}) => {
  if (mode !== 'design') {
    return null
  }
  const {mode: themeMode} = themeConfig;
  const {borderColor, fontColor, primary, hoverColor} = themeConfig.colorConfig[themeMode];
  const mountRightBox = h('div',
      {
        className: ['right-box'],
        style: {
          width: themeConfig.sizeConfig.rightWidth - 1 + 'px',
          height: 100 % +'px',
          borderLeft: `1px solid ${borderColor}`,
        }
      },
      [
        h('div',
            {
              className: ['tab-btn-box'],
              style: {
                height: themeConfig.sizeConfig.topBarHeight + 'px',
                borderBottom: `1px solid ${borderColor}`,
              }
            },
            ['标题属性', '组件属性'].map((item, index) => {
              return h('button',
                  {
                    className: ['right-tab-btn'],
                    style: {
                      // color: hoverColor,
                      background: hoverColor
                    },
                    on: {
                      click() {
                        eventBus.emit('toggleTab', index);
                        $('.right-tab-btn')
                            .css({borderBottom: 'none'})
                            .eq(index)
                            .css({
                              borderBottom: `2px solid ${primary}`
                            });
                      },
                    }
                  },
                  [
                    item
                  ])
            })
        ),
        h('div',
            {
              className: ['tab-box'],
              style: {
                color: fontColor,
                paddingLeft: 5 + 'px',
              },
            },
            []
        )
      ]
  );
  $(mountDOM).append(mountRightBox);
}

export default createRightTable
