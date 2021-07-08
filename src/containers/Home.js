import React, { Component } from 'react';
import NewsFeed from "../components/NewsFeed.js"
import Header from "../components/Header.js"
import ConfirmationModal from "../components/ConfirmationModal.js"
import { connect } from "react-redux";
import { getMessages, deleteMessage } from "../redux/actions/messages"
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from "styled-components";

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false
        }
      }

    componentDidMount(){
        this.props.getMessages()
    }

    fetchMoreData = () => {
        this.props.getMessages(this.props.pageToken)
    }

    deleteMessage = (id) => {
        this.setState({isModalOpen: true})
    }

    closeModal = () => {
        this.setState({isModalOpen: false})
    }

    confirmDelete = () => {
        this.setState({isModalOpen: false})
    }

    render() { 
        const {
            messages
        } = this.props
        const {
            isModalOpen
        } = this.state
        return (
            <Overiew>
                <Header />
                {
                    isModalOpen && <ConfirmationModal 
                    isOpen={isModalOpen}
                    onSubmit={this.confirmDelete}
                    onRequestClose={this.closeModal}/>
                }
                <InfiniteScroll 
                    dataLength={messages.length} 
                    next={this.fetchMoreData} 
                    hasMore={true}>
                    <MessageFeed>
                        {messages.map((message) => {
                            return(<NewsFeed 
                                    deleteMessage = {this.deleteMessage}
                                    id={message.id} 
                                    message={message} />)})
                        }
                    </MessageFeed>
                </InfiniteScroll>
                <div onClick={() => this.fetchMoreData()}> load more options</div>
            </Overiew>  
        )
    }
}

 const mapDispatchToProps = dispatch => ({
    getMessages: token => dispatch(getMessages(token)),
    deleteMessage: id => dispatch(deleteMessage(id))
  });
  
  const mapStateToProps = state => ({
    messageId: state.messages.messageId,
    messages: state.messages.messages,
    pageToken: state.messages.pageToken
  });

  
export default connect(mapStateToProps, mapDispatchToProps)(Home)

const MessageFeed = styled.div`
    margin-top: 74px;
`
const Overiew = styled.div`
    background-color: rgb(235, 239, 243);
`

