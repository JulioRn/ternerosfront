import * as React from 'react';
import { Button } from 'primereact/button';
import ResponsiveAppBar from './ResponsiveAppBar';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { useState } from 'react';
import { Chart } from 'primereact/chart';
import { useEffect } from 'react';

import './Principal.css';


const Graficas = () => {

    const [terneros, setTerneros] = useState([]);
    const [guacheras, setGuacheras] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);


    useEffect(() => {
        TernerosGet();
        GuacherasGet();
        EnfermedadesGet();
    }, [])

    const TernerosGet = () => {
        fetch("http://localhost:8080/ternero/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setTerneros(result)
                }
            )
    }

    const GuacherasGet = () => {
        fetch("http://localhost:8080/guachera/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setGuacheras(result)
                }
            )
    }

    const EnfermedadesGet = () => {
        fetch("http://localhost:8080/enfermedad/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setEnfermedades(result)
                }
            )
    }



    const chartDataRegistros = {
        labels: ['Terneros', 'Guacheras', 'Enfermedades'],

        datasets: [
            {
                data: [terneros.length, guacheras.length, enfermedades.length],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };


    let sum= 0;

    for(let i=0; i<terneros.length; i++) {
        if(terneros[i].enfermedad.id_enfermedad != null);
        sum += terneros[i].enfermedad.id_enfermedad
        console.log(sum)
      }

   

    const chartData = {
        labels: ['Terneros', 'Guacheras', 'Enfermedades'],

        datasets: [
            {
                data: [terneros.length, guacheras.length, enfermedades.length],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });


    return (

        <div className="surface-0">
            <ResponsiveAppBar />
            <br />
            <div className="text-700 font-bold text-4xl mb-4 text-center">Monitoreo para la crianza de terneros</div>
            <br />
            <div className="grid">
                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">USUARIOS</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">
                                <span className="ml-2 font-medium text-600">Descripción</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Chart type="doughnut" data={chartDataRegistros} options={lightOptions} />
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Gestionar Terneros" className="p-button p-component p-button-raised p-button-success" />
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
                            <Chart type="doughnut" data={chartData} options={lightOptions} />
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Gestionar Terneros" className="p-button p-component p-button-raised p-button-success" />
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
                            <Chart type="doughnut" data={chartData} options={lightOptions} />
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Gestionar Guacheras" className="p-button p-component p-button-raised p-button-success" />
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
                            <Chart type="doughnut" data={chartData} options={lightOptions} />
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                            <Button label="Gestionar Enfermedades" className="p-button p-component p-button-raised p-button-success mt-auto" />
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
                            <Chart type="doughnut" data={chartData} options={lightOptions} />
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Gestionar Alimentos" className="p-button p-component p-button-raised p-button-success" />
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="p-3 h-full">
                        <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                            <div className="text-900 font-medium text-xl mb-2">GRAFICAS</div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <div className="flex align-items-center">

                                <span className="ml-2 font-medium text-600">Descripción</span>
                            </div>
                            <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Chart type="doughnut" data={chartData} options={lightOptions} />
                            <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                            <Button label="Gestionar Graficas" className="p-button p-component p-button-raised p-button-success" />
                        </div>
                    </div>
                </div>
            </div>
        </div>






    );


};

export default Graficas;
