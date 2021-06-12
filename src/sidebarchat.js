import './sidebar-chat.css';
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useImperativeHandle, useState } from 'react';
import { createChainedFunction } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from './firebase';
import {Link} from 'react-router-dom';

export default function SidebarChat({
    addNewChat,
    roomName,
    id
}) {

    const [openClose, setOpenClose] = useState(false);

    const [newRoomName, setNewRoomName] = useState('');

    const addNewRoom = async () => {
      await db.collection('rooms').add({
        name: newRoomName
      });
      setOpenClose(false);
    }

    useEffect(() => {

    },[])

    const createChat = () => {
        

        
    }

    return (
        !addNewChat ? (
        <Link to={`/rooms/${id}`}>
          <div className='sidebar-chat'>
              <Avatar src='' />
              <div className='sidebar-chat__info'>
                  <h2>{roomName}</h2>
              </div>
          </div>
        </Link>
        ) : (
            <div className='sidebar-chat' onClick={() => setOpenClose(!openClose)}>
            <h2>Add new chat</h2>
            <Dialog open={openClose}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Please enter new room name</DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room name"
            type="text"
            fullWidth
            onChange={(e) => setNewRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClose(!openClose)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addNewRoom()} color="primary">
            Add new room
          </Button>
        </DialogActions>
      </Dialog>
        </div>
        )
    )
}