import * as React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';


import './Principal.css';

export default function MenuPrincipal() {
    const navigate = useNavigate();


    return (



        <div className="surface-0">
            <ResponsiveAppBar />
            <br />
            <div className="text-700 font-bold text-4xl mb-4 text-center">Monitoreo para la crianza de terneros</div>
            <br />
            <div className="grid">

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">ANALITICAS</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">

                                <span className="ml-2 font-medium text-600">Descripción</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <img alt="logo" src="https://i.ibb.co/L5sxhFL/graficas.jpg" className="mr-2"></img>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Visualizar Gráficas" className="p-button p-component p-button-raised p-button-success" onClick={() => navigate('/Graficas')} />
                        </div>
                    </div>
                </div>



                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">TERNEROS</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="ml-2 font-medium text-600">Descripción</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <img alt="logo" src="https://i.ibb.co/kD00MBT/terneros.jpg" className="mr-2"></img>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Gestionar Terneros" className="p-button p-component p-button-raised p-button-success" onClick={() => navigate('/GestionT')} />
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">GUACHERAS</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">

                                <span className="ml-2 font-medium text-600">Descripción</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <img alt="logo" src="https://i.ibb.co/p0pkVMt/guachera.jpg" className="mr-2"></img>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Gestionar Guacheras" className="p-button p-component p-button-raised p-button-success" onClick={() => navigate('/GestionG')} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid">
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">ENFERMEDADES</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="ml-2 font-medium text-600">Descripción</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <img alt="logo" src="https://i.ibb.co/nnKKnzW/enfermedades.jpg" className="mr-2"></img>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                            <Button label="Gestionar Enfermedades" className="p-button p-component p-button-raised p-button-success mt-auto" onClick={() => navigate('/GestionE')} />
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">ALIMENTOS</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="ml-2 font-medium text-600">Descripción</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <img alt="logo" src="https://i.ibb.co/Yb5Dn1B/alimento.jpg" className="mr-2"></img>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Gestionar Alimentos" className="p-button p-component p-button-raised p-button-success" onClick={() => navigate('/GestionA')} />
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">USUARIOS</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="ml-2 font-medium text-600">Descripción</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <img alt="logo" src="https://i.ibb.co/YW8XYLs/terneros.jpg" className="mr-2"></img>
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                            <Button label="Gestionar Usuarios" className="p-button p-component p-button-raised p-button-success mt-auto" onClick={() => navigate('/GestionU')} />
                        </div>
                    </div>
                </div>

            </div>
        </div>






    );
}
