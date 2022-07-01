import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { classNames } from 'primereact/utils';





const theme = createTheme();

export default function SignInSide() {


    const navigate = useNavigate();
    const toast = useRef(null);
    const [acceso, setAcceso] = useState(null);
    const [contra, setContra] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [submitted] = useState(false);

    const UsuariosGet = () => {


        if (acceso === null || contra === null) {
            console.log('Ingrese usuario')
            toast.current.show({ severity: 'error', summary: 'Ingresar Usuario y Contraseña!!', detail: 'usuario no ingresado', life: 3000 })
        } else {

            fetch("http://localhost:8080/usuario/buscarUsuario/" + acceso + "/" + contra)
                .then(res => res.json())
                .then(
                    (result) => {
                        setUsuario(result)
                    }


                )
            if (usuario === null) {
                console.log('Usuario no existe')
            } else {
                console.log(usuario)
                navigate('MenuPrincipal')
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Toast ref={toast} />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://i.ibb.co/C5TSpyM/background.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <img sx={{ m: 1, bgcolor: 'secondary.main' }} id="loglog" src="CT-MOV.png" onError={(e) => e.target.src = 'https://i.ibb.co/GHCb0DN/Login.png'} alt="hyper" height="auto" />

                        
                        <Box sx={{ mt: 1 }} style={{marginTop: '4em'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={(e) => setAcceso(e.target.value)}
                                id="acceso"
                                label="Nombre Acceso"
                                name="acceso"
                                autoComplete="acceso"
                                autoFocus
                                className={classNames({ 'p-invalid': submitted && !acceso })} 
                            />

{submitted && !acceso && <small className="p-error">Ingresar Usuario</small>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={(e) => setContra(e.target.value)}
                                name="contra"
                                label="Contraseña"
                                type="contra"
                                id="contra"
                                autoComplete="current-contra"
                                className={classNames({ 'p-invalid': submitted && !contra })} 
                            />
                             {submitted && !contra && <small className="p-error">Ingresar ontraseña</small>}

                            
                            <Button
                                type="submit"
                                fullWidth
                                onClick={UsuariosGet}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{marginTop: '2em'}}
                            >
                                Ingresar
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}