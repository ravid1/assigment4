import * as React from 'react';
// import InputPanel from '../components/inputtPanel';
import Message from '../components/message';
import MassagesPanel from '../components/messagesPanel';
import  {stateStoreService} from '../stateStore/StateStore';

interface IrightPanel {
    messages1?: string[]
}

interface IrightPanelState{
    messages: object[]
    newMessage: string
}

class RightPanel extends React.Component<IrightPanel,IrightPanelState> {
    constructor(props: IrightPanel){
        super(props);

        this.state={
            messages: stateStoreService.get('messages'),
            newMessage: ""
        }
    }
    /* <InputPanel /> */
    public componentWillMount(){
        const msgs = stateStoreService.get('messages');
        this.setState({
            messages: msgs
        })
    }

    public render() {
        return (
            <div className="rightPanel">
                    <MassagesPanel />
                <div className="inputPanel">
                <Message newMessage={this.state.newMessage} func={this.showMessage}/>
                    <br />
                    <button onClick={this.sendMessage}>send</button>
                </div>
            </div>
        );
    }

    public sendMessage = () => {
        const newMessagesArr = this.state.messages;//this.state.messages.concat([{"sender":"ravid", "message":this.state.newMessage, "Time":"10:23"}]);
        stateStoreService.set('messages',newMessagesArr);
        this.setState(()=>({
            newMessage: ""
        }));
    }

    public showMessage = (event: any)=>{
        this.setState({
            newMessage: event.target.value
        });
    }
}

export default RightPanel;
