import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';


import './Principal.css';





const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img id='log' alt="Card" src='https://i.ibb.co/G5BZX5x/menuBar.png' onClick={() => navigate('/MenuPrincipal')} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
               
                <MenuItem onClick={handleCloseNavMenu}>
                  <Button onClick={() => navigate('/GestionU')}>Usuarios</Button>
              <Button onClick={() => navigate('/GestionT')}>Terneros</Button>
              <Button onClick={() => navigate('/GestionG')}>Guacheras</Button>
              <Button onClick={() => navigate('/GestionE')}>Enfermedades</Button>
              <Button onClick={() => navigate('/GestionA')}>Alimentos</Button>
              <Button onClick={() => navigate('/Graficas')}>Analíticas</Button>
              
                </MenuItem>
             
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img id='log' alt="Card" src='https://i.ibb.co/hMLvQgp/mbMovil.png' onClick={() => navigate('/MenuPrincipal')}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button onClick={() => navigate('/GestionU')}sx={{ my: 2, color: 'white', display: 'block' }}>Usuarios</Button>
              <Button onClick={() => navigate('/GestionT')}sx={{ my: 2, color: 'white', display: 'block' }}>Terneros</Button>
              <Button onClick={() => navigate('/GestionG')}sx={{ my: 2, color: 'white', display: 'block' }}>Guacheras</Button>
              <Button onClick={() => navigate('/GestionE')}sx={{ my: 2, color: 'white', display: 'block' }}>Enfermedades</Button>
              <Button onClick={() => navigate('/GestionA')}sx={{ my: 2, color: 'white', display: 'block' }}>Alimentos</Button>
              <Button onClick={() => navigate('/Graficas')}sx={{ my: 2, color: 'white', display: 'block' }}>Analíticas</Button>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => navigate('/GestionT')}>Perfil</Typography>
                  <Typography textAlign="center">Cuenta</Typography>
                  <Typography textAlign="center" onClick={() => navigate('/MenuPrincipal')}>Principal</Typography>
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
