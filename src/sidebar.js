import './sidebar.css';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';

export default function Sidebar() {


    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <Avatar src='' />
                <SettingsIcon />
            </div>

            <div className='sidebar__search'>
                <SearchIcon />
                <input type='text' className='sidebar__search__input' />
            </div>

            <div className='sidebar__chats'>
                I am chats
            </div>
        </div>

    )
}