import * as React from 'react';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { classNames } from 'primereact/utils';
import ResponsiveAppBar from './ResponsiveAppBar';






export default function GestionTerneros() {

    var moment = require('moment');

    const navigate = useNavigate();
    const toast = useRef(null);

    const [selectedTerneros, setSelectedTerneros] = useState(null);

    const [terneroDialog, setTerneroDialog] = useState(false);

    const [terneros, setTerneros] = useState([]);
    useEffect(() => {
        TernerosGet();
        initFilters1();
    }, [])


    const TerneroGuardar = () => {
        setSubmitted(true);



        var data = {
            'id': null,
            'nroTernero': nroTernero,
            'fechaNac': fechaNac,
            'peso': peso,
            'parto': parto,
            'cantCal': cantCal,
            'fechaRef': fechaRef,
            'fechaDes': fechaDes,
            'pesoDes': pesoDes,
            'valor': valor,
            'altura': altura,
            'tiempo': tiempo,
        }
        var data2 = {
            'id': null,
            'nroTernero': nroTernero,
            'fechaNac': fechaNacC,
            'peso': peso,
            'parto': parto,
            'cantCal': cantCal,
            'fechaRef': fechaRefC,
            'fechaDes': fechaDesC,
            'pesoDes': pesoDes,
            'valor': valor,
            'altura': altura,
            'tiempo': tiempo,
        }
        let _terneros = [...terneros];
        let _ternero = { ...data2 };

        if (nroTernero === '') {
            console.log("Error");
        } else {
            fetch("http://localhost:8080/ternero/agregar", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            }

            )
                .then(res => res.json())
                .then(
                    (result) => {
                        alert(result['message'])
                        if (result['status'] === 'ok') {

                        }
                    }

                )

            _terneros.push(_ternero);
            setTerneros(_terneros);
            setTerneroDialog(false);
            console.log(fechaNac);

        }

    }

    const [nroTernero, setNroTernero] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    const [fechaDes, setFechaDes] = useState('')
    const [peso, setPeso] = useState('')
    const [parto, setParto] = useState('')
    const [valor, setValor] = useState('')
    const [pesoDes, setPesoDes] = useState('')
    const [altura, setAltura] = useState('')
    const [cantCal, setCantCal] = useState('')
    const [tiempo, setTiempo] = useState('')
    const [fechaRef, setFechaRef] = useState('')
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const fechaNacC = moment(fechaNac).format('DD/MM/YYYY');
    const fechaDesC = moment(fechaDes).format('DD/MM/YYYY');
    const fechaRefC = moment(fechaRef).format('DD/MM/YYYY');


    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'nroTernero': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fechaNac': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'tiempo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fechaRef': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'parto': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'cantCal': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'peso': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
        setGlobalFilterValue1('');
    }

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const TernerosGet = () => {
        fetch("http://localhost:8080/ternero/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setTerneros(result)
                }
            )
    }

    const TerneroDelete = () => {
        fetch("http://localhost:8080/ternero/eliminar/" + selectedTerneros.id)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Ternero Eliminado', life: 3000 })


            );
        let _terneros = terneros.filter(val => val.id !== selectedTerneros.id);
        setTerneros(_terneros);
        setDeleteTerneroDialog(false);
    }



    const openNew = () => {
        setSubmitted(false);
        setTerneroDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" />

            </React.Fragment>
        )
    }

    const regresarToolbar = () => {
        return (
            <React.Fragment>
                <Button label="Volver" icon="pi pi-backward" className="p-button p-component p-button-raised p-button-success" onClick={() => navigate(-1)} />
            </React.Fragment>
        )
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Gestionar Terneros</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar..." />
            </span>
        </div>
    );

    const hideDialog = () => {
        setSubmitted(false);
        setTerneroDialog(false);
    }

    const terneroDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={TerneroGuardar} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteTernero(rowData)} />
            </React.Fragment>
        );
    }

    const [deleteTerneroDialog, setDeleteTerneroDialog] = useState(false);

    const hideDeleteTerneroDialog = () => {
        setDeleteTerneroDialog(false);
    }

    const confirmDeleteTernero = () => {
        setDeleteTerneroDialog(true);
    }

    const deleteTerneroDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTerneroDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={TerneroDelete} />
        </React.Fragment>
    );




    return (



        <div className="datatable-crud-demo">
            <ResponsiveAppBar />
            <br />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="p-toolbar p-component mb-4" left={leftToolbarTemplate} ></Toolbar>
                <DataTable value={terneros} reflow="true"  selection={selectedTerneros} onSelectionChange={(e) => setSelectedTerneros(e.value)} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} terneros" filters={filters1} globalFilterFields={['nroTernero', 'fechaNac', 'peso', 'fechaRef', 'tiempo', 'parto', 'cantCal']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="nroTernero" header="NRO TERNERO"></Column>
                    <Column field="fechaNac" header="FECHA NACIMIENTO"></Column>
                    <Column field="peso" header="PESO"></Column>
                    <Column field="parto" header="PARTO"></Column>

                    <Column field="cantCal" header="CANTIDAD"></Column>
                    <Column field="tiempo" header="TIEMPO"></Column>


                    <Column field="fechaDes" header="FECHA DESLECHE"></Column>
                    <Column field="valor" header="VALOR"></Column>
                    <Column field="tiempo" header="Tiempo Calostro"></Column>
                    <Column field="fechaRef" header="Fecha Refractrometria"></Column>

                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" left={regresarToolbar} ></Toolbar>
            </div>

            <Dialog visible={terneroDialog} style={{ width: '450px' }} header="Datos Ternero" modal className="p-fluid" footer={terneroDialogFooter} onHide={hideDialog}>


                <Divider align="center">
                    <span className="p-tag">Nacimiento</span>
                </Divider>
                <div className="field">
                    <label htmlFor="nroTernero">Nro Ternero</label>
                    <InputText id="nroTernero" onChange={(e) => setNroTernero(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nroTernero })} />
                    {submitted && !nroTernero && <small className="p-error">Ingresar Nro Ternero</small>}
                </div>
                <div className="field">
                    <label htmlFor="fechaNac">Fecha Nacimiento</label>
                    <Calendar id="fechaNac"  onChange={(e) => setFechaNac(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !tiempo })}></Calendar>                    {submitted && !fechaNac && <small className="p-error">Ingresar fechaNac</small>}
                </div>
                <div className="field">
                    <label htmlFor="peso">Peso Nacimiento</label>
                    <InputText id="peso" locale="es" onChange={(e) => setPeso(e.target.value)} required className={classNames({ 'p-invalid': submitted && !peso })} />
                    {submitted && !peso && <small className="p-error">Ingresar Peso Nacimiento</small>}
                </div>
                <div className="field">
                    <label htmlFor="parto">Parto</label>
                    <InputText id="parto" onChange={(e) => setParto(e.target.value)} required className={classNames({ 'p-invalid': submitted && !parto })} />
                    {submitted && !parto && <small className="p-error">Ingresar Parto</small>}
                </div>

                <Divider align="center">
                    <span className="p-tag">Calostrado</span>
                </Divider>

                <div className="field">
                    <label htmlFor="cantCal">Cantidad</label>
                    <InputText id="cantCal" onChange={(e) => setCantCal(e.target.value)} required className={classNames({ 'p-invalid': submitted && !cantCal })} />
                    {submitted && !cantCal && <small className="p-error">Ingresar Cantidad</small>}
                </div>

                <div className="field">
                    <label htmlFor="tiempo">Tiempo/Nacimiento</label>
                    <InputText id="tiempo" onChange={(e) => setTiempo(e.target.value)} required className={classNames({ 'p-invalid': submitted && !tiempo })} />
                
                    {submitted && !tiempo && <small className="p-error">Ingresar Tiempo</small>}
                </div>

                <Divider align="center">
                    <span className="p-tag">Refractrometria</span>
                </Divider>

                <div className="field">
                    <label htmlFor="fechaRef">Fecha Refractrometria</label>
                    <Calendar id="fechaRef" onChange={(e) => setFechaRef(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !tiempo })}></Calendar>
                    {submitted && !fechaRef && <small className="p-error">Ingresar Fecha</small>}
                </div>

                <div className="field">
                    <label htmlFor="valor">Valor</label>
                    <InputText id="valor" onChange={(e) => setValor(e.target.value)} required className={classNames({ 'p-invalid': submitted && !fechaRef })} />
                    {submitted && !fechaRef && <small className="p-error">Ingresar Valor</small>}
                </div>

                <Divider align="center">
                    <span className="p-tag">Desleche</span>
                </Divider>

                <div className="field">
                    <label htmlFor="fechaDes">Fecha Desleche</label>
                    <Calendar id="fechaDes" onChange={(e) => setFechaDes(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !tiempo })}></Calendar>
                    {submitted && !fechaDes && <small className="p-error">Ingresar Fecha</small>}
                </div>

                <div className="field">
                    <label htmlFor="pesoDes">Peso Desleche</label>
                    <InputText id="pesoDes" onChange={(e) => setPesoDes(e.target.value)} required className={classNames({ 'p-invalid': submitted && !peso })} />
                    {submitted && !pesoDes && <small className="p-error">Ingresar Peso desleche</small>}
                </div>

                <div className="field">
                    <label htmlFor="altura">Altura</label>
                    <InputText id="altura" onChange={(e) => setAltura(e.target.value)} required className={classNames({ 'p-invalid': submitted && !peso })} />
                    {submitted && !altura && <small className="p-error">Ingresar Altura</small>}
                </div>


                
                
                

            </Dialog>

            <Dialog visible={deleteTerneroDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteTerneroDialogFooter} onHide={hideDeleteTerneroDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedTerneros && <span>Seguro desea eliminar el ternero: <b>{selectedTerneros.nroTernero}</b> ?</span>}
                </div>
            </Dialog>

        </div>

    );
}