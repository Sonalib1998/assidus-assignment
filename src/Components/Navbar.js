import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import logo from '../../src/profile.png';

const Navbar = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
    
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <div style={{ position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', zIndex: 1 }}>
                <SearchIcon style={{ color: 'gray' }} /> 
              </div>
              <input
                aria-label="search"
                style={{
                  paddingLeft: 40,
                  background: 'lightgray',
                  borderRadius: '5px',
                  width: '100%',
                  height: '40px',
                  fontSize: '16px',
                  border: '1px solid lightgray',
                  boxSizing: 'border-box',
                  paddingLeft: '10px',
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginRight: '20px' }}>
          <NotificationsIcon />
        </div>
        <div>
          <Avatar alt="Remy Sharp" src={logo} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
