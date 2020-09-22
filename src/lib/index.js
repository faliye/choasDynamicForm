import _ from 'lodash';
import $ from 'jquery';
import theme from "./theme";
import createLeftNav from "./layout/leftNav";
import createRightTable from "./layout/rightNav";
import createMidBox from "./layout/midBox";

class DynamicForm{
  constructor(initConfig={},themeConfig={}) {
    const  {mountId, saveDraftHandle, saveFileHandle, mode = 'design'} = initConfig;
    this.$mountDOM =$(mountId);
    this.setMountDOMCss();
    this.mode= mode;
    this.themeConfig = _.merge(theme,themeConfig);
    this.createLayout()
  }

  createLayout(){
    createLeftNav(this.$mountDOM,this.mode,this.themeConfig);
    createMidBox(this.$mountDOM,this.mode,this.themeConfig);
    createRightTable(this.$mountDOM,this.mode,this.themeConfig);
  }


  setMountDOMCss(){
    if(!this.$mountDOM.length){
      throw new Error('挂载节点不能为空!');
    }
    this.$mountDOM.css({
      display: 'flex',
      flexWrap: 'no-wrap',
    });
  }



}


export default DynamicForm;
