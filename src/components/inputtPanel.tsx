import * as React from 'react';
import Message from './message';

interface IinputPanel {
    item?: string[]
    newMessage: string
}

interface IinputPanelState {
    messages?: string[]
    newMessage: string
}

class InputPanel extends React.Component<{},IinputPanelState> {
    constructor(props: IinputPanel){
        super(props);

        this.state={
            messages: [],
            newMessage: ""
        }
    }

    public render() {
        return (
            <div className="inputPanel">
                <Message newMessage={this.state.newMessage} func={this.showMessage}/>
                <br />
                <button>send</button>
            </div>
        );
    }

    public showMessage = (event: any)=>{
        this.setState({
            newMessage: event.target.value
        });
    }
}

export default InputPanel;
