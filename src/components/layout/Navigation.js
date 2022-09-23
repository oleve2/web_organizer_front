
import { useState } from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

// mui
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

// images
import menuBlue from '../../assets/menu_blue.png';

// rtk
import { logoutAndClearLS } from "../../rtkstore/authReducer";


export default function Navigation(props) {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const storeLogin = useSelector( (store) => store.authReducer.login);

  const doLogout = () => {
    dispatch( logoutAndClearLS() );
  }

  const [isOpen, setisOpen] = useState(false);
  const newMenu = [
    {name: 'Home', lnk: '/'},
    {name: 'Base', lnk: '/base'},
    {name: 'Base: new card', lnk: '/base/new'},
    {name: 'Activities', lnk: '/activities_manage'},
    {name: 'Analytics', lnk: '/analytics'},
    {name: 'UpDownload', lnk: '/updownload'},
  ]

  const toggleDrawer = (open) => {
    setisOpen(open);
  }
  
  return (
    <>
    <div className="nav-header">
      
      <Button onClick={() => {toggleDrawer(true)} }> 
        <MenuTwoToneIcon color="primary" fontSize="large"/>
      </Button>
      
      <Drawer open={isOpen} onClose={() => {toggleDrawer(false)} }>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => {toggleDrawer(false)}}
          onKeyDown={() => {toggleDrawer(false)}}
        >
        <Divider />
        <List>
          <ListItem>
            <img src={menuBlue} alt='logo' style={{width:'40px'}} />
            <div style={{fontSize: '26px', marginLeft: '10px'}}>WebApp3</div>    
          </ListItem>

          { newMenu.map( (item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
              {/*onClick={() => {navigate(item.lnk) }}  <ListItemText primary={item.name} />*/}
                <Link to={item.lnk} style={{textDecoration: 'none', color: 'black'}}> {item.name} </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        </Box>  
      </Drawer>{/**/}
    
      <ul className="nav-header nav-logins">
        { (storeLogin !== '') ? <li className="nav-login-info"> <div>logged as: {storeLogin}</div> </li> : <></> }
        <li className="nav-li"> <div className="nav-lnk" onClick={doLogout}>Logout</div> </li>
      </ul>
    </div>

    </>
  )
}
