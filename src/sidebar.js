import './sidebar.css';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './sidebarchat';
import {db} from './firebase';

import {useEffect, useState } from 'react';

import { useStateValue } from './stateProvider';


export default function Sidebar() {

    const [rooms, setRooms] = useState([]);

    const [{user}, dispatch] = useStateValue();

    console.log(user);
    const updateRooms = async () => {
       await db
        .collection('rooms')
        .onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc =>({
                id: doc.id,
                data: doc.data()
            })))
        })
    }
    useEffect(() => {
        updateRooms()
    },[])


    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src={user.photoURL} />
                <SettingsIcon />
            </div>

            <div className='sidebar__search'>
                <SearchIcon />
                <input type='text' className='sidebar__search__input' />
            </div>

            <div className='sidebar__chats'>
                <SidebarChat addNewChat={true} />
                {rooms.map(e => {
                    return (
                        <SidebarChat roomName={e.data.name} id={e.id} />
                    )
                })}
            </div>
        </div>

    )
}