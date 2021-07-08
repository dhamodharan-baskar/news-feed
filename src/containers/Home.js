import React, { Component } from 'react';
import NewsFeed from "../components/NewsFeed.js"
import Header from "../components/Header.js"
import ConfirmationModal from "../components/ConfirmationModal.js"
import { connect } from "react-redux";
import { getMessages, deleteMessage, showLoading } from "../redux/actions/messages"
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from "styled-components";
import Loader from "react-loader-spinner";
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false,
            selectMessageId: null,
            showLoadButton: false
        }
      }

    componentDidMount(){
        this.props.showLoading(true)
        this.props.getMessages()
    }

    fetchMoreData = () => {
        const{
            pageToken
        } = this.props
        if(pageToken){
            this.props.getMessages(pageToken)
        }
    }

    deleteMessage = (id) => {
        this.setState({isModalOpen: true, selectMessageId: id})
    }

    closeModal = () => {
        this.setState({isModalOpen: false, selectMessageId: null})
    }

    confirmDelete = () => {
        const element = document.getElementById(`content-view${this.state.selectMessageId}`);
        element.classList.remove("slides");
        element.classList.remove("slides-reverse");
        this.props.deleteMessage(this.state.selectMessageId)
        this.setState({isModalOpen: false, selectMessageId: null})
        this.checkScrollHeight()
    }

    checkScrollHeight = () => {
        const element = document.getElementById(`container`);
        const newsfeed = document.getElementById(`newsfeed`);
        if(element.offsetHeight > newsfeed.scrollHeight){
            this.setState({showLoadButton: true})
        }
        else{
            this.setState({showLoadButton: false})
        }
    }

    

    render() { 
        const {
            messages,
            pageToken,
            showLoader
        } = this.props
        const {
            isModalOpen,
            showLoadButton
        } = this.state
        if(showLoader){
            return (
            <LoaderOveriew> 
                <Loader
                    type="Circles"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} />
            </LoaderOveriew>
            )
        }   
        else{
            return (
                <Overiew id="container">
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
                        style={{backgroundColor: 'rgb(235, 239, 243)'}}
                        hasMore={true}>
                        <MessageFeed id="newsfeed">
                            {messages.map((message) => {
                                return(<NewsFeed 
                                        deleteMessage = {this.deleteMessage}
                                        id={message.id} 
                                        message={message} />)})
                            }
                        </MessageFeed>
                    </InfiniteScroll>
                    <>
                     {pageToken && 
                     <>
                     {
                        showLoadButton ? 
                        <LoadButtonView>
                            <LoadButton type="submit" onClick={() => this.fetchMoreData()}>Load more messages</LoadButton>
                        </LoadButtonView>
                        :
                        <Loading >
                            <Loader
                            type="TailSpin"
                            color="#00BFFF"
                            height={40}
                            width={40}
                            timeout={3000} />
                        </Loading>
                    }
                     </>
                    }
                    </>
                </Overiew>  
            )
        }
        
    }
}

 const mapDispatchToProps = dispatch => ({
    getMessages: token => dispatch(getMessages(token)),
    deleteMessage: id => dispatch(deleteMessage(id)),
    showLoading: bool => dispatch(showLoading(bool)),
  });
  
  const mapStateToProps = state => ({
    messageId: state.messages.messageId,
    messages: state.messages.messages,
    pageToken: state.messages.pageToken,
    showLoader: state.messages.loading
  });

  
export default connect(mapStateToProps, mapDispatchToProps)(Home)

const MessageFeed = styled.div`
    margin-top: 74px;
`
const LoaderOveriew = styled.div`
    background-color: rgb(235, 239, 243);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center
`

const Loading = styled.div`
    font-size: 14px;
    color: #12344D;
    display: flex;
    justify-content: center;
    cursor: pointer;
    background-color: rgb(235, 239, 243);
    padding-bottom: 24px;
`

const Overiew = styled.div`
    background-color: rgb(235, 239, 243);
    height: 100vh;
`
const LoadButtonView = styled.div`
  display: flex;
  justify-content: center;
`

const LoadButton = styled.button`
    margin: 12px;
    cursor: pointer;
    border: 1px solid #CFD7DF;
    border-radius: 4px;
    box-shadow: 0 0 white;
    width: auto;
    font-weight: 600;
    padding: 0 10px;
    position: relative;
    text-align: center;
    color: #12344D;
    font-size: 14px;
    opacity: 1;
    height: 32px;
    background: linear-gradient(180deg,#FFFFFF 0%,#F3F5F7 100%);
`

