import './chat.css';
import Avatar from '@material-ui/core/Avatar';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import {useEffect, useState} from 'react';
import {db, auth} from './firebase';
import {useParams} from 'react-router-dom';

import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';


export default function Chat() {

    const [message, setMessage] = useState('');
    const [roomName, setRoomName] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const id = useParams();

    const onEmojiClick = (e, emoji) => {
      
        setMessage(prevState => prevState + emoji.emoji)
    }

    const handleChange = e => {
        setMessage(e.target.value)
    }

    const uploadMessages = async () => {
        await db
        .collection('rooms')
        .doc(id.roomId)
        .onSnapshot(snapshot => {
            setRoomName(snapshot.data().name)
        })
    }

    useEffect(() => {
        if (id) {
        
        uploadMessages();
        }
    },[id])
    

    return (
        <div className='chat'>
            <div className='chat__header'>
            <Avatar src='' />
            <div className='chat__header__userinfo'>
                <h2>{roomName}</h2>
                <p>last seen 03-03-2010</p>
            </div>
            
            <AttachFileIcon />
            </div>

            <div className='chat__body'>
                <div className='chat__body__message'>
                    <span className='chat__body__message__user'>Username</span>
                   <p className='chat__body__message__message'>Hey 
                   <span className='chat__body__message__message__timestamp'>12-12-2012 03:03:03</span>
                   </p> 
                </div>
                <div className='chat__body__message'>
                    <span className='chat__body__message__user'>Username</span>
                   <p className='chat__body__message__message'>Hey</p> 
                </div>
                <div className='chat__body__message'>
                    <span className='chat__body__message__user'>Username</span>
                   <p className='chat__body__message__message'>Hey</p> 
                </div>

                <div className=' chat__reciever chat__body__message '>
                    <span className='chat__body__message__user'>Username</span>
                   <p className='chat__reciever__message chat__body__message__message '>Hey</p> 
                </div>
                {showPicker&&<Picker
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                groupNames={{ smileys_people: "PEOPLE" }}
                native
             />}
            </div>
            
            <div className='chat__input'>
            
                <InsertEmoticonIcon onClick={() => setShowPicker(!showPicker)} />
                <form className='chat__input__input-form'>
                    <input type='text' className='chat__input__input-form__input' value={message} onChange={(e) => handleChange(e)}/>
                    <SendIcon />
                </form>
                <MicIcon />
            </div>
        </div>
    )
}