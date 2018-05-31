import * as React from 'react';
import  {stateStoreService} from '../stateStore/StateStore';

interface ImassagesPanelState {
    messages: object[]
    items?: string[]
}

class MassagesPanel extends React.Component<{},ImassagesPanelState> {
    constructor(props: any){
        super(props);

        this.state={
            messages: stateStoreService.get('messages')
        }
    }

    public componentWillMount(){
        this.setState({
            messages: stateStoreService.get('messages')
        })
    }

    public render() {
        return (
            <div className="massagesPanel" >
                <p>this is massagesPanel!!!!!!!!!</p>
                <ul>{this.getMessages()}</ul>
            </div>
        );
    }

    public getMessages = () => {
        const messagesArr = stateStoreService.get('messages');
        console.log("1");
        let list;
        if(messagesArr) {
            list = messagesArr.map((messages: { sender: string, message: string }, idx: number) => {
                return <li key={idx}>{messages.message}</li>
            })
        }
        return list;
    }
}


export default MassagesPanel;
