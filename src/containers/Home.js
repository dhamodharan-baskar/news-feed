import React, { Component } from 'react';
import NewsFeed from "../components/NewsFeed.js"
import Header from "../components/Header.js"
import { connect } from "react-redux";
import { getMessages } from "../redux/actions/messages"
import InfiniteScroll from 'react-infinite-scroll-component';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
      }

    componentDidMount(){
        this.props.getMessages()
    }

    fetchMoreData = () => {
        this.props.getMessages(this.props.pageToken)
    }

    render() { 
        const {
            messages
        } = this.props
        return (
            <div id="feed-list-overview" draggable={false}>
                <Header />
                <InfiniteScroll
                    dataLength={messages.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}>
                {
                    messages.map((item) => {
                        return <NewsFeed id={item.id} message={item} />
                    })
                }
                </InfiniteScroll>
                <div onClick={() => this.fetchMoreData()}> load more options</div>
            </div>  
        )
    }
}

 const mapDispatchToProps = dispatch => ({
    getMessages: token => dispatch(getMessages(token)),

  });
  
  const mapStateToProps = state => ({
    messageId: state.messages.messageId,
    messages: state.messages.messages,
    pageToken: state.messages.pageToken
  });

  
export default connect(mapStateToProps, mapDispatchToProps)(Home)
