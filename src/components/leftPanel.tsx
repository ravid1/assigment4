import * as $ from 'jquery'
import * as React from 'react';
import { stateStoreService} from '../stateStore/StateStore'


interface IleftPanelProps {
    user: string
}


interface IleftPanelState {
    tree?:any,
    user: string
}


class LeftPanel extends React.Component<IleftPanelProps,IleftPanelState> {
    private ref: any;
    constructor(props: IleftPanelProps){
        super(props);

        this.state={
            user: this.props.user
            // ref: null
        }
    }

    public componentDidMount(){
        const element = stateStoreService.get('tree');
        this.load(element);
        this.keysEvent();

    }

    public load(items: any) {
       // $('.left');
        let flag = true;
        // if(!(list.children().length)) {
            for (const item of items) {
                const listItem = $('<li >');
                listItem.text(item.name);
                listItem.data('messages',item.messages);
                // listItem.data(item.messages);
                if(flag){
                    (listItem).addClass('active');
                    flag = false;
                }
                if (item.type === "group") {
                    listItem.data(item.items);
                }
                $(this.ref).append(listItem);
            }
      //  }

        $(this.ref).click((e: any)=>{
            if($(e.target)[0].tagName==="LI") {
                this.changeColor($(e.target));
            }
            e.stopPropagation();
        });

        $(this.ref).dblclick((e: any)=>{
            if($(e.target)[0].tagName==="LI") {
                this.changeColor($(e.target));
                this.expandNodes($(e.target));
            }
            e.stopPropagation();
        });
    }

    private expandNodes(node: any) {
        this.changeColor($(node));
        const data = $(node).data();
        if($(node).children().length){
            $(node).children().remove();
        }

        else if((Object.keys(data)).length) {
            this.buildNodes($(node));
        }
    }

    private buildNodes(element: any){
        const data = $(element).data();
        // const parent =  $('.active').closest('ul');
        const indent = this.getIndent();
        const ul = $('<ul >');
        $(ul).addClass('noColor');
        $(ul).css('text-indent',(indent));
        /* for (let key in data) {
            let li = $('<li >');
            li.append(data[key].name);
            if(data[key].type === "group"){
                li.data(data[key].items);
            } */
        for (const key of Object.keys(data)) {
            const li = $('<li >');
            li.append(data[key].name);
            if(data[key].type === "group"){
                li.data(data[key].items);
            }
            ul.append(li);
        }
        $('.active').append(ul);
    }

    private keysEvent(){

        document.addEventListener('keydown',(e)=>{
            switch(e.which){
                case 13:
                    this.enterKey();
                    break;
                case 37:
                    this.leftKey();
                    break;
                case 38:
                    this.upKey();
                    break;
                case 39:
                    this.rightKey();
                    break;
                case 40:
                    this.downKey();
                    break;
            }
            e.stopPropagation();
        });
    }

    private enterKey() {
        if(!($('.active').children().length) && (Object.keys($('.active').data())).length) {
            this.buildNodes($('.active'));
        }
        else{
            this.expandNodes($('.active'));
        }
    }

    private leftKey(){
        const node = $('.active').parent();
        if(($('.active').children().length)){
            $('.active').children().remove();
        }
        else if(!(node.hasClass('tree'))){
            this.changeColor(node.parent());
        }
    }

    private upKey(){
        const node = $('.active').prev();
        const parent = $('.active').closest('ul');
        if(node.length){
            this.changeColor(node);
        }
        else if(parent.length && !(parent.hasClass('tree'))){
            this.changeColor(parent.closest('li'));
        }
    }

    private rightKey() {
        if(!($('.active').children().length) && (Object.keys($('.active').data())).length) {
            this.buildNodes($('.active'));
        }
    }

    private downKey(){
        const child = $('.active').children();
        if (child.length) {
            this.changeColor(child.find('li')[0]);
        }
        else if ($('.active').next().length) {
            const sibling = $('.active').next();
            this.changeColor(sibling);
        }
    }

    private getIndent(){
        const parent = $('.active').closest('ul');
        const indent = $(parent).css('text-indent');
        let num;
        indent.substring(0,indent.indexOf('px'));
        num = parseInt(indent,10);
        num+=10;
        return (num +'px');
    }

    private changeColor(element: any){
        $('.active').removeClass('active');
        $(element).addClass('active');
        this.setStateStore($(element));
    }

    /* private clear() {
        $('.left').children().remove();
    } */

    private setStateStore(element: any){
         const msg = $(element).data();
         stateStoreService.set('messages',msg["messages"]);
         stateStoreService.set('destination',$(element).text());
    }

    public render() {
        return (
            <div className="leftPanel" >
                <ul className="tree" tabIndex={0} ref={((element)=>this.ref=element)} />
            </div>
        );
    }
}

export default LeftPanel;
