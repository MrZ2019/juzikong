
import React from 'react'

import {Link} from 'react-router-dom'

import styles from './Home.css'
import './Home.less'

import List from '../components/List'

class HomePage extends React.PureComponent {
    
    render() {
        const Grid = (
            <div className="grid">
                <div className="row">
                    <Link to="/">最新文章</Link>
                    <Link to="/">名人名言</Link>
                    <Link to="/">推荐专辑</Link>
                </div>
                <div className="row">
                    <Link to="/">电影台词</Link>
                    <Link to="/">动漫台词</Link>
                    <Link to="/">小说摘抄</Link>
                </div>
            </div>
        )

        const Channel = (
            <div class="channel">
                <div className="title-box">
                    <span className="title">句子分类</span>
                    <Link to="/channels">更多</Link>
                </div>
                <div className="sub-title">猜你喜欢</div>
                <div className="sub">
                    <Link to="/tags/爱情">爱情</Link>
                    <Link to="/tags/伤感">伤感</Link>
                    <Link to="/tags/励志">励志</Link>
                    <Link to="/tags/唯美">唯美</Link>
                    <Link to="/tags/搞笑">搞笑</Link>
                    <Link to="/tags/生活">生活</Link>
                    <Link to="/tags/青春">青春</Link>
                    <Link to="/tags/时间">时间</Link>
                    <Link to="/tags/古风">古风</Link>
                    <Link to="/tags/优美">优美</Link>
                    <Link to="/tags/梦想">梦想</Link>
                    <Link to="/tags/笑话">笑话</Link>
                    <Link to="/tags/成长">成长</Link>
                    <Link to="/tags/古诗">古诗</Link>
                    <Link to="/tags/朋友">朋友</Link>
                    <Link to="/tags/哲理">哲理</Link>
                </div>
                <div className="sub-title">句子源于</div>
                <div className="sub sub-b">
                    <Link to="/tags/散文美句">散文美句</Link>
                    <Link to="/tags/古诗词">古诗词</Link>
                    <Link to="/tags/电影台词">电影台词</Link>
                    <Link to="/tags/小说摘抄">小说摘抄</Link>
                    <Link to="/tags/动漫台词">动漫台词</Link>
                    <Link to="/tags/电视剧台词">电视剧台词</Link>
                </div>
            </div>
        )

        return (<div className="container">
            <div className="left-box">
                {Grid}
                <List title="123"></List>
                </div>
            <div className="right-box">{Channel}</div>
            
            </div>)
    }
}

export default HomePage;