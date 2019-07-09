import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 *  触发刷新的滚动距离
 */
const TRIGGER_DISTANCE = 60;
/**
 * 文本内容的高度
 */
const TEXT_HEIGHT = 30;

//向下滚动
const DOWN = -1;
//向上滚动
const UP = 1;

export default class PullToRefresh extends Component {
    static propTypes = {
        disabled: PropTypes.bool, //是否不可用
        handleRefresh: PropTypes.func.isRequired // 刷新函数的回调，必须返回Promise
    };

    constructor(props) {
        super(props);
        this.pulling = false;
        this.startY = 0;
        this.scrollingDirection = 0;
        this.scrollingDistance = 0;

        this.ref = React.createRef();
        this.textRef = React.createRef();
    }
    onDown = evt => {
        this.pulling = true;
        this.startY = evt.touches[0].pageY;
    };
    onMove = evt => {
        if (this.pulling && !this.props.disabled) {
            this.scrollingDistance = evt.touches[0].pageY - this.startY;
            if (this.scrollingDistance < 0) {
                this.scrollingDirection = UP;
                return; //不能向下滚动
            }
            evt.stopPropagation();
            evt.preventDefault();
            this.scrollingDirection = DOWN;
            if (this.scrollingDistance > TRIGGER_DISTANCE) {
                this.textRef.current.innerText = '松开加载';
            } else {
                this.textRef.current.innerText = '下拉加载更多';
                this.textRef.current.style.transform=`translateY(${this.scrollingDistance}px)`
                this.ref.current.style.transform = `translateY(${this.scrollingDistance}px)`;
            }
        }
    };
    onUp = evt => {
        this.pulling = false;
        this.startY = 0;
        const elm = this.ref.current;
        const textElm = this.textRef.current;
        if (this.scrollingDirection === DOWN && this.scrollingDistance > TRIGGER_DISTANCE) {
            elm.style.transform = `translateY(${TEXT_HEIGHT}px)`;
            textElm.style.transform = `translateY(${TEXT_HEIGHT}px)`;
            textElm.innerText = '加载中';
            this.props.handleRefresh().then(() => {
                textElm.innerText = '下拉加载更多';

                textElm.style.transform = 'translateY(0px)';
                elm.style.transform = 'translateY(0px)';
            });
        } else {
            textElm.style.transform = 'translateY(0px)';
            elm.style.transform = 'translateY(0px)';
        }
    };
    componentDidMount() {
        this.ref.current.addEventListener('touchmove', this.onMove.bind(this));
        this.ref.current.addEventListener('touchstart', this.onDown.bind(this));
        this.ref.current.addEventListener('touchend', this.onUp.bind(this));
    }
    componentWillUnmount() {
        this.ref.current.removeEventListener('touchmove', this.onMove);
        this.ref.current.removeEventListener('touchstart', this.onDown);
        this.ref.current.removeEventListener('touchend', this.onUp);
    }
    render() {
        return (
            <div style={{position:'relative',overflow:'hidden'}}>
                <div
                    style={{
                        position:'absolute',
                        top: `-${TEXT_HEIGHT}px`,
                        height: `${TEXT_HEIGHT}px`,
                        left:0,
                        right:0,
                        color: '#666666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    ref={this.textRef}>
                    下拉加载更多
                </div>
                <div ref={this.ref} >
                {this.props.children}
                </div>
            </div>
        );
    }
}
