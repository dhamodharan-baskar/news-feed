import React , { Component } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { showDeleteOption, deleteMessage } from "../redux/actions/messages"

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragged: false,
            showDelete: false,
        };
      }
    
    componentDidMount = () => {
        const {
            id
        } = this.props
        document.getElementById(`content-view${id}`).addEventListener("click", this.handleClick);
    }
    
    componentWillUnmount() {
        const {
            id
        } = this.props
        document.getElementById(`content-view${id}`).removeEventListener("click", this.handleClick);
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
            messageId
        } = this.props
        let element = document.getElementById(`content-view${id}`);
        if(this.state.showDelete){
            console.log(id, 'if')
            element.classList.remove("slides");
            element.classList.add("slides-reverse");
        }
        else{
            console.log(id, 'else')
            element.classList.remove("slides-reverse")
            element.classList.add("slides");
        }
    }

    showDeleteOption = (id) => {
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
                {(this.state.showDelete && (messageId === id)) && <div onClick={() => this.props.deleteMessage(id)}>delete option</div>}
                <FeedContent onClick={() => this.showDeleteOption(id)} id={`content-view${id}`}>
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
    height: 120px; 
    border: 1px solid;
    display: flex;
    margin: 24px;
    overflow: hidden;
`

const FeedContent = styled.div`
    width: 100%;
    height:100%; 
    border: 1px solid black;
`