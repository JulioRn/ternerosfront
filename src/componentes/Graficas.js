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
    const [muertes, setMuertes] = useState([]);
    const [refractrometrias, setRefractrometrias] = useState([]);

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    const [ternerosF, setTernerosF] = useState([]);
    const [muertesF, setMuertesF] = useState([]);







    useEffect(() => {
        TernerosGet();
        GuacherasGet();
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


    


    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    let partosN = 0;
    let partosA = 0;
    let partosSR = 0;



    for (let i = 0; i < terneros.length; i++) {

        sum1 += (terneros[i].enfermedad != null);
        sum2 += (terneros[i].enfermedad == null);

    }

    for (let i = 0; i < terneros.length; i++) {

        sum3 += (terneros[i].tipoPar !== '');

    }
    let contador = 0;

    for (let i = 0; i < ternerosF.length; i++) {

        contador += (ternerosF[i].tipoPar !== null)

    }

    let contadorMuertes = 0;
    for (let i = 0; i < terneros.length; i++) {

        contadorMuertes += (terneros[i].muerte !== null);

    }
    let contadorMuertesF = 0;

    for (let i = 0; i < ternerosF.length; i++) {

        contadorMuertesF += (ternerosF[i].muerte !== null)

    }


    for (let i = 0; i < terneros.length; i++) {
        partosN += (terneros[i].tipoPar.includes('NORMAL'));
        partosA += (terneros[i].tipoPar.includes('ASISTIDO'));
        partosSR += (terneros[i].tipoPar === '');
        
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

   

    let sumEneroMM = 0;
    let sumFebreroMM = 0;
    let sumMarzoMM = 0;
    let sumAbrilMM = 0;
    let sumMayoMM = 0;
    let sumJunioMM = 0;
    let sumJulioMM = 0;
    let sumAgostoMM = 0;
    let sumSeptiembreMM = 0;
    let sumOctubreMM = 0;
    let sumNoviembreMM = 0;
    let sumDiciembreMM = 0;

    let sumEneroMH = 0;
    let sumFebreroMH = 0;
    let sumMarzoMH = 0;
    let sumAbrilMH = 0;
    let sumMayoMH = 0;
    let sumJunioMH = 0;
    let sumJulioMH = 0;
    let sumAgostoMH = 0;
    let sumSeptiembreMH = 0;
    let sumOctubreMH = 0;
    let sumNoviembreMH = 0;
    let sumDiciembreMH = 0;

    for (let i = 0; i < terneros.length; i++) {

        if (terneros[i].muerte !== null) {

            if (terneros[i].sexo === 'MACHO') {


                sumEneroMM += (terneros[i].muerte.fecha.includes('/01/'))
                sumFebreroMM += (terneros[i].muerte.fecha.includes('/02/'))
                sumMarzoMM += (terneros[i].muerte.fecha.includes('/03/'))
                sumAbrilMM += (terneros[i].muerte.fecha.includes('/04/'))
                sumMayoMM += (terneros[i].muerte.fecha.includes('/05/'))
                sumJunioMM += (terneros[i].muerte.fecha.includes('/06/'))
                sumJulioMM += (terneros[i].muerte.fecha.includes('/07/'))
                sumAgostoMM += (terneros[i].muerte.fecha.includes('/08/'))
                sumSeptiembreMM += (terneros[i].muerte.fecha.includes('/09/'))
                sumOctubreMM += (terneros[i].muerte.fecha.includes('/10/'))
                sumNoviembreMM += (terneros[i].muerte.fecha.includes('/11/'))
                sumDiciembreMM += (terneros[i].muerte.fecha.includes('/12/'))

            } else if (terneros[i].sexo === 'HEMBRA') {


                sumEneroMH += (terneros[i].muerte.fecha.includes('/01/'))
                sumFebreroMH += (terneros[i].muerte.fecha.includes('/02/'))
                sumMarzoMH += (terneros[i].muerte.fecha.includes('/03/'))
                sumAbrilMH += (terneros[i].muerte.fecha.includes('/04/'))
                sumMayoMH += (terneros[i].muerte.fecha.includes('/05/'))
                sumJunioMH += (terneros[i].muerte.fecha.includes('/06/'))
                sumJulioMH += (terneros[i].muerte.fecha.includes('/07/'))
                sumAgostoMH += (terneros[i].muerte.fecha.includes('/08/'))
                sumSeptiembreMH += (terneros[i].muerte.fecha.includes('/09/'))
                sumOctubreMH += (terneros[i].muerte.fecha.includes('/10/'))
                sumNoviembreMH += (terneros[i].muerte.fecha.includes('/11/'))
                sumDiciembreMH += (terneros[i].muerte.fecha.includes('/12/'))

            }
        }
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

    let sumPEneroH = 0;
    let sumPFebreroH = 0;
    let sumPMarzoH = 0;
    let sumPAbrilH = 0;
    let sumPMayoH = 0;
    let sumPJunioH = 0;
    let sumPJulioH = 0;
    let sumPAgostoH = 0;
    let sumPSeptiembreH = 0;
    let sumPOctubreH = 0;
    let sumPNoviembreH = 0;
    let sumPDiciembreH = 0;

    for (let i = 0; i < terneros.length; i++) {

        if (terneros[i].tipoPar !== '' ) {

            if (terneros[i].sexo === 'MACHO') {

                sumPEnero += (terneros[i].fechaNac.includes('/01/'))
                sumPFebrero += (terneros[i].fechaNac.includes('/02/'))
                sumPMarzo += (terneros[i].fechaNac.includes('/03/'))
                sumPAbril += (terneros[i].fechaNac.includes('/04/'))
                sumPMayo += (terneros[i].fechaNac.includes('/05/'))
                sumPJunio += (terneros[i].fechaNac.includes('/06/'))
                sumPJulio += (terneros[i].fechaNac.includes('/07/'))
                sumPAgosto += (terneros[i].fechaNac.includes('/08/'))
                sumPSeptiembre += (terneros[i].fechaNac.includes('/09/'))
                sumPOctubre += (terneros[i].fechaNac.includes('/10/'))
                sumPNoviembre += (terneros[i].fechaNac.includes('/11/'))
                sumPDiciembre += (terneros[i].fechaNac.includes('/12/'))
            } else if (terneros[i].sexo === 'HEMBRA') {

                sumPEneroH += (terneros[i].fechaNac.includes('/01/'))
                sumPFebreroH += (terneros[i].fechaNac.includes('/02/'))
                sumPMarzoH += (terneros[i].fechaNac.includes('/03/'))
                sumPAbrilH += (terneros[i].fechaNac.includes('/04/'))
                sumPMayoH += (terneros[i].fechaNac.includes('/05/'))
                sumPJunioH += (terneros[i].fechaNac.includes('/06/'))
                sumPJulioH += (terneros[i].fechaNac.includes('/07/'))
                sumPAgostoH += (terneros[i].fechaNac.includes('/08/'))
                sumPSeptiembreH += (terneros[i].fechaNac.includes('/09/'))
                sumPOctubreH += (terneros[i].fechaNac.includes('/10/'))
                sumPNoviembreH += (terneros[i].fechaNac.includes('/11/'))
                sumPDiciembreH += (terneros[i].fechaNac.includes('/12/'))

            }

        }

    }






    let excelente= 0;
    let bueno= 0;
    let regular= 0;
    let pobre=0;


    let excelenteR= 0;
    let buenoR=0;
    let regularR=0;
    let pobreR=0;

    let excelenteC= 0;
    let buenoC=0;
    let regularC=0;
    let pobreC=0;

    

    for (let i = 0; i < refractrometrias.length; i++) {

        if (refractrometrias[i].evento === 'Refractrometro') {


            excelenteR += (refractrometrias[i].nota >= 9.4)
            buenoR += (refractrometrias[i].nota >= 8.9 && refractrometrias[i].nota <= 9.3)
            regularR += (refractrometrias[i].nota >= 8.1 && refractrometrias[i].nota <= 8.8)
            pobreR += (refractrometrias[i].nota < 8.1)
            

        } else if (refractrometrias[i].evento === 'Calostrometro') {


            excelenteC += (refractrometrias[i].nota >= 6.2)
            buenoC += (refractrometrias[i].nota >= 5.8 && refractrometrias[i].nota <= 6.1)
            regularC += (refractrometrias[i].nota >= 5.1 && refractrometrias[i].nota <= 5.7)
            pobreC += (refractrometrias[i].nota < 5.1)

        }

        excelente= (excelenteR + excelenteC);
        bueno= (buenoR + buenoC);
        regular=(regularR + regularC);
        pobre= (pobreR + pobreC);

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

    const partosSexos = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'MACHOS',
                borderColor: '#6B8E23',
                data: [sumPEnero, sumPFebrero, sumPMarzo, sumPAbril, sumPMayo, sumPJunio, sumPJulio, sumPAgosto, sumPSeptiembre, sumPOctubre, sumPNoviembre, sumPDiciembre],
                tension: .4,
                fill: false,

            },
            {
                label: 'HEMBRAS',
                borderColor: '#FFA500',
                data: [sumPEneroH, sumPFebreroH, sumPMarzoH, sumPAbrilH, sumPMayoH, sumPJunioH, sumPJulioH, sumPAgostoH, sumPSeptiembreH, sumPOctubreH, sumPNoviembreH, sumPDiciembreH],
                tension: .4,
                fill: false,

            }
        ]
    };


    console.log(partosSR)

    const chartPartoNA = {
        labels: ['Partos Naturales', 'Partos Asistidos', 'Sin registros'],

        datasets: [
            {
                data: [partosN, partosA, partosSR],
                backgroundColor: [
                    "#6a9eda",
                    "#a788ab",
                    "#FF6347",
                ],
                hoverBackgroundColor: [
                    "#5086c1",
                    "#8f7193",
                    "#FF6347",
                ],
            }]
    };

    const chartRefractro = {
        labels: ['Excelente', 'Bueno', 'Regular', 'Pobre'],

        datasets: [
            {
                data: [excelente, bueno, regular, pobre],
                backgroundColor: [
                    "#00FF7F",
                    "#4682B4",
                    "#D8BFD8",
                    "#FF6347",
                ]
            }]
    };



    

    const [basico] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    


    const refras = {
        labels: ['Excelente', 'Bueno', 'Regular', 'Pobre'],
        datasets: [
            {
                label: 'Refractrometro',
                backgroundColor: '#42A5F5',
                data: [excelenteR, buenoR, regularR, pobreR],


            },
            {
                label: 'Calostrometro',
                backgroundColor: '#FFA726',
                data: [excelenteC, buenoC, regularC, pobreC],


            }
        ]
    };


    const muertesMes = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'MACHOS',
                borderColor: '#42A5F5',
                data: [sumEneroMM, sumFebreroMM, sumMarzoMM, sumAbrilMM, sumMayoMM, sumJunioMM, sumJulioMM, sumAgostoMM, sumSeptiembreMM, sumOctubreMM, sumNoviembreMM, sumDiciembreMM],
                tension: .4,
                fill: false,

            },
            {
                label: 'HEMBRAS',
                borderColor: '#00bb7e',
                data: [sumEneroMH, sumFebreroMH, sumMarzoMH, sumAbrilMH, sumMayoMH, sumJunioMH, sumJulioMH, sumAgostoMH, sumSeptiembreMH, sumOctubreMH, sumNoviembreMH, sumDiciembreMH],
                tension: .4,
                fill: false,

            }
        ]
    };



    const basicData2 = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Terneros Registrados en Mes',
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

        let horizontalOptions = {
            indexAxis: 'y',
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
            basicOptions, horizontalOptions
        }
    }
    const { basicOptions, horizontalOptions } = getLightTheme();

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <label htmlFor="startDate">Filtrar desde</label>
                <Calendar id="startDate" label="Prueba" onChange={(e) => setStartDate(e.target.value)} showButtonBar dateFormat="dd/mm/yy" style={{ marginLeft: '0.5em', marginRight: '0.5em' }}></Calendar>
                {!startDate && <small className="p-error">Ingresar Fecha</small>}
                <label htmlFor="endDate">hasta</label>
                <Calendar id="endDate" onChange={(e) => setEndDate(e.target.value)} showButtonBar dateFormat="dd/mm/yy" style={{ marginLeft: '0.5em', marginRight: '0.5em' }}></Calendar>
                {!endDate && <small className="p-error">Ingresar Fecha</small>}
                <span className="p-buttonset" style={{ marginLeft: '1em' }}>
                    <Button label="Filtrar" icon="pi pi-check" className="p-button-sm p-button-info" onClick={filtrarTerneros} />
                    <Button label="Limpiar" icon="pi pi-trash" className="p-button-sm p-button-secondary" onClick={TernerosGet} />
                </span>

            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Ultimo mes" className="p-button-raised p-button-secondary p-button-text" onClick={UltimoMesTGet} />
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
                                <div className="text-900 font-medium text-xl">{contadorMuertes}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <img alt="imgFooter" src="https://i.ibb.co/W2tpTG5/cow-virus-icon-140583.png"></img>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">{contadorMuertesF}</span>
                        <span className="text-500">registros totales</span>
                    </div>
                </div>
                
                <div className="col-12 md:col-6 lg:col-3">
                    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-600 font-medium mb-3">Partos</span>
                                <div className="text-900 font-medium text-xl">{sum3}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <img alt="imgFooter" src="https://i.ibb.co/41M1HP3/heart-rhythm-icon-icons-com-56083.png"></img>
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">{contador}</span>
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
                        <Chart type="pie" data={chartData} options={basico}  />

                    </div>

                </div>

                <div className="col-12 lg:col-4">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Partos Naturales/Asistidos</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="doughnut" data={chartPartoNA} options={basico} />
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Resutados Calostrados</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="doughnut" data={chartRefractro} options={basico} />
                    </div>
                </div>

                <div className="col-12 lg:col-6">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Refractometrias por Mes</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="bar" data={refras} options={horizontalOptions} />
                    </div>
                </div>


                <div className="col-12 lg:col-6">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Partos por Mes</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="line" data={partosSexos} options={basicOptions} />
                    </div>
                </div>

                
                <div className="col-12 lg:col-6">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Muertes por Mes</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="line" data={muertesMes} options={basicOptions} />
                    </div>
                </div>

                <div className="col-12 lg:col-6">
                    <div className="surface-card shadow-2 border-round p-4">
                        <div className="text-900 font-medium text-xl mb-2">Terneros/Partos totales por Mes</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Chart type="bar" data={basicData2} options={horizontalOptions} />
                    </div>
                </div>



               

                
            </div>
        </div>






    );


};

export default Graficas;
