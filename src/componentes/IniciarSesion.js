import * as React from 'react';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox'
import { useNavigate } from 'react-router-dom';

export default function IniciarSesion() {

    const navigate = useNavigate();

    return (
        <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img className="loglog" src="CT-MOV.png" onError={(e) => e.target.src = 'https://i.ibb.co/HYnjnRQ/CT-MOV.png'} alt="hyper" height= "auto"  />

                </div>

                <div>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Usuario</label>
                    <InputText id="email" type="text" className="w-full mb-3" />

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
                    <InputText id="password" type="password" className="w-full mb-3" />

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" binary className="mr-2" />
                            <label htmlFor="rememberme">Recordar</label>
                        </div>

                    </div>

                    <Button label="Ingresar" icon="pi pi-user" className="w-full" onClick={() => navigate('MenuPrincipal')} />
                </div>
            </div>
        </div>



    );
}
