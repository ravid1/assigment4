import * as React from 'react'

interface ImassageProps{
    newMessage: string
    func(event:any): void
}

const Message = (props:ImassageProps) => {
    return (
        <div>
            <label>Message:</label>
            <input type="text" className="myMessageText" onChange={props.func} value={props.newMessage} />
        </div>
    )
}

export default Message;