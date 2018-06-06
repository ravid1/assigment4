import * as React from "react";
import '../css/imessage.css';
import Imessage from '../interfaces/Imessage';
import {stateStoreService} from "../stateStore/StateStore";

interface ImessageProps{
    message: Imessage
}

class Message extends React.Component<ImessageProps,{}> {
    private userName = stateStoreService.get('user');
    constructor(props: ImessageProps){
        super(props);
    }

    userMessage = ()=>{
        return(
                <div className="message-blue">
                    <p className="message-content">{this.props.message.message}</p>
                    <div className="message-timestamp-left">{this.props.message.sender + " " + this.props.message.time}</div>
                </div>
        )
    }

    otherMessage = ()=>{
        return(
                <div className="message-orange">
                    <p className="message-content">{this.props.message.message}</p>
                    <div className="message-timestamp-right">{this.props.message.sender + " " + this.props.message.time}</div>
                </div>
        )
    }

    public render() {
        return(
            <div className="container">{this.props.message.sender==this.userName ? this.userMessage() : this.otherMessage()}</div>
        )
    }
}

export default Message;