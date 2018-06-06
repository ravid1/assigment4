import * as React from 'react';
import InputBlock from '../components/inputBlock';
import Message from '../components/message';
import Imessage from '../interfaces/Imessage'
import  {stateStoreService} from '../stateStore/StateStore';

interface IrightPanelProps {
    messages1?: string[]
}

interface IrightPanelState{
    messages: object[]
    newMessage: string
    messages2: object[]
    user: ""
}

class RightPanel extends React.Component<IrightPanelProps,IrightPanelState> {
    constructor(props: IrightPanelProps){
        super(props);

        this.state={
            messages:[],
            newMessage: "",
            messages2: [],
            user: stateStoreService.get('user')
        }
    }

    public componentWillMount(){
    }


    public sendMessage = () => {
        // let newMessagesArr = stateStoreService.get('messages');//this.state.messages.concat([{"sender":"ravid", "message":this.state.newMessage, "Time":"10:23"}]);
        const user = stateStoreService.get('user');
        const time = new Date();
        const sentTime = (time.getHours().toString() + ":" +time.getMinutes().toString());
        this.addToTree({"time": sentTime, "message": this.state.newMessage, "sender": user});
        this.addToTree({"time": sentTime, "message": this.state.newMessage, "sender": stateStoreService.get('destination')});

        // newMessagesArr.push({"time": sentTime, "message": this.state.newMessage, "sender": this.state.user});
       // stateStoreService.set('messages',newMessagesArr);
        this.setState(()=>({
            newMessage: ""
        }));
    }

    public addToTree = (msg: object) => {
        const tree = stateStoreService.get('tree');
        const dest = stateStoreService.get('destination');
        let newMessagesArr = stateStoreService.get('messages')
        this.findgroup(tree,dest,newMessagesArr,msg);
        stateStoreService.set('tree',tree);
    }

    private findgroup = (element: any , dest: string, messages: object[], msg: object) => {
        for(let msgs of element) {
            if ((msgs.name == dest) && (msgs.messages == messages)) {
                console.log(msgs);
                msgs.messages.push(msg);
            }
            else if(msgs.items){
                this.findgroup(msgs.items,dest,messages,msg);
            }
        }
    }

    public showNewMessage = (event: any)=>{
        this.setState({
            newMessage: event.target.value
        });
    }

    public getMessages = () => {
        const messagesArr = stateStoreService.get('messages');
        const user = stateStoreService.get('user');
        // console.log("1");
        let list;
        if (user && messagesArr && messagesArr.length>0) {
            list = messagesArr.map((messages: Imessage, idx: number) => {
                return <li key={idx}><Message message={messages}/></li>
            })
        }
        return list;
    }

    public render() {

        const list = this.getMessages();

        return (
            <div className="rightPanel">
                <div className="massagesPanel" >
                    <ul>{list}</ul>
                </div>
                {stateStoreService.get("user") && <div className="inputPanel"><InputBlock newMessage={this.state.newMessage} func={this.showNewMessage}/><br /><button onClick={this.sendMessage}>send</button> </div>}
            </div>
        );
    }
}

export default RightPanel;
