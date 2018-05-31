import Iuser from './Iuser';

export default interface Imessage{
    time: Date
    message: string
    sender: Iuser
}

