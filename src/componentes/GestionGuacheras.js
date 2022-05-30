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
            'id_Guachera': null,
            'tipoGuachera': tipoGuachera,
            'desc': desc,
            'gastoAlimento': gastoAlimento,
            'gastoMedicamento': gastoMedicamento,
            'cantTerneros': cantTerneros,
        }
        let _guacheras = [...guacheras];
        let _guachera = { ...data };

        if (tipoGuachera === '') {
            console.log("errorrrr");
            console.log(data);
            console.log(tipoGuachera)
        } else {
            console.log("nose")
            console.log(tipoGuachera)
            fetch("http://localhost:8080/guachera/agregar", {
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

                _guacheras.push(_guachera);
                setGuacheras(_guacheras);     
        setGuacheraDialog(false);

        }

    }

    const [tipoGuachera, setTipoGuachera] = useState('')
    const [desc, setDesc] = useState('')
    const [gastoAlimento, setGastoAlimento] = useState('')
    const [gastoMedicamento, setGastoMedicamento] = useState('')
    const [cantTerneros, setCantTerneros] = useState('')
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'tipoGuachera': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'desc': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'acceso': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'contra': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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
        fetch("http://localhost:8080/guachera/eliminar/" + selectedGuacheras.id_Guachera)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Guachera Eliminado', life: 3000 })


            );
        let _guacheras = guacheras.filter(val => val.id_Guachera !== selectedGuacheras.id_Guachera);
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" />
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
                doc.autoTable(exportColumns, guacheras);
                doc.save('Usuarios.pdf');
            })
        })
    }


    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(guacheras);
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
                            <DataTable value={guacheras} responsiveLayout="scroll" selection={selectedGuacheras} onSelectionChange={(e) => setSelectedGuacheras(e.value)} dataKey="id_guachera" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} guacheras" filters={filters1} globalFilterFields={['tipoGuachera', 'desc', 'gastoAlimento', 'contra', 'acceso', 'gastoMedicamento', 'cantTerneros']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="tipoGuachera" header="TIPO DE GUACHERA"></Column>
                    <Column field="desc" header="DESCRIPCION"></Column>
                    <Column field="gastoMedicamento" header="GASTOS MEDICAMENTO"></Column>
                    <Column field="cantTerneros" header="CANTIDAD TERNEROS"></Column>
                    <Column field="gastoAlimento" header="GASTOS ALIMENTOS" r></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" left={regresarToolbar} ></Toolbar>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Datos Guachera" modal className="p-fluid" footer={guacheraDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="tipoGuachera">Tipo de Guachera</label>
                    <InputText id="tipoGuachera" onChange={(e) => setTipoGuachera(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !tipoGuachera })} />
                    {submitted && !tipoGuachera && <small className="p-error">Ingresar Tipo de Guachera</small>}
                </div>
                <div className="field">
                    <label htmlFor="desc">Descripción</label>
                    <InputText id="desc" onChange={(e) => setDesc(e.target.value)} required className={classNames({ 'p-invalid': submitted && !desc })} />
                    {submitted && !desc && <small className="p-error">Ingresar Descripción</small>}
                </div>
                <div className="field">
                    <label htmlFor="gastoAlimento">Gastos de Alimentos</label>
                    <InputText id="gastoAlimento" onChange={(e) => setGastoAlimento(e.target.value)} required className={classNames({ 'p-invalid': submitted && !gastoAlimento })} />
                    {submitted && !gastoAlimento && <small className="p-error">Ingresar Gastos de Alimentos</small>}
                </div>
                <div className="field">
                    <label htmlFor="gastoMedicamento">Gastos de Medicamentos</label>
                    <InputText id="gastoMedicamento" onChange={(e) => setGastoMedicamento(e.target.value)} required className={classNames({ 'p-invalid': submitted && !gastoMedicamento })} />
                    {submitted && !gastoMedicamento && <small className="p-error">Ingresar Gastos de Medicamentos</small>}
                </div>
                <div className="field">
                    <label htmlFor="cantTerneros">Cantidad de Terneros</label>
                    <InputText id="cantTerneros" onChange={(e) => setCantTerneros(e.target.value)} required className={classNames({ 'p-invalid': submitted && !cantTerneros })} />
                    {submitted && !cantTerneros && <small className="p-error">Ingresar Cantidad de Terneros</small>}
                </div>

            </Dialog>

            <Dialog visible={deleteGuacheraDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteGuacheraDialogFooter} onHide={hideDeleteGuacheraDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedGuacheras && <span>Seguro desea eliminar la guachera: <b>{selectedGuacheras.id_Guachera}</b> ?</span>}
                </div>
            </Dialog>

        </div>

    );
}