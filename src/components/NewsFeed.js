import React , { Component } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { showDeleteOption, deleteMessage } from "../redux/actions/messages"
import { APP_URL } from '../constants'
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
        let element = document.getElementById(`content-view${id}`);
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

    render() {
        const {
            id,
            message,
            messageId,
            index
        } = this.props
        return (
            <ContentOverview>
                {(this.state.showDelete && (messageId === id)) && <div onClick={() => this.props.deleteMessage(id)}>delete</div>}
                <FeedContent 
                    onClick={(e) => this.showDeleteOption(id, e)} 
                    onTouchEnd={(e) => this.showDeleteOption(id, e)}
                    id={`content-view${id}`}>
                        <Image 
                        src={`${APP_URL}${message.author.photoUrl}`}
                        alt="img"
                        />
                    {message.content}
                </FeedContent>
            </ContentOverview>
        )
    }
}  
const mapDispatchToProps = dispatch => ({
    showDeleteOption: id => dispatch(showDeleteOption(id)),
    deleteMessage: id => dispatch(deleteMessage(id)),
  });
  
  const mapStateToProps = state => ({
    messageId: state.messages.messageId
  });

  
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)


const ContentOverview = styled.div`
    width: auto; 
    border: 1px solid;
    display: flex;
    margin: 24px;
    overflow: hidden;
    padding: 12px;
`

const FeedContent = styled.div`
    width: 100%;
    height:100%;
    cursor: pointer; 
`

const Image = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50px;
    cursor: pointer; 
`