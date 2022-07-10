import React, { useState, useEffect, useRef } from 'react';
import { DataView} from 'primereact/dataview';
import { Button } from 'primereact/button';
import ResponsiveAppBar from './ResponsiveAppBar'
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import './DataScrollerDemo.css';


const TernerosE = () => {
    const [terneros, setTerneros] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);
    const [selectEnfermedad, setSelectEnfermedad] = useState([]);
    const ds = useRef(null);

    useEffect(() => {
        TernerosGet();
        EnfermedadesGet();
    }, []); 

    const TernerosGet = () => {
        fetch("http://localhost:8080/ternero/ternEnfe")
            .then(res => res.json())
            .then(
                (result) => {
                   
                        setTerneros(result) 
                    
                
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

    const filtrarTerneros = () => {
        fetch("http://localhost:8080/ternero/filtrarTEnfe/" + selectEnfermedad.nombre)
            .then(res => res.json())
            .then(
                (result) => {
                    setTerneros(result)
                }
            )
    }





    const itemTemplate = (data) => {
        return (
            <div class="col-12 md:col-6 xl:col-3 p-3">
                <div class="surface-card shadow-2 border-rounded p-3" style={{borderRadius: '6px'}}>
                    <img src={data.salud} class="mb-3 w-full"/>
                        <div class="flex justify-content-between align-items-start">
                            <div>
                                <div class="text-xl font-medium text-900 mb-2">{data.nroTernero}</div>
                                <p class="mt-0 mb-3 text-600">Trazabilidad: {data.trazabilidad}</p></div>
                        </div>
                        <ul class="list-none m-0 p-0">
                            <li class="px-0 py-2 flex justify-content-between align-items-center border-bottom-1 surface-border"><span class="text-600 font-medium text-sm">Created</span><span class="text-900 font-medium text-sm">Yesterday 11:30</span></li>
                            <li class="px-0 py-2 flex justify-content-between align-items-center border-bottom-1 surface-border"><span class="text-600 font-medium text-sm">Enfermedad</span><span class="text-900 font-medium text-sm">{data.enfermedad.nombre}</span></li>
                            <li class="px-0 py-2 flex justify-content-between align-items-center"><span class="text-600 font-medium text-sm" style={{paddingRight:'3em'}}>Observacion</span><span class="text-900 font-medium text-sm">{data.enfermedad.observaciones}</span></li>
                        </ul>
                </div>
            </div>            
        );
    }

    const footer = <Button type="text" icon="pi pi-plus" label="Cargar" onClick={() => ds.current.load()} />;

    
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <label htmlFor="startDate">Seleccionar Enfermedad</label>
                
                    <Dropdown value={selectEnfermedad} options={enfermedades} onChange={(e) => setSelectEnfermedad(e.value)} optionLabel="nombre" placeholder="Seleccionar enfermedad" style={{ marginLeft: '0.5em', marginRight: '0.5em' }}/>
                    <span className="p-buttonset" style={{ marginLeft: '1em' }}>
                    <Button label="Filtrar" icon="pi pi-check" className="p-button-sm p-button-info" onClick={filtrarTerneros} />
                    <Button label="Limpiar" icon="pi pi-trash" className="p-button-sm p-button-secondary" onClick={TernerosGet} />
</span>

            </React.Fragment>
        )
    }

    return (
        <div className="datascroller-demo">
            <ResponsiveAppBar />
            <Toolbar className=" shadow-2 mb-4" left={leftToolbarTemplate} ></Toolbar>
            <div className="card">
                <DataView ref={ds} value={terneros} itemTemplate={itemTemplate} rows={5}
                    loader footer={footer} header="Terneros" placeholder="Seleccionar Madre"/>
            </div>
        </div>
    );
}
                 

export default TernerosE;