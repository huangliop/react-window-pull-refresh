import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import PullToRefresh from './PullToRefresh';

/**
 * @description 列表渲染器
 * @author Huang Li
 * @date 2019-05-31
 * @param {*} props 参数
 * @returns 组件
 */
const List = React.memo(
    ({
        total,
        isNextPageLoading,
        items=[],
        itemRender,
        height,
        loadNextPage,
        itemHeight,
        width,
        initialScrollOffset,
        onScroll,
        handlePullRefresh
    }) => {
        const [disablePull, setDisablePull] = useState(false);
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
                return (
                    <div style={mStyle}>
                            加载中。。。
                    </div>
                );
            }
        };
        const tempList= 
        (<InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
        {({ onItemsRendered, ref }) => (
            <FixedSizeList
                height={height}
                itemCount={itemCount}
                itemSize={itemHeight}
                ref={ref}
                initialScrollOffset={initialScrollOffset}
                onScroll={params => {
                    setDisablePull(params.scrollOffset !== 0);
                    onScroll&&onScroll(params);
                }}
                onItemsRendered={onItemsRendered}
                width={width}>
                {Row}
            </FixedSizeList>
        )}
        </InfiniteLoader>);
        return items.length === 0 ? (
            <EmptyData />
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
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: '100px',
                height: '30px',
                margin: 'auto',
                color: '#999999'
            }}>
            暂时没有数据
        </div>
    );
}
// List.propTypes = {
//     data: PropTypes.any,
//     total: PropTypes.number,
//     itemHeight: PropTypes.number,
//     loadMore: PropTypes.func
// };

export default List;
