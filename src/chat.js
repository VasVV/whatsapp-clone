import './chat.css';
import Avatar from '@material-ui/core/Avatar';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';

import {useEffect, useState, useRef} from 'react';
import {db, auth, store} from './firebase';
import {useParams} from 'react-router-dom';

import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

import { useStateValue } from './stateProvider';


export default function Chat() {

    const [{user}, dispatch] = useStateValue();

    const [message, setMessage] = useState('');
    const [roomName, setRoomName] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [audioData, setAudioData] = useState(null);
    const [showRecorder, setShowRecorder] = useState(false);
    const [messages, setMessages] = useState([]);
  

    const inputFile = useRef(null);

    useEffect(() => {
        setAudioData({audioDetails: {
            url: null,
            blob: null,
            chunks: null,
            duration: {
              h: 0,
              m: 0,
              s: 0
            }
          }})
    },[])

     
   
    const id = useParams();

    const uploadFile = async e => {

        let file = inputFile.current.files[0];
        if (file){
            let ref = await store.ref();
            
            let imgref = ref.child(`images/${file.name}`);
            await imgref.put(file);

            ref = await store.ref();

            let imgurl = await ref.child(`images/${file.name}`).getDownloadURL();
            await db.collection('photos').add({
                imgurl,
                userId: 'curruserid',
                currRoomId: id.roomId
            });

            await db
            .collection('rooms')
            .doc(id.roomId)
            .collection('messages')
            .add({
                username: user.displayName,
                text: imgurl,
                image: true,
                time: new Date()
            })
            
        }
    }

    const handleAudioStop = async (data) => {
       
        setAudioData({audioDetails: data});
        let name = Math.floor (Math.random() * 1000);
        let audio = data.blob;
        
            let ref = await store.ref();
           
            let imgref = ref.child(`audio/${name}.webm`);
            await imgref.put(audio);

            ref = await store.ref();

            let audiourl = await ref.child(`audio/${name}.webm`).getDownloadURL();
            await db.collection('audio').add({
                audiourl,
                userId: 'curruserid',
                currRoomId: id.roomId
            });

            await db
            .collection('rooms')
            .doc(id.roomId)
            .collection('messages')
            .add({
                username: user.displayName,
                text: audiourl,
                audio: true,
                time: new Date()
            })
        
    }

    const handleAudioUpload = async (file) => {
        console.log('i am file')
        
        
        
        }


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
        });

        let msg = [];
        await db
        .collection('rooms')
        .doc(id.roomId)
        .collection('messages')
        .orderBy('time', 'asc')
        .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
        
        
    }

    useEffect(() => {
        if (id) {
        
        uploadMessages();

       
        }
    },[id])

    useEffect(() => {
        
    },[id])
    

    const sendMessage = () => {
        db
        .collection('rooms')
        .doc(id.roomId)
        .collection('messages')
        .add({
            username: user.displayName,
            text: message,
            time: new Date()
        })
    }

    return (
        <div className='chat'>
            <input type="file" ref={inputFile} onChange={(e) => uploadFile(e)} style={{display: 'none'}} />
            <div className='chat__header'>
            <Avatar src='' />
            <div className='chat__header__userinfo'>
                <h2>{roomName}</h2>
                <p>last seen 03-03-2010</p>
            </div>
            
            <AttachFileIcon onClick={() =>  inputFile.current.click()} />
            </div>
            
            <div className='chat__body'>
            {messages.map(e => {
                    
                    if (!e.audio && !e.image) {
                    return (
                        
                        
                        <div className= {`${user.displayName == e.username && 'chat__reciever' } chat__body__message`}>
                            <span className='chat__body__message__user'>{e.username}</span>
                        <p className={e.username == user.displayName ? 'chat__reciever__message chat__body__message__message' : 'chat__body__message__message' }>{e.text}
                        <span className='chat__body__message__message__timestamp'>{new Date(e['time'] * 1000).toString()}</span>
                        </p> 
                        </div>
                    )
                    }
                    else if (e.audio) {
                        return (
                            <div className= {`${user.displayName == e.username && 'chat__reciever' } chat__body__message`}>
                            <span className='chat__body__message__user'>{e.username}</span>
                        <p className={e.username == user.displayName ? 'chat__reciever__message chat__body__message__message' : 'chat__body__message__message' }>
                            <audio controls>
                            <source src={e.text} />
                            </audio>
                        <span className='chat__body__message__message__timestamp'>{new Date(e['time'] * 1000).toString()}</span>
                        </p> 
                        </div>
                        )
                    }
                    
                        else if (e.image) {
                            return (
                                <div className= {`${user.displayName == e.username && 'chat__reciever' } chat__body__message`}>
                                <span className='chat__body__message__user'>{e.username}</span>
                            <p className={e.username == user.displayName ? 'chat__reciever__message chat__body__message__message' : 'chat__body__message__message' }>
                                <img src={e.text} className='chat__body__message__message_image' />
                            <span className='chat__body__message__message__timestamp'>{new Date(e['time'] * 1000).toString()}</span>
                            </p> 
                            </div>
                            )
                        }
                    
                })}
                
                
                {showPicker&&<Picker className='chat__body__emoji-picker'
                onEmojiClick={onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                groupNames={{ smileys_people: "PEOPLE" }}
                native
             />}
             {showRecorder&& <Recorder
                    record={true}
                    title={"New recording"}
                    audioURL={audioData.audioDetails.url}
                    showUIAudio
                    handleAudioStop={data => handleAudioStop(data)}
                    hideHeader={true}
                    handleAudioUpload={data => handleAudioUpload(data)}
                    />}
            </div>
            
            <div className='chat__input'>
            
                <InsertEmoticonIcon onClick={() => setShowPicker(!showPicker)} />
                <form className='chat__input__input-form'>
                    <input type='text' className='chat__input__input-form__input' value={message} onChange={(e) => handleChange(e)}/>
                    <SendIcon onClick={() => sendMessage()} />
                </form>
                <MicIcon onClick={() => setShowRecorder(!showRecorder)} />
            </div>
        </div>
    )
}