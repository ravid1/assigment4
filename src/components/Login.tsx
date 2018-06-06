import * as React from 'react';
import Field from './Field'
import {ERROR_MSG} from "../App2";
import '../css/Login.css';

interface ILoginModalProps {
    onSubmit: (u: {name:string, password:string}) => void,
    loginStatus: ERROR_MSG
}

interface ILoginModalState {
    user: {name: string , password: string}
}

class Login extends React.Component<ILoginModalProps, ILoginModalState> {
    private messages = {
        [ERROR_MSG.allGood]: 'you\'re logged in!!!',
        [ERROR_MSG.credentials]: 'username or password are wrong!',
        [ERROR_MSG.locked]: 'you\'re locked!!'
    };

    private colors = {
        [ERROR_MSG.allGood]: 'green',
        [ERROR_MSG.credentials]: 'red',
        [ERROR_MSG.locked]: 'red'
    }

    constructor(props: any) {
        super(props);
        this.state = {
            user: {name: '', password: ''}
        }
    }

    updateField = (fieldName: string, value: string) => {
        this.setState(prevState => {
            return {
                user: {
                    ...this.state.user,
                    [fieldName]: value
                }
            }
        })
    };

    submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onSubmit(this.state.user);
    };

    render() {
        return (
            <div className="login-wrapper">
            <form>
                <Field name={'name'} type={'text'} onChange={this.updateField}/>
                <Field name={'password'} type={'password'} onChange={this.updateField}/>

                <button type="button" onClick={this.submitHandler}>Login</button>
                <p style={{color: this.colors[this.props.loginStatus]}}>{this.messages[this.props.loginStatus]}</p>
            </form>
            </div>
        );
    }
}

export default Login;