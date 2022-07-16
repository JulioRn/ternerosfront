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

import { Dropdown } from 'primereact/dropdown';






export default function GestionGuacheras() {



    const navigate = useNavigate();
    const toast = useRef(null);

    const [selectedGuacheras, setSelectedGuacheras] = useState(null);

    const [productDialog, setGuacheraDialog] = useState(false);

    const [guacheras, setGuacheras] = useState([]);
    useEffect(() => {
        GuacherasGet();
        initFilters1();
    }, [])


    const GuacheraGuardar = () => {
        setSubmitted(true);



        var data = {
            'id_guachera': idGuachera,
            'nroGuachera': nroGuachera,
            'tipoGuachera': tipoGuachera,
            'descripcion': descripcion,
        }
        let _guacheras = [...guacheras];
        let _guachera = { ...data };

        if (nroGuachera === '') {
            console.log("Se debe ingresar numero de guachera");
        } else {
            fetch("http://localhost:8080/guachera/agregar", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }

            ).then(result => {
                GuacherasGet();
                toast.current.show({ severity: 'success', summary: 'Registro exitoso!', detail: 'Guachera registrada', life: 3000 })
        })
        console.log(data)
            setGuacheraDialog(false);
            limpiarGuachera();
        }

    }

    const [idGuachera, setIdGuachera] = useState('')
    const [nroGuachera, setNroGuachera] = useState('')
    const [tipoGuachera, setTipoGuachera] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [selectGuachera, setSelectGuachera] = useState("Seleccionar Tipo")


    const tipos = [
        { label: 'Individual', value: 'Individual' },
        { label: 'Colectiva', value: 'Colectiva' },
    ];


    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'tipoGuachera': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'descripcion': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'gastoMedicamento': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'cantTerneros': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'gastoAlimento': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
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

    const GuacherasGet = () => {
        fetch("http://localhost:8080/guachera/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setGuacheras(result)
                }
            )
    }

    const GuacheraDelete = () => {
        fetch("http://localhost:8080/guachera/eliminar/" + selectedGuacheras.id_guachera)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Guachera Eliminado', life: 3000 })


            );
        let _guacheras = guacheras.filter(val => val.id_guachera !== selectedGuacheras.id_guachera);
        setGuacheras(_guacheras);
        setDeleteGuacheraDialog(false);
    }



    const openNew = () => {
        setSubmitted(false);
        setGuacheraDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />


            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Listar Terneros" icon="pi pi-list" className="p-button-secondary" onClick={() => navigate('/TernerosG')} />
            </React.Fragment>
        )
    }



    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Gestionar Guacheras</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar..." />
            </span>
        </div>
    );

    const hideDialog = () => {
        setSubmitted(false);
        setGuacheraDialog(false);
        limpiarGuachera();
    }

    const guacheraDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={GuacheraGuardar} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => editGuachera()} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteGuachera(rowData)} />
            </React.Fragment>
        );
    }

    const [deleteGuacheraDialog, setDeleteGuacheraDialog] = useState(false);

    const hideDeleteGuacheraDialog = () => {
        setDeleteGuacheraDialog(false);
    }

    const confirmDeleteGuachera = () => {
        setDeleteGuacheraDialog(true);
    }

    const deleteGuacheraDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteGuacheraDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={GuacheraDelete} />
        </React.Fragment>
    );


    const editGuachera = () => {
        if (selectedGuacheras !== null) {
            setGuacheraDialog(true);

            setIdGuachera(selectedGuacheras.id_guachera)
            setNroGuachera(selectedGuacheras.nroGuachera)
            setTipoGuachera(selectedGuacheras.tipoGuachera)
            setDescripcion(selectedGuacheras.descripcion)

            if(selectedGuacheras.tipoGuachera !== null){
                setSelectGuachera(selectedGuacheras.tipoGuachera)
            }


        }

    }
    const limpiarGuachera = () => {

        setIdGuachera('')
            setNroGuachera('')
            setTipoGuachera('')
            setDescripcion('')
            setSelectGuachera("Seleccionar Tipo")
    }


    return (



        <div className="datatable-crud-demo">
            <ResponsiveAppBar />
            <br />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable value={guacheras} responsiveLayout="scroll" selection={selectedGuacheras} onSelectionChange={(e) => setSelectedGuacheras(e.value)} dataKey="id_guachera" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} guacheras" filters={filters1} globalFilterFields={['tipoGuachera', 'descripcion', 'gastoAlimento', 'contra', 'acceso', 'gastoMedicamento', 'cantTerneros']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="nroGuachera" header="NRO DE GUACHERA"></Column>
                    <Column field="tipoGuachera" header="TIPO DE GUACHERA"></Column>
                    <Column field="descripcion" header="DESCRIPCION"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" ></Toolbar>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Datos Guachera" modal className="p-fluid" footer={guacheraDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="nroGuachera">Nro Guachera</label>
                    <InputText value={nroGuachera} id="nroGuachera" onChange={(e) => setNroGuachera(e.target.value)} required className={classNames({ 'p-invalid': submitted && !nroGuachera })} />
                    {submitted && !nroGuachera && <small className="p-error">Ingresar Nro Guachera</small>}
                </div>

                <div className="field">
                    <label htmlFor="tipoGuachera">Tipo de Guachera</label>
                    <Dropdown value={tipoGuachera} options={tipos} onChange={(e) => setTipoGuachera(e.value)} placeholder={selectGuachera} />                    {submitted && !tipoGuachera && <small className="p-error">Ingresar Tipo de Guachera</small>}
                </div>

                <div className="field">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText value={descripcion} id="descripcion" onChange={(e) => setDescripcion(e.target.value)} required className={classNames({ 'p-invalid': submitted && !descripcion })} />
                    {submitted && !descripcion && <small className="p-error">Ingresar Descripción</small>}
                </div>


            </Dialog>

            <Dialog visible={deleteGuacheraDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteGuacheraDialogFooter} onHide={hideDeleteGuacheraDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedGuacheras && <span>Seguro desea eliminar la guachera: <b>{selectedGuacheras.id_guachera}</b> ?</span>}
                </div>
            </Dialog>

        </div>

    );
}