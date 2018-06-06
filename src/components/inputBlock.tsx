import * as React from 'react'

interface ImassageProps{
    newMessage: string
    func(event:any): void
}


class InpuBlock extends React.Component<ImassageProps,{}>{
        constructor(props: any){
        super(props);
    }

    public render(){
        return (
            <div>
                <label>Message:</label>
                <input type="text" className="myMessageText" onChange={this.props.func} value={this.props.newMessage} />
            </div>
        )
    }
}


export default InpuBlock;

/* const Message = (props:ImassageProps) => {
        return (
            <div>
                <label>Message:</label>
                <input type="text" className="myMessageText" onChange={props.func} value={props.newMessage} />
            </div>
        )
    }

export default Message;*/
