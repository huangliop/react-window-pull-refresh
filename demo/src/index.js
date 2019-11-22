import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  constructor(props){
    super(props)
    this.state={list:[],loading:false}
  }
  componentDidMount(){
    //第一次加载数据
    this.loadNextPage(0,10);
  }
  render() {
    const isMobile=/Mobile/.test(window.navigator.userAgent)
    return <div style={{position:'absolute',left:0,top:0,right:0,left:0,bottom:0,display:'flex',flexDirection:'column'}}>
      <h1 style={{textAlign:'center',margin:0,}}>下拉刷新Demo</h1>
      {isMobile?<Example  total={55} 
                items={this.state.list} 
                isNextPageLoading={this.state.loading} 
                loadNextPage={this.loadNextPage} 
                itemHeight={()=>80}
                // height={500}
                handlePullRefresh={this.handleRefresh}
                itemRender={this.itemRender}>
      </Example>:
      <h2 style={{textAlign:'center'}}>
        切换导手机模式，下拉刷新才有效
      </h2>
      }
    </div>
  }
  itemRender=(item,index,style)=>{
    const myStyle={
      ...style,
      backgroundColor:index%2?'#ffffff':'#e2e2e2',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }
    return (
      <div style={myStyle}>
        {index}: {item}
      </div>
    )
  }
  loadNextPage=(startIndex, stopIndex)=>{
      console.log(`loading ${startIndex}-${stopIndex}`);
      this.setState({loading:true});
      setTimeout(() => {
        const datas=[];
        for (let index = 0; index < 10; index++) {
          datas.push(`内容${index}`);
        }
        this.setState({loading:false,list:this.state.list.concat(datas)});
      }, 3000);
  }
  handleRefresh=()=>{
    return new Promise(res=>{
      console.log(`refreshing`);
      setTimeout(() => {
        const datas=[];
        for (let index = 0; index < 10; index++) {
          datas.push(`内容${index}`);
        }
        this.setState({list:datas});
        res();
      }, 3000);
    });
  }
}


render(<Demo/>, document.querySelector('#demo'))
