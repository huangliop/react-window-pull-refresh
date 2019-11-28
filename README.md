# react-window-pull-refresh

[![npm package][npm-badge]][npm]

该组件为移动端列表展示组件，基于[react-window](https://github.com/bvaughn/react-window).并添加了下拉刷新和分页加载功能。

效果见[Demo](https://huangliop.github.io/react-window-pull-refresh/)

## 安装

`npm install react-window-pull-refresh --save`

## 必传参数

|名称|类型|说明|
|--|--|--|
|isNextPageLoading|bool|是否正在远程获取下一页数据|
|items|array|需要展示的数据的列表数组|
|itemRender|function|每项渲染函数的回调`function(item,index,style)`|
|loadNextPage|function|加载下一页的函数回调`(startIndex: number, stopIndex: number) => Promise<void>`,必须返回Promise对象|
|itemHeight|number 或者 function |每项的显示高度,function是用于每项高度不固定的情况|


## 可选参数

|名称|类型|说明|
|--|--|--|
|total|number|显示数据的总长度,默认9999
|width|number|列表展示的宽度
|height|number|列表容器的高度,如果不传，组件会填充父元素，建议父元素使用flex布局|
|initialScrollOffset|number|列表初始展示的滚动位置，可以配合onScroll做到返回该页面，记录上次滚动的位置|
|onScroll|function|滚动的回调`function({scrollDirection,scrollOffset,scrollUpdateWasRequested})`|
|handlePullRefresh|function|下拉刷新的事件回调,如果不传就没有下拉刷新功能`function()`|
|emptyNode|React Node(React组件)|获取的数据为空时，展示的组件|
|listOtherProps|object|react-window组件的其他参数，[参见](https://react-window.now.sh/#/api/FixedSizeList),只支持FixedSizeList和VariableSizeList|

## 具体使用方法

更多具体使用方法请参考[Demo](demo/src/index.js)

## 注意事项

为了能够正确的计算滚动的高度，请在`itemRender`函数中将`style`设置到节点上，代码如下

```js
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
```

[npm-badge]: https://img.shields.io/npm/v/react-window-pull-refresh.svg
[npm]: https://www.npmjs.com/package/react-window-pull-refresh
