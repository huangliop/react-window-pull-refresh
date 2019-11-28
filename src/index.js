import React, { useState,useRef } from 'react';
import { FixedSizeList,VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import PullToRefresh from './PullToRefresh';
import useComponentSize from '@rehooks/component-size';
import PropTypes from 'prop-types';

/**
 * @description 列表渲染器
 * @author Huang Li
 * @date 2019-05-31
 * @param {*} props 参数
 * @returns 组件
 */
const List = React.memo(
    ({
        total=9999,
        isNextPageLoading,
        items=[],
        itemRender,
        height,
        loadNextPage,
        itemHeight,
        width,
        initialScrollOffset,
        onScroll,
        handlePullRefresh,
        emptyNode,
        loadingNode,

        listOtherProps
    }) => {
        const [disablePull, setDisablePull] = useState(false);
        const ref = useRef(null);
        const hasNextPage=items.length<total;
        const itemCount = hasNextPage ? items.length + 1 : items.length;
        const loadMoreItems = isNextPageLoading ? undefined : loadNextPage;
        const isItemLoaded = index => !hasNextPage || index < items.length;
        const Row = props => {
            const { index, style } = props;
            if (isItemLoaded(index)) {
                return itemRender(items[index],index,style);
            } else {
                const mStyle={
                    ...style,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
                return (<div style={mStyle}>
                            {loadingNode||'加载中。。。'}
                    </div>
                );
            }
        };
        const h = useComponentSize(ref).height;
        const tempList= 
        (<div ref={ref} style={{ flex: '1',height:'100%' }}><InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
        {({ onItemsRendered, ref }) => {
            if (typeof itemHeight==='function') {
               return  <VariableSizeList
                    height={height||h}
                    itemCount={itemCount}
                    itemSize={itemHeight}
                    ref={ref}
                    initialScrollOffset={initialScrollOffset}
                    onScroll={params => {
                        setDisablePull(params.scrollOffset !== 0);
                        onScroll&&onScroll(params);
                    }}
                    onItemsRendered={onItemsRendered}
                    width={width}
                    {...listOtherProps} >
                    {Row}
                </VariableSizeList>
            } else {
              return  <FixedSizeList
                    height={height||h}
                    itemCount={itemCount}
                    itemSize={itemHeight}
                    ref={ref}
                    initialScrollOffset={initialScrollOffset}
                    onScroll={params => {
                        setDisablePull(params.scrollOffset !== 0);
                        onScroll&&onScroll(params);
                    }}
                    onItemsRendered={onItemsRendered}
                    width={width}
                    {...listOtherProps} >
                    {Row}
                </FixedSizeList>                
            }

        }}
        </InfiniteLoader></div>);
        return items.length === 0 ? (
            handlePullRefresh?(
                <PullToRefresh  handleRefresh={handlePullRefresh}>
                {emptyNode||<EmptyData />}
            </PullToRefresh>
            ):emptyNode||<EmptyData />
        ) : (
            handlePullRefresh?<PullToRefresh disabled={disablePull} handleRefresh={handlePullRefresh}>
               {tempList}
            </PullToRefresh>:tempList
        );
    }
);
function EmptyData() {
    return (
        <div
            style={{
                margin: 'auto',
                color: '#999999',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            暂时没有数据
        </div>
    );
}
List.propTypes = {
    isNextPageLoading:PropTypes.bool.isRequired,
    itemRender:PropTypes.func.isRequired,
    loadNextPage:PropTypes.func.isRequired,
    item:PropTypes.array,
    itemHeight:PropTypes.oneOfType([PropTypes.number,PropTypes.func]),
    height:PropTypes.number,
    width:PropTypes.number,
    total:PropTypes.number,
    initialScrollOffset:PropTypes.number,
    onScroll:PropTypes.func,
    handlePullRefresh:PropTypes.func,
    emptyNode:PropTypes.node,
    listOtherProps:PropTypes.object
};
export {PullToRefresh}
export default List;
