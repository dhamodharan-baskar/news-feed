import React , { Component } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { showDeleteOption } from "../redux/actions/messages"
import { APP_URL } from '../constants'
import DeleteIcon from "../icons/DeleteIcon.js"

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragged: false,
            showDelete: false,
        };
      }
    
    componentWillReceiveProps(nextProps){
        const{
            messageId,
            id
        } = nextProps
        if(messageId !== id && this.state.showDelete){
            this.setState({showDelete: true}, () => this.handleClick())
        }
    }

    handleClick = () => {
        const {
            id,
        } = this.props
        const element = document.getElementById(`content-view${id}`);
        if(this.state.showDelete){
            element.classList.remove("slides");
            element.classList.add("slides-reverse");
        }
        else{
            element.classList.remove("slides-reverse")
            element.classList.add("slides");
        }
    }

    showDeleteOption = (id, e) => {
        e.preventDefault() 
        this.handleClick()
        this.props.showDeleteOption(id)
        this.setState({showDelete: !this.state.showDelete})
    }

    getYear = (date) => {
        return <div>{`${new Date().getFullYear() - new Date(date).getFullYear()} years ago`}</div>
    }

    render() {
        const {
            id,
            message,
            messageId
        } = this.props
        return (
            <ContentOverview>
                {
                    (this.state.showDelete && (messageId === id)) && 
                    <DeleteOption onClick={() => this.props.deleteMessage(id)}>
                        <DeleteIcon />
                    </DeleteOption>
                }
                <FeedContent 
                    onClick={(e) => this.showDeleteOption(id, e)} 
                    onTouchEnd={(e) => this.showDeleteOption(id, e)}
                    id={`content-view${id}`}>
                        <HeaderView>
                            <Image 
                            src={`${APP_URL}${message.author.photoUrl}`}
                            alt="img"
                            />
                            <InfoView>
                                <Name>{message.author.name}</Name>
                                <Year>{this.getYear(message.updated)}</Year>
                            </InfoView>
                        </HeaderView>
                    <MessageContent>
                        {message.content}
                    </MessageContent>
                </FeedContent>
            </ContentOverview>
        )
    }
}  
const mapDispatchToProps = dispatch => ({
    showDeleteOption: id => dispatch(showDeleteOption(id))
  });
  
  const mapStateToProps = state => ({
    messageId: state.messages.messageId
  });

  
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)


const ContentOverview = styled.div`
    width: auto; 
    display: flex;
    margin: 24px;
    overflow: hidden;
    padding: 12px;
    background: white;
    box-shadow: 0 1px 3px 0 rgb(18 52 77 / 20%) !important;
    border: none;
    border-radius: 4px;
`

const FeedContent = styled.div`
    width: 100%;
    height:100%;
    cursor: pointer; 
    padding: 8px 12px;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    cursor: pointer; 
`
const DeleteOption = styled.div`
    width: 50px;
    height: auto;
    cursor: pointer;
    background-color: red;
    overflow: auto;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Name = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
`
const Year = styled.div`
    color: #475867;
    font-size: 14px;
`
const InfoView = styled.div`
   margin-left: 12px;
`
const HeaderView = styled.div`
   display: flex; 
   align-items: center;
   margin-bottom: 12px;
`
const MessageContent = styled.div`
  font-size: 14px;
  color: #12344D;
  margin-bottom: 12px;
`
