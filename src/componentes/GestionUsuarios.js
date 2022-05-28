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






export default function GestionUsuarios() {

    

    const navigate = useNavigate();
    const toast = useRef(null);

    const [selectedUsuarios, setSelectedUsuarios] = useState(null);

    const [usuarioDialog, setUsuarioDialog] = useState(false);

    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => {
        UsuariosGet();
        initFilters1();
    }, [])


    const UsuarioGuardar = () => {
        setSubmitted(true);



        var data = {
            'id_usuario': null,
            'nombre': nombre,
            'apellido': apellido,
            'cedula': cedula,
            'mail': mail,
            'telefono': telefono,
            'contra': contra,
            'acceso': acceso,
        }

        let _usuarios = [...usuarios];
        let _usuario = { ...data };

        if (nombre === '') {
            console.log("errorrrr");
            console.log(data);
            console.log(nombre)
        } else {
            console.log("nose")
            console.log(nombre)
            fetch("http://localhost:8080/usuario/agregar/", {
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

                .then(result =>{
                    console.log(result);
                 })
                .catch(e => console.log(e))

                _usuarios.push(_usuario);
                setUsuarios(_usuarios);     
        setUsuarioDialog(false);

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
            'cedula': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
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
        fetch("http://localhost:8080/usuario/eliminar/" + selectedUsuarios.id_usuario)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Usuario Eliminado', life: 3000 })


            );
        let _usuarios = usuarios.filter(val => val.id_usuario !== selectedUsuarios.id_usuario);
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

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                 <Button type="button" icon="pi pi-file-pdf" label="PDF" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
                <Button type="button" icon="pi pi-file-excel" label="EXCEL" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="PDF" />
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


    const cols = [
        { field: 'cedula', header: 'Cedula' },
        { field: 'nombre', header: 'Nombre' },
        {field: 'apellido', header:'Apellido'},
        {field: 'mail', header:'Mail'},
        {field: 'telefono', header:'Telefono'},
        {field: 'acceso', header:'Acceso'},
        {field: 'contra', header:'Contra'}
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));



    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, usuarios);
                doc.save('Usuarios.pdf');
            })
        })
    }


    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(usuarios);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'Usuarios');
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + EXCEL_EXTENSION);
            }
        });
    }




    return (



        <div className="datatable-crud-demo">
            <ResponsiveAppBar />
            <br />
            <Toast ref={toast} />
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable value={usuarios} reflow="true" selection={selectedUsuarios} onSelectionChange={(e) => setSelectedUsuarios(e.value)} dataKey="id_usuario" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} usuarios" filters={filters1} globalFilterFields={['nombre', 'apellido', 'cedula', 'contra', 'acceso', 'mail', 'telefono']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="cedula" header="CEDULA" r></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="apellido" header="APELLIDO"></Column>
                    <Column field="mail" header="MAIL"></Column>
                    <Column field="telefono" header="TELEFONO"></Column>
                    <Column field="acceso" header="ACCESO"></Column>
                    <Column field="contra" header="CONTRA"></Column>
                    <Column body={actionBodyTemplate} exportable={false} ></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" left={regresarToolbar} ></Toolbar>
            </div>

            <Dialog visible={usuarioDialog} style={{ width: '450px' }} header="Datos Usuario" modal className="p-fluid" footer={usuarioDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" onChange={(e) => setNombre(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nombre })} />
                    {submitted && !nombre && <small className="p-error">Ingresar nombre</small>}
                </div>
                <div className="field">
                    <label htmlFor="apellido">Apellido</label>
                    <InputText id="apellido" onChange={(e) => setApellido(e.target.value)} required className={classNames({ 'p-invalid': submitted && !apellido })} />
                    {submitted && !apellido && <small className="p-error">Ingresar apellido</small>}
                </div>
                <div className="field">
                    <label htmlFor="cedula">Cedula</label>
                    <InputText id="cedula" onChange={(e) => setCedula(e.target.value)} required className={classNames({ 'p-invalid': submitted && !cedula })} />
                    {submitted && !cedula && <small className="p-error">Ingresar Cedula</small>}
                </div>
                <div className="field">
                    <label htmlFor="mail">Mail</label>
                    <InputText id="mail" onChange={(e) => setMail(e.target.value)} required className={classNames({ 'p-invalid': submitted && !mail })} />
                    {submitted && !mail && <small className="p-error">Ingresar Mail</small>}
                </div>
                <div className="field">
                    <label htmlFor="tel">Telefono</label>
                    <InputText id="tel" onChange={(e) => setTelefono(e.target.value)} required className={classNames({ 'p-invalid': submitted && !telefono })} />
                    {submitted && !telefono && <small className="p-error">Ingresar Telefono</small>}
                </div>
                <div className="field">
                    <label htmlFor="acceso">Acceso</label>
                    <InputText id="acceso" onChange={(e) => setAcceso(e.target.value)} required className={classNames({ 'p-invalid': submitted && !acceso })} />
                    {submitted && !acceso && <small className="p-error">Ingresar Acceso</small>}
                </div>
                <div className="field">
                    <label htmlFor="contra">Contraseña</label>
                    <InputText id="contra" onChange={(e) => setContra(e.target.value)} required className={classNames({ 'p-invalid': submitted && !contra })} />
                    {submitted && !contra && <small className="p-error">Ingresar Contraseña</small>}
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