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
import { Calendar } from 'primereact/calendar';

import { Toolbar } from 'primereact/toolbar';


import './Principal.css';


const Graficas = () => {

    const [terneros, setTerneros] = useState([]);
    const [guacheras, setGuacheras] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);
    const [partos, setPartos] = useState([]);
    const [muertes, setMuertes] = useState([]);
    const [refractrometrias, setRefractrometrias] = useState([]);

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    const [ternerosF, setTernerosF] = useState([]);
    const [muertesF, setMuertesF] = useState([]);
    const [partosF, setPartosF] = useState([]);







    useEffect(() => {
        TernerosGet();
        GuacherasGet();
        EnfermedadesGet();
        PartosGet();
        MuertesGet();
        RefractrometriasGet();
    }, [])

    const TernerosGet = () => {
        fetch("http://localhost:8080/ternero/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setTerneros(result)
                    setTernerosF(result)
                }
            )
    }

    const UltimoMesTGet = () => {
        fetch("http://localhost:8080/ternero/currentMesTerneros")
            .then(res => res.json())
            .then(
                (result) => {
                    setTerneros(result)
                }
            )
    }

    const filtrarTerneros = () => {
        fetch("http://localhost:8080/muerte/entreFechasMuerte/" + startDate + "/" + endDate)
            .then(res => res.json())
            .then(
                (result) => {
                    setMuertes(result)
                }
            )
        fetch("http://localhost:8080/ternero/entreFechasTerneros/" + startDate + "/" + endDate)
            .then(res => res.json())
            .then(
                (result) => {
                    setTerneros(result)
                }
            )
            
    }

    console.log(terneros)

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

    const PartosGet = () => {
        fetch("http://localhost:8080/parto/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setPartos(result)
                    setPartosF(result)
                }
            )
    }

    const MuertesGet = () => {
        fetch("http://localhost:8080/muerte/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setMuertes(result)
                    setMuertesF(result)
                }
            )
    }

    const RefractrometriasGet = () => {
        fetch("http://localhost:8080/refractrometria/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setRefractrometrias(result)
                }
            )
    }


    const chartDataRegistros = {
        labels: ['Terneros', 'Partos', 'Refractomerias', 'Muertes'],

        datasets: [
            {
                data: [terneros.length, partos.length, refractrometrias.length, muertes.length],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#FFAE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#FFAE76"
                ]
            }]
    };


    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    let sum4 = 0;
    let sum5 = 0;
    let sum6 = 0;


    for (let i = 0; i < terneros.length; i++) {

        sum1 += (terneros[i].enfermedad != null);
        sum2 += (terneros[i].enfermedad == null);

    }

    for (let i = 0; i < terneros.length; i++) {

        sum3 += (terneros[i].parto != null);
        sum4 += (terneros[i].parto == null);

    }


    for (let i = 0; i < partos.length; i++) {
        sum5 += (partos[i].tipoPar === 'Natural');
        sum6 += (partos[i].tipoPar === 'Asistido');

    }


    let sumEnero = 0;
    let sumFebrero = 0;
    let sumMarzo = 0;
    let sumAbril = 0;
    let sumMayo = 0;
    let sumJunio = 0;
    let sumJulio = 0;
    let sumAgosto = 0;
    let sumSeptiembre = 0;
    let sumOctubre = 0;
    let sumNoviembre = 0;
    let sumDiciembre = 0;


    for (let i = 0; i < terneros.length; i++) {

        sumEnero += (terneros[i].fechaNac.includes('/01/'))
        sumFebrero += (terneros[i].fechaNac.includes('/02/'))
        sumMarzo += (terneros[i].fechaNac.includes('/03/'))
        sumAbril += (terneros[i].fechaNac.includes('/04/'))
        sumMayo += (terneros[i].fechaNac.includes('/05/'))
        sumJunio += (terneros[i].fechaNac.includes('/06/'))
        sumJulio += (terneros[i].fechaNac.includes('/07/'))
        sumAgosto += (terneros[i].fechaNac.includes('/08/'))
        sumSeptiembre += (terneros[i].fechaNac.includes('/09/'))
        sumOctubre += (terneros[i].fechaNac.includes('/10/'))
        sumNoviembre += (terneros[i].fechaNac.includes('/11/'))
        sumDiciembre += (terneros[i].fechaNac.includes('/12/'))


    }

    let sumEneroM = 0;
    let sumFebreroM = 0;
    let sumMarzoM = 0;
    let sumAbrilM = 0;
    let sumMayoM = 0;
    let sumJunioM = 0;
    let sumJulioM = 0;
    let sumAgostoM = 0;
    let sumSeptiembreM = 0;
    let sumOctubreM = 0;
    let sumNoviembreM = 0;
    let sumDiciembreM = 0;

    for (let i = 0; i < muertes.length; i++) {

        sumEneroM += (muertes[i].fecha.includes('/01/'))
        sumFebreroM += (muertes[i].fecha.includes('/02/'))
        sumMarzoM += (muertes[i].fecha.includes('/03/'))
        sumAbrilM += (muertes[i].fecha.includes('/04/'))
        sumMayoM += (muertes[i].fecha.includes('/05/'))
        sumJunioM += (muertes[i].fecha.includes('/06/'))
        sumJulioM += (muertes[i].fecha.includes('/07/'))
        sumAgostoM += (muertes[i].fecha.includes('/08/'))
        sumSeptiembreM += (muertes[i].fecha.includes('/09/'))
        sumOctubreM += (muertes[i].fecha.includes('/10/'))
        sumNoviembreM += (muertes[i].fecha.includes('/11/'))
        sumDiciembreM += (muertes[i].fecha.includes('/12/'))


    }

    let sumPEnero = 0;
    let sumPFebrero = 0;
    let sumPMarzo = 0;
    let sumPAbril = 0;
    let sumPMayo = 0;
    let sumPJunio = 0;
    let sumPJulio = 0;
    let sumPAgosto = 0;
    let sumPSeptiembre = 0;
    let sumPOctubre = 0;
    let sumPNoviembre = 0;
    let sumPDiciembre = 0;

    for (let i = 0; i < terneros.length; i++) {

        sumPEnero += (terneros[i].fechaNac.includes('/01/') && terneros[i].parto != null)
        sumPFebrero += (terneros[i].fechaNac.includes('/02/') && terneros[i].parto != null)
        sumPMarzo += (terneros[i].fechaNac.includes('/03/') && terneros[i].parto != null)
        sumPAbril += (terneros[i].fechaNac.includes('/04/') && terneros[i].parto != null)
        sumPMayo += (terneros[i].fechaNac.includes('/05/') && terneros[i].parto != null)
        sumPJunio += (terneros[i].fechaNac.includes('/06/') && terneros[i].parto != null)
        sumPJulio += (terneros[i].fechaNac.includes('/07/') && terneros[i].parto != null)
        sumPAgosto += (terneros[i].fechaNac.includes('/08/') && terneros[i].parto != null)
        sumPSeptiembre += (terneros[i].fechaNac.includes('/09/') && terneros[i].parto != null)
        sumPOctubre += (terneros[i].fechaNac.includes('/10/') && terneros[i].parto != null)
        sumPNoviembre += (terneros[i].fechaNac.includes('/11/') && terneros[i].parto != null)
        sumPDiciembre += (terneros[i].fechaNac.includes('/12/') && terneros[i].parto != null)


    }

    


    const chartData = {
        labels: ['Terneros Enfermos', 'Terneros Sanos'],

        datasets: [
            {
                data: [sum1, sum2],
                backgroundColor: [
                    "#e2504c",
                    "#5dc460",
                ],
                hoverBackgroundColor: [
                    "#c63637",
                    "#42ab49",
                ]
            }]
    };

    const chartTernP = {
        labels: ['Terneros con Parto', 'Terneros sin Parto'],

        datasets: [
            {
                data: [sum3, sum4],
                backgroundColor: [
                    "#e2e37e",
                    "#bf9780",
                ],
                hoverBackgroundColor: [
                    "#c8ca66",
                    "#a68069",
                ]
            }]
    };

    const chartPartoNA = {
        labels: ['Partos Naturales', 'Partos Asistidos'],

        datasets: [
            {
                data: [sum5, sum6],
                backgroundColor: [
                    "#6a9eda",
                    "#a788ab",
                ],
                hoverBackgroundColor: [
                    "#5086c1",
                    "#8f7193",
                ],
            }]
    };



    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#000000'
                }
            }
        }
    });


    const basicData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Muertes por Mes',
                backgroundColor: 'red',
                data: [sumEneroM, sumFebreroM, sumMarzoM, sumAbrilM, sumMayoM, sumJunioM, sumJulioM, sumAgostoM, sumSeptiembreM, sumOctubreM, sumNoviembreM, sumDiciembreM],
                tension: .4,
                fill: false,

            }
        ]
    };

    const basicData2 = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Terneros Nacidos en Mes',
                backgroundColor: '#E89309',
                data: [sumEnero, sumFebrero, sumMarzo, sumAbril, sumMayo, sumJunio, sumJulio, sumAgosto, sumSeptiembre, sumOctubre, sumNoviembre, sumDiciembre]
            },
            {
                label: 'Partos en Mes',
                backgroundColor: '#F24576',
                data: [sumPEnero, sumPFebrero, sumPMarzo, sumPAbril, sumPMayo, sumPJunio, sumPJulio, sumPAgosto, sumPSeptiembre, sumPOctubre, sumPNoviembre, sumPDiciembre]
            }
        ]
    };


    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions,
        }
    }
    const { basicOptions } = getLightTheme();

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <label htmlFor="startDate">Filtrar desde</label>
                <Calendar id="startDate" label="Prueba" onChange={(e) => setStartDate(e.target.value)} showButtonBar dateFormat="dd/mm/yy" style={{marginLeft: '0.5em', marginRight: '0.5em'}}></Calendar>
                {!startDate && <small className="p-error">Ingresar Fecha</small>}
                <label htmlFor="endDate">hasta</label>
                <Calendar id="endDate" onChange={(e) => setEndDate(e.target.value)} showButtonBar dateFormat="dd/mm/yy" style={{marginLeft: '0.5em', marginRight: '0.5em'}}></Calendar>
                {!endDate && <small className="p-error">Ingresar Fecha</small>}
                <span className="p-buttonset" style={{marginLeft: '1em'}}>
                    <Button label="Filtrar" icon="pi pi-check" className="p-button-sm p-button-info" onClick={filtrarTerneros} />
                    <Button label="Limpiar" icon="pi pi-trash" className="p-button-sm p-button-secondary" onClick={TernerosGet} />
                </span>

            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                    <Button label="Ultimo mes"  className="p-button-raised p-button-secondary p-button-text" onClick={UltimoMesTGet} />
                    <Button label="Ultimos 3 meses"  className="p-button-raised p-button-secondary p-button-text" onClick={TernerosGet} />
            </React.Fragment>
        )
    }


    return (

        <div className="surface-0">
            <ResponsiveAppBar />
            <br />

            <Toolbar className=" shadow-2 mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

            <div className="grid">
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-600 font-medium mb-3">Terneros</span>
                                <div className="text-900 font-medium text-xl">{terneros.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <img alt="imgFooter" src="https://i.ibb.co/VQXYj46/cow-animal-5833.png"></img>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">{ternerosF.length}</span>
                        <span className="text-500">registros totales</span>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-600 font-medium mb-3">Guacheras</span>
                                <div className="text-900 font-medium text-xl">{guacheras.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <img alt="imgFooter" src="https://i.ibb.co/512743V/3586361-location-map-navigation-pointer-107948.png"></img>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">{guacheras.length}</span>
                        <span className="text-500">registros totales</span>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-600 font-medium mb-3">Muertes</span>
                                <div className="text-900 font-medium text-xl">{muertes.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <img alt="imgFooter" src="https://i.ibb.co/W2tpTG5/cow-virus-icon-140583.png"></img>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">{muertesF.length}</span>
                        <span className="text-500">registros totales</span>
                    </div>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-600 font-medium mb-3">Partos</span>
                                <div className="text-900 font-medium text-xl">{partos.length}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <img alt="imgFooter" src="https://i.ibb.co/41M1HP3/heart-rhythm-icon-icons-com-56083.png"></img>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">{partosF.length}</span>
                        <span className="text-500">registros totales</span>
                    </div>
                </div>
            </div>
            <br />

            


            <div className="grid">


                <div className="col-12 lg:col-4">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Terneros Enfermos/Sanos</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="pie" data={chartData} options={lightOptions} />

                    </div>
                    
                </div>

                <div className="col-12 lg:col-4">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Partos Naturales/Asistidos</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="doughnut" data={chartPartoNA} options={lightOptions} />
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Terneros con/sin Parto asociado</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="pie" data={chartTernP} options={lightOptions} />
                    </div>
                </div>


                <div className="col-12 lg:col-6">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Muertes por Mes</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="line" data={basicData} options={basicOptions} />
                    </div>
                </div>

                <div className="col-12 lg:col-6">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Terneros/Partos totales por Mes</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="bar" data={basicData2} options={basicOptions} />
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Terneros/Partos totales por Mes</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="polarArea" data={chartDataRegistros} options={lightOptions} />
                    </div>
                </div>


            </div>
        </div>






    );


};

export default Graficas;
