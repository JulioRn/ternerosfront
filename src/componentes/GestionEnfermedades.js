import * as React from 'react';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { classNames } from 'primereact/utils';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Calendar } from 'primereact/calendar';






export default function GestionEnfermedades() {

    

    const navigate = useNavigate();
    const toast = useRef(null);

    const [selectedEnfermedades, setSelectedEnfermedades] = useState(null);

    const [enfermedadDialog, setEnfermedadDialog] = useState(false);

    const [enfermedades, setEnfermedades] = useState([]);
    useEffect(() => {
        EnfermedadesGet();
        initFilters1();
    }, [])


    const EnfermedadGuardar = () => {
        setSubmitted(true);



        var data = {
            'id_enfermedad': null,
            'nombre': nombre,
            'fechaIn': fechaIn,
            'temRec': temRec,
            'deshidratacion': deshidratacion,
            'diarrea': diarrea,
            'descNasal': descNasal,
            'descOcular': descOcular,
            'frecResp': frecResp,
            'otros': otros,
            'tratamiento': tratamiento,
            'fechaFin': fechaFin,
            'fechaMuerte': fechaMuerte,
            'observaciones': observaciones,
            'medicamento': medicamento,
            'tos': tos,
        }
        let _enfermedades = [...enfermedades];
        let _enfermedad = { ...data };

        if (fechaIn === '') {
            console.log("Error");
        } else {
            fetch("http://localhost:8080/enfermedad/agregar", {
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

                _enfermedades.push(_enfermedad);
                setEnfermedades(_enfermedades);     
        setEnfermedadDialog(false);

        }

    }

    const [nombre, setNombre] = useState('')
    const [fechaIn, setFechaIn] = useState('')
    const [temRec, settemRec] = useState('')
    const [deshidratacion, setDeshidratacion] = useState('')
    const [diarrea, setDiarrea] = useState('')
    const [descNasal, setDescNasal] = useState('')
    const [tos, setTos] = useState('')
    const [descOcular, setDescOcular] = useState('')
    const [frecResp, setFrecuenciaRes] = useState('')
    const [otros, setOtros] = useState('')
    const [tratamiento, setTratamiento] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [fechaMuerte, setFechaMuerte] = useState('')
    const [observaciones, setObservaciones] = useState('')
    const [medicamento, setMedicamento] = useState('')
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'fechaIn': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'temRec': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'tos': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'descOcular': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'diarrea': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'descNasal': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'deshidratacion': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'frecResp': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'otros': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'tratamiento': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fechaFin': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fechaMuerte': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'observaciones': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'medicamento': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

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

    const EnfermedadesGet = () => {
        fetch("http://localhost:8080/enfermedad/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setEnfermedades(result)
                }
            )
    }

    const EnfermedadDelete = () => {
        fetch("http://localhost:8080/enfermedad/eliminar/" + selectedEnfermedades.id_enfermedad)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Enfermedad Eliminado', life: 3000 })


            );
        let _enfermedades = enfermedades.filter(val => val.id_enfermedad !== selectedEnfermedades.id_enfermedad);
        setEnfermedades(_enfermedades);
        setDeleteEnfermedadDialog(false);
    }



    const openNew = () => {
        setSubmitted(false);
        setEnfermedadDialog(true);
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
            <h5 className="mx-0 my-1">Gestionar Enfermedades</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar..." />
            </span>
        </div>
    );

    const hideDialog = () => {
        setSubmitted(false);
        setEnfermedadDialog(false);
    }

    const enfermedadDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={EnfermedadGuardar} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteEnfermedad(rowData)} />
            </React.Fragment>
        );
    }

    const [deleteEnfermedadDialog, setDeleteEnfermedadDialog] = useState(false);

    const hideDeleteEnfermedadDialog = () => {
        setDeleteEnfermedadDialog(false);
    }

    const confirmDeleteEnfermedad = () => {
        setDeleteEnfermedadDialog(true);
    }

    const deleteEnfermedadDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEnfermedadDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={EnfermedadDelete} />
        </React.Fragment>
    );




    return (



        <div className="datatable-crud-demo">
            <ResponsiveAppBar />
            <br />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="p-toolbar p-component mb-4" left={leftToolbarTemplate} ></Toolbar>
                <DataTable  value={enfermedades} reflow="true" selection={selectedEnfermedades} onSelectionChange={(e) => setSelectedEnfermedades(e.value)} dataKey="id_enfermedad" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} enfermedades" filters={filters1} globalFilterFields={['fechaIn', 'temRec', 'deshidratacion', 'descOcular', 'tos', 'diarrea', 'descNasal']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="deshidratacion" header="DESHIDRATACION"></Column>
                    <Column field="fechaIn" header="FECHA INICIO"></Column>
                    <Column field="temRec" header="TEMPERATURA RECTAL"></Column>
                    <Column field="diarrea" header="DIARREA"></Column>
                    <Column field="descNasal" header="DESCARGA NASAL"></Column>
                    <Column field="tos" header="TOS"></Column>
                    <Column field="descOcular" header="DESCARGA OCULAR"></Column>
                    <Column field="frecResp" header="FRECUENCIA RESPIRATORIA"></Column>
                    <Column field="otros" header="OTROS"></Column>
                   
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" left={regresarToolbar} ></Toolbar>
            </div>

            <Dialog visible={enfermedadDialog} style={{ width: '450px' }} header="Datos Enfermedad" modal className="p-fluid" footer={enfermedadDialogFooter} onHide={hideDialog}>


            <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText id="nombre" onChange={(e) => setNombre(e.target.value)} required className={classNames({ 'p-invalid': submitted && !nombre })} />
                    {submitted && !temRec && <small className="p-error">Ingresar Nombre</small>}
                </div>

            <div className="field">
                    <label htmlFor="fechaIn">Fecha Inicio</label>
                    <Calendar id="fechaIn" onChange={(e) => setFechaIn(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !setFechaIn })}></Calendar>
                    {submitted && !fechaFin && <small className="p-error">Ingresar Fecha Inicio</small>}
                </div>
                <div className="field">
                    <label htmlFor="temRec">Temperatura Rectal</label>
                    <InputText id="temRec" onChange={(e) => settemRec(e.target.value)} required className={classNames({ 'p-invalid': submitted && !temRec })} />
                    {submitted && !temRec && <small className="p-error">Ingresar Temperatura Rectal</small>}
                </div>
                <div className="field">
                    <label htmlFor="deshidratacion">Deshidratacion</label>
                    <InputText id="deshidratacion" onChange={(e) => setDeshidratacion(e.target.value)} required className={classNames({ 'p-invalid': submitted && !deshidratacion })} />
                    {submitted && !deshidratacion && <small className="p-error">Ingresar Deshidratacion</small>}
                </div>
                <div className="field">
                    <label htmlFor="diarrea">Diarrea</label>
                    <InputText id="diarrea" onChange={(e) => setDiarrea(e.target.value)} required className={classNames({ 'p-invalid': submitted && !diarrea })} />
                    {submitted && !diarrea && <small className="p-error">Ingresar Diarrea</small>}
                </div>
                <div className="field">
                    <label htmlFor="descNasal">Descarga Nasal</label>
                    <InputText id="descNasal" onChange={(e) => setDescNasal(e.target.value)} required className={classNames({ 'p-invalid': submitted && !descNasal })} />
                    {submitted && !descNasal && <small className="p-error">Ingresar Descarga Nasal</small>}
                </div>
                <div className="field">
                    <label htmlFor="tos">Tos</label>
                    <InputText id="tos" onChange={(e) => setTos(e.target.value)} required className={classNames({ 'p-invalid': submitted && !tos })} />
                    {submitted && !tos && <small className="p-error">Ingresar Tos</small>}
                </div>
                <div className="field">
                    <label htmlFor="descOcular">Descarga Ocular</label>
                    <InputText id="descOcular" onChange={(e) => setDescOcular(e.target.value)} required className={classNames({ 'p-invalid': submitted && !descOcular })} />
                    {submitted && !descOcular && <small className="p-error">Ingresar Descarga Ocular</small>}
                </div>
                <div className="field">
                    <label htmlFor="frecResp">Frecuencia Respiratoria</label>
                    <InputText id="frecResp" onChange={(e) => setFrecuenciaRes(e.target.value)} required className={classNames({ 'p-invalid': submitted && !tos })} />
                    {submitted && !frecResp && <small className="p-error">Ingresar Frecuencia Respiratoria</small>}
                </div>
                <div className="field">
                    <label htmlFor="otros">Otros</label>
                    <InputText id="otros" onChange={(e) => setOtros(e.target.value)} required className={classNames({ 'p-invalid': submitted && !tos })} />
                    {submitted && !otros && <small className="p-error">Ingresar Otros</small>}
                </div>
                <div className="field">
                    <label htmlFor="tratamiento">Tratamiento</label>
                    <InputText id="tratamiento" onChange={(e) => setTratamiento(e.target.value)} required className={classNames({ 'p-invalid': submitted && !tos })} />
                    {submitted && !tratamiento && <small className="p-error">Ingresar Tratamiento</small>}
                </div>
                <div className="field">
                    <label htmlFor="fechaFin">Fecha Fin</label>
                    <Calendar id="fechaFin" onChange={(e) => setFechaFin(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !fechaFin })}></Calendar>
                    {submitted && !fechaFin && <small className="p-error">Ingresar Fecha Fin</small>}
                </div>
                <div className="field">
                    <label htmlFor="fechaMuerte">Fecha Muerte</label>
                    <Calendar id="fechaMuerte" onChange={(e) => setFechaMuerte(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !fechaMuerte })}></Calendar>
                    {submitted && !fechaMuerte && <small className="p-error">Ingresar Fecha de Muerte</small>}
                </div>
                <div className="field">
                    <label htmlFor="observaciones">Observacion</label>
                    <InputText id="observaciones" onChange={(e) => setObservaciones(e.target.value)} required className={classNames({ 'p-invalid': submitted && !tos })} />
                    {submitted && !observaciones && <small className="p-error">Ingresar Observacion</small>}
                </div>
                <div className="field">
                    <label htmlFor="medicamento">Medicamento</label>
                    <InputText id="medicamento" onChange={(e) => setMedicamento(e.target.value)} required className={classNames({ 'p-invalid': submitted && !tos })} />
                    {submitted && !medicamento && <small className="p-error">Ingresar Medicamento</small>}
                </div>

            </Dialog>

            <Dialog visible={deleteEnfermedadDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteEnfermedadDialogFooter} onHide={hideDeleteEnfermedadDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedEnfermedades && <span>Seguro desea eliminar el enfermedad CI: <b>{selectedEnfermedades.deshidratacion}</b> ?</span>}
                </div>
            </Dialog>

        </div>

    );
}