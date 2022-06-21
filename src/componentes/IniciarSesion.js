import * as React from 'react';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox'
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';



export default function IniciarSesion() {

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
        <div className="flex align-items-center justify-content-center">
            <Toast ref={toast} />
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img id="loglog" src="CT-MOV.png" onError={(e) => e.target.src = 'https://i.ibb.co/GHCb0DN/Login.png'} alt="hyper" height="auto" />

                </div>

                <div>

                    <label htmlFor="acceso" className="block text-900 font-medium mb-2">Usuario</label>
                    <InputText id="acceso" placeholder='Ingrese Usuario' type="text" className="w-full mb-3" onChange={(e) => setAcceso(e.target.value)} />
                    {submitted && !acceso && <small className="p-error">Ingresar Usuario</small>}
                    <label htmlFor="contra" className="block text-900 font-medium mb-2">Contraseña</label>
                    <InputText id="contra" placeholder='Ingrese Contraseña' type="password" className="w-full mb-3" onChange={(e) => setContra(e.target.value)} />
                   {submitted && !contra && <small className="p-error">Ingresar ontraseña</small>}
                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" binary className="mr-2" />
                            <label htmlFor="rememberme">Recordar</label>
                        </div>

                    </div>

                    <Button label="Ingresar" icon="pi pi-user" className="w-full" onClick={UsuariosGet} />
                </div>
            </div>
        </div>

    );

}