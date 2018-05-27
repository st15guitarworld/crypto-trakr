import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TabBarNav from './TabBarNav';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import {ListItem,List} from 'material-ui/List';
import {fetchNews} from "./actions";
import Avatar from 'material-ui/Avatar';

const mapStateToProps = (state,props) => {
  return {
      news:state.news.theNews.news,
      isLoading:state.news.theNews.isNewsFetching
  };
}

const mapDispatchToProps = dispatch => {
  return {
      fetchTheNews:(obj) => dispatch(fetchNews(obj))
  };
}

class NewsInner extends Component {
  render(){
    return (
      <div id="newsInner" style={{
        height: document.body.scrollHeight - 120 + "px",
        overflow:"scroll"
      }}>
      <List
        id="newsList"
        >
        {this.props.news.map((item,index)=>(
          <div key={item.id}>
          <ListItem primaryText={item.title} secondaryText={item.source}
            leftAvatar={<Avatar src={item.imageurl} size={50}/>}
            onClick={() => {
                this.props.history.push("newsDetail",{url:item.url})
            }}
          >
          </ListItem>
          <Divider />
          </div>
        ))}
      </List>
    </div>
    )
  }
}



class NewsContainer extends Component {
  componentWillMount(){
    this.props.fetchTheNews({lang:"EN"});
  }
render(){
  return (
    <div style={{
      height: document.body.scrollHeight - 120 + "px",
      overflow:"scroll"
    }}>
      <AppBar title="News" showMenuIconButton={false}/>
      <NewsInner {...this.props}/>
      <TabBarNav {...this.props}/>
    </div>
  );
}
}
const CnctedNewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsContainer)
export default CnctedNewsContainer;
