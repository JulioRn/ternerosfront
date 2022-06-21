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

import './Principal.css';





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
            'observaciones': observaciones,
        }
        let _enfermedades = [...enfermedades];
        let _enfermedad = { ...data };

        if (nombre === '') {
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

            ).then(
                    toast.current.show({ severity: 'success', summary: 'Registro exitoso!', detail: 'Enfermedad registrada', life: 3000 })
                    )

                _enfermedades.push(_enfermedad);
                setEnfermedades(_enfermedades);     
        setEnfermedadDialog(false);

        }

    }

    const [nombre, setNombre] = useState('')
    const [observaciones, setObservaciones] = useState('')
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

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                 
                <Button type="button" onClick={exportPdf} className="p-button-rounded p-button-text" data-pr-tooltip="PDF"><img alt="alt" id="imgExport"  src='https://i.ibb.co/9ybqLVM/pdf.png'/></Button>
                <Button type="button"  onClick={exportExcel} className="p-button-rounded p-button-text" data-pr-tooltip="PDF"><img alt="alt" id="imgExport"  src='https://i.ibb.co/9hjyjYy/excel.png'/></Button>
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


    const cols = [
        { field: 'id_enfermedad', header: 'ID ENFERMEDAD' },
        { field: 'nombre', header: 'NOMBRE' },
        {field: 'observaciones', header:'OBSERAVCIONES'},
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));



    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, enfermedades);
                doc.save('Usuarios.pdf');
            })
        })
    }


    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(enfermedades);
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
               <DataTable  value={enfermedades} reflow="true" selection={selectedEnfermedades} onSelectionChange={(e) => setSelectedEnfermedades(e.value)} dataKey="id_enfermedad" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} enfermedades" filters={filters1} globalFilterFields={['fechaIn', 'temRec', 'deshidratacion', 'descOcular', 'tos', 'diarrea', 'descNasal']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="observaciones" header="OBSERVACION"></Column>
                   
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" left={regresarToolbar} ></Toolbar>
            </div>

            <Dialog visible={enfermedadDialog} style={{ width: '450px' }} header="Datos Enfermedad" modal className="p-fluid" footer={enfermedadDialogFooter} onHide={hideDialog}>


            <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <InputText id="nombre" onChange={(e) => setNombre(e.target.value)} required className={classNames({ 'p-invalid': submitted && !nombre })} />
                    {submitted && !nombre && <small className="p-error">Ingresar Nombre</small>}
                </div>

                <div className="field">
                    <label htmlFor="observaciones">Observacion</label>
                    <InputText id="observaciones" onChange={(e) => setObservaciones(e.target.value)} required className={classNames({ 'p-invalid': submitted && !observaciones })} />
                    {submitted && !observaciones && <small className="p-error">Ingresar Observacion</small>}
                </div>
                

            </Dialog>

            <Dialog visible={deleteEnfermedadDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteEnfermedadDialogFooter} onHide={hideDeleteEnfermedadDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedEnfermedades && <span>Seguro desea eliminar la enfermedad: <b>{selectedEnfermedades.nombre}</b> ?</span>}
                </div>
            </Dialog>

        </div>

    );
}