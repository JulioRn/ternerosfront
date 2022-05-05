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





export default function GestionUsuarios() {

    const navigate = useNavigate();
    const toast = useRef(null);

    const [selectedUsuarios, setSelectedUsuarios] = useState(null);

    const [productDialog, setUsuarioDialog] = useState(false);

    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
        UsuariosGet();
        initFilters1();
    }, [])


    const UsuarioGuardar = () => {
        setSubmitted(true);

        

        var data = {
            'id': null,
            'nombre': nombre,
            'apellido': apellido,
            'cedula': cedula,
            'mail': mail,
            'telefono': telefono,
            'contra': contra,
            'acceso': acceso,
        }
        let _usuarios = [...usuarios];
        let _usuario = {...data};

        if( nombre != null){
        fetch("http://localhost:8080/usuario/agregar", {
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
                        window.location.href = '/';
                        _usuarios.push(_usuario);
            setUsuarios(_usuarios);
        setUsuarioDialog(false);
                    }
                }

            )

        }
                
                

        

    }

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [cedula, setCedula] = useState('')
    const [mail, setMail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [acceso, setAcceso] = useState('')
    const [contra, setContra] = useState('')
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'nombre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'apellido': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'acceso': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'contra': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'mail': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'telefono': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'cedula':{ operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
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

    const UsuariosGet = () => {
        fetch("http://localhost:8080/usuario/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setUsuarios(result)
                }
            )
    }

    const UsuarioDelete = () => {
        fetch("http://localhost:8080/usuario/eliminar/" + selectedUsuarios.id)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Usuario Eliminado', life: 3000 })


            );
        let _usuarios = usuarios.filter(val => val.id !== selectedUsuarios.id);
        setUsuarios(_usuarios);
        setDeleteUsuarioDialog(false);
    }



    const openNew = () => {
        setSubmitted(false);
        setUsuarioDialog(true);
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
            <h5 className="mx-0 my-1">Gestionar Usuarios</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar..." />
            </span>
        </div>
    );

    const hideDialog = () => {
        setSubmitted(false);
        setUsuarioDialog(false);
    }

    const usuarioDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={UsuarioGuardar} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteUsuario(rowData)} />
            </React.Fragment>
        );
    }

    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);

    const hideDeleteUsuarioDialog = () => {
        setDeleteUsuarioDialog(false);
    }

    const confirmDeleteUsuario = () => {
        setDeleteUsuarioDialog(true);
    }

    const deleteUsuarioDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsuarioDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={UsuarioDelete} />
        </React.Fragment>
    );


    return (



        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="p-toolbar p-component mb-4" left={leftToolbarTemplate} ></Toolbar>
                <DataTable value={usuarios} responsiveLayout="scroll" selection={selectedUsuarios} onSelectionChange={(e) => setSelectedUsuarios(e.value)} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} usuarios" filters={filters1} globalFilterFields={['nombre', 'apellido', 'cedula', 'contra', 'acceso', 'mail', 'telefono']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="cedula" header="CEDULA" r></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="apellido" header="APELLIDO"></Column>
                    <Column field="mail" header="MAIL"></Column>
                    <Column field="telefono" header="TELEFONO"></Column>
                    <Column field="acceso" header="ACCESO"></Column>
                    <Column field="contra" header="CONTRA"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" left={regresarToolbar} ></Toolbar>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Datos Usuario" modal className="p-fluid" footer={usuarioDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" onChange={(e) => setNombre(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nombre })}/>
                    {submitted && !nombre && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="apellido">Apellido</label>
                    <InputText id="apellido" onChange={(e) => setApellido(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="cedula">Cedula</label>
                    <InputText id="cedula" onChange={(e) => setCedula(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="mail">Mail</label>
                    <InputText id="mail" onChange={(e) => setMail(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="tel">Telefono</label>
                    <InputText id="tel" onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="acceso">Acceso</label>
                    <InputText id="acceso" onChange={(e) => setAcceso(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="contra">Contraseña</label>
                    <InputText id="contra" onChange={(e) => setContra(e.target.value)}/>
                </div>

            </Dialog>

            <Dialog visible={deleteUsuarioDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteUsuarioDialogFooter} onHide={hideDeleteUsuarioDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedUsuarios && <span>Seguro desea eliminar el usuario CI: <b>{selectedUsuarios.cedula}</b> ?</span>}
                </div>
            </Dialog>

        </div>

    );
}