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






export default function GestionAlimentos() {

    

    const navigate = useNavigate();
    const toast = useRef(null);

    const [selectedAlimentos, setSelectedAlimentos] = useState(null);

    const [alimentoDialog, setAlimentoDialog] = useState(false);

    const [alimentos, setAlimentos] = useState([]);
    useEffect(() => {
        AlimentosGet();
        initFilters1();
    }, [])


    const AlimentoGuardar = () => {
        setSubmitted(true);

        var data = {
            'id': null,
            'nombre': nombre,
            'stock': stock,
            'comentario': comentario
        }
        let _alimentos = [...alimentos];
        let _alimento = { ...data };

        if (nombre === '') {
        } else {
            fetch("http://localhost:8080/alimento/agregar", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }

            ).then(
                    toast.current.show({ severity: 'success', summary: 'Registro exitoso!', detail: 'Alimento registrado', life: 3000 })
                    )

                _alimentos.push(_alimento);
                setAlimentos(_alimentos);     
        setAlimentoDialog(false);

        }

    }

    const [nombre, setNombre] = useState('')
    const [stock, setStock] = useState('')
    const [comentario, setComentario] = useState('')
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'nombre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'stock': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'comentario': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
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

    const AlimentosGet = () => {
        fetch("http://localhost:8080/alimento/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setAlimentos(result)
                }
            )
    }

    const AlimentoDelete = () => {
        fetch("http://localhost:8080/alimento/eliminar/" + selectedAlimentos.id_alimento)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Alimento Eliminado', life: 3000 })


            );
        let _alimentos = alimentos.filter(val => val.id_alimento !== selectedAlimentos.id_alimento);
        setAlimentos(_alimentos);
        setDeleteAlimentoDialog(false);
    }



    const openNew = () => {
        setSubmitted(false);
        setAlimentoDialog(true);
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
            <h5 className="mx-0 my-1">Gestionar Alimentos</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar..." />
            </span>
        </div>
    );

    const hideDialog = () => {
        setSubmitted(false);
        setAlimentoDialog(false);
    }

    const alimentoDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={AlimentoGuardar} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteAlimento(rowData)} />
            </React.Fragment>
        );
    }

    const [deleteAlimentoDialog, setDeleteAlimentoDialog] = useState(false);

    const hideDeleteAlimentoDialog = () => {
        setDeleteAlimentoDialog(false);
    }

    const confirmDeleteAlimento = () => {
        setDeleteAlimentoDialog(true);
    }

    const deleteAlimentoDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAlimentoDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={AlimentoDelete} />
        </React.Fragment>
    );


    const cols = [
        { field: 'cedula', header: 'Cedula' },
        { field: 'nombre', header: 'Nombre' },
        {field: 'apellido', header:'APELLIDO'},
        {field: 'mail', header:'MAIL'},
        {field: 'telefono', header:'TELEFONO'},
        {field: 'acceso', header:'ACCESO'},
        {field: 'contra', header:'CONTRA'}
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));



    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, alimentos);
                doc.save('Usuarios.pdf');
            })
        })
    }


    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(alimentos);
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
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>                <DataTable value={alimentos} responsiveLayout="scroll" selection={selectedAlimentos} onSelectionChange={(e) => setSelectedAlimentos(e.value)} dataKey="id_alimento" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} alimentos" filters={filters1} globalFilterFields={['nombre', 'stock', 'comentario', 'contra', 'acceso', 'mail', 'telefono']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    
                    <Column field="nombre" header="NOMBRE"></Column>
                    <Column field="stock" header="STOCK"></Column>
                    <Column field="comentario" header="COMENTARIO"></Column>

                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" left={regresarToolbar} ></Toolbar>
            </div>

            <Dialog visible={alimentoDialog} style={{ width: '450px' }} header="Datos Alimento" modal className="p-fluid" footer={alimentoDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" onChange={(e) => setNombre(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nombre })} />
                    {submitted && !nombre && <small className="p-error">Ingresar nombre</small>}
                </div>
                <div className="field">
                    <label htmlFor="stock">Stock</label>
                    <InputText id="stock" onChange={(e) => setStock(e.target.value)} required className={classNames({ 'p-invalid': submitted && !stock })} />
                    {submitted && !stock && <small className="p-error">Ingresar stock</small>}
                </div>
                <div className="field">
                    <label htmlFor="comentario">Comentario</label>
                    <InputText id="comentario" onChange={(e) => setComentario(e.target.value)} required className={classNames({ 'p-invalid': submitted && !comentario })} />
                    {submitted && !comentario && <small className="p-error">Ingresar Comentario</small>}
                </div>
                

            </Dialog>

            <Dialog visible={deleteAlimentoDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteAlimentoDialogFooter} onHide={hideDeleteAlimentoDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedAlimentos && <span>Seguro desea eliminar el alimento: <b>{selectedAlimentos.nombre}</b> ?</span>}
                </div>
            </Dialog>

        </div>

    );
}