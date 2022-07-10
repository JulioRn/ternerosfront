import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import ResponsiveAppBar from './ResponsiveAppBar'
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import './DataScrollerDemo.css';


const TernerosG = () => {
    const [terneros, setTerneros] = useState([]);
    const [guacheras, setGuacheras] = useState([]);
    const [selectGuachera, setSelectGuachera] = useState([]);
    const ds = useRef(null);

    useEffect(() => {
        TernerosGet();
        GuacherasGet();
    }, []); 

    const TernerosGet = () => {
        fetch("http://localhost:8080/ternero/ternGuach")
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


    const filtrarTerneros = () => {
        fetch("http://localhost:8080/ternero/filtrarTGuach/" + selectGuachera.nroGuachera)
            .then(res => res.json())
            .then(
                (result) => {
                    setTerneros(result)
                }
            )        
    }





    const itemTemplate = (data) => {
        return (
            <div className="product-item">
                 <img src={`${data.salud}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.image} className="product-image" style={{ width: '70px', boxShadow: 'none' }} />
                <div className="product-detail">
                    <div className="product-name">{data.nroTernero}</div>
                    <div className="product-description">Fecha Nacimiento:  {data.fechaNac}</div>
                    <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.trazabilidad}</span>
                </div>
                <div className="product-action">
                    <span className="product-price">{data.peso}</span>
                    <span className={`product-badge status-${data.sexo.toLowerCase()}`}>{data.sexo}</span>
                </div>
            </div>
        );
    }

    const footer = <Button type="text" icon="pi pi-plus" label="Cargar" onClick={() => ds.current.load()} />;

    
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <label htmlFor="startDate">Seleccionar Guachera</label>
                
                    <Dropdown value={selectGuachera} options={guacheras} onChange={(e) => setSelectGuachera(e.value)} optionLabel="nroGuachera" placeholder="Seleccionar guachera" style={{ marginLeft: '0.5em', marginRight: '0.5em' }}/>
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
                <DataScroller ref={ds} value={terneros} itemTemplate={itemTemplate} rows={5}
                    loader footer={footer} header="Terneros" placeholder="Seleccionar Madre"/>
            </div>
        </div>
    );
}
                 

export default TernerosG;