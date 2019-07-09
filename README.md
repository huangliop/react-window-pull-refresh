# react-window-pull-refresh

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

该组件为列表展示组件，基于[react-window](https://github.com/bvaughn/react-window).并添加了下拉刷新和分页加载功能。

效果见[Demo](https://huangliop.github.io/react-window-pull-refresh/)

## 必传参数

|名称|类型|说明|
|--|--|--|
|isNextPageLoading|bool|是否正在远程获取下一页数据|
|items|array|需要展示的数据的列表数组|
|itemRender|function|每项渲染函数的回调`function(item,index,style)`|
|height|number|列表容器的高度|
|loadNextPage|function|加载下一页的函数回调`(startIndex: number, stopIndex: number) => Promise<void>`,必须返回Promise对象|
|itemHeight|number|每项的显示高度|


## 可选参数

|名称|类型|说明|
|--|--|--|
|total|number|显示数据的总长度,默认9999
|width|number|列表展示的宽度
|initialScrollOffset|number|列表初始展示的滚动位置，可以配合onScroll做到返回该页面，记录上次滚动的位置|
|onScroll|function|滚动的回调`function({scrollDirection,scrollOffset,scrollUpdateWasRequested})`|
|handlePullRefresh|function|下拉刷新的事件回调,如果不传就没有下拉刷新功能`function()`|

## 具体使用方法

更多具体使用方法请参考demo/src/index.js

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
