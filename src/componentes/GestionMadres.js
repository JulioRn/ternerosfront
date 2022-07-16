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






export default function GestionMadres() {



    const navigate = useNavigate();
    const toast = useRef(null);

    const [selectedMadres, setSelectedMadres] = useState(null);

    const [madreDialog, setMadreDialog] = useState(false);

    const [madres, setMadres] = useState([]);
    useEffect(() => {
        MadresGet();
        initFilters1();
    }, [])


    const MadreGuardar = () => {
        setSubmitted(true);

        var data = {
            'idMadre': idMadre,
            'nroMadre': nroMadre,
            'trazabilidad': trazabilidad,
        }


        if (nroMadre === '') {
            console.log("No se ingreso NroMadre");
        }
        if (trazabilidad === '') {
            console.log("No se ingreso Trazabilidad");
        } else {
            fetch("http://localhost:8080/madre/agregar", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }

            ).then(result => {
                MadresGet();
                toast.current.show({ severity: 'success', summary: 'Registro exitoso!', detail: 'Madre registrada', life: 3000 })
            })
            setMadreDialog(false);
            limpiarMadre();
        }

    }

    const [nroMadre, setNroMadre] = useState('')
    const [trazabilidad, setTrazabilidad] = useState('')
    const [idMadre, setIdMadre] = useState('')
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);



    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'nroMadre': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'trazabilidad': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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

    const MadresGet = () => {
        fetch("http://localhost:8080/madre/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setMadres(result)
                }
            )
    }

    const MadreDelete = () => {
        fetch("http://localhost:8080/madre/eliminar/" + selectedMadres.idMadre)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Madre Eliminado', life: 3000 })


            );
        let _madres = madres.filter(val => val.idMadre !== selectedMadres.idMadre);
        setMadres(_madres);
        setDeleteMadreDialog(false);
    }



    const openNew = () => {
        setSubmitted(false);
        setMadreDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Listar Terneros" icon="pi pi-list" className="p-button-secondary" onClick={() => navigate('/Terneros')} />

            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>

                <Button type="button" onClick={exportPdf} className="p-button-rounded p-button-text" data-pr-tooltip="PDF"><img alt="alt" id="imgExport" src='https://i.ibb.co/9ybqLVM/pdf.png' /></Button>
                <Button type="button" onClick={exportExcel} className="p-button-rounded p-button-text" data-pr-tooltip="PDF"><img alt="alt" id="imgExport" src='https://i.ibb.co/9hjyjYy/excel.png' /></Button>
            </React.Fragment>
        )
    }



    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Gestionar Madres</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Buscar..." />
            </span>
        </div>
    );

    const hideDialog = () => {
        limpiarMadre();
        setSubmitted(false);
        setMadreDialog(false);
    }

    const madreDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={MadreGuardar} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => editMadre()} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" selection={selectedMadres} onSelectionChange={(e) => setSelectedMadres(e.value)} onClick={() => confirmDeleteMadre(rowData)} />
            </React.Fragment>
        );
    }

    const [deleteMadreDialog, setDeleteMadreDialog] = useState(false);

    const hideDeleteMadreDialog = () => {
        setDeleteMadreDialog(false);
    }

    const confirmDeleteMadre = () => {
        setDeleteMadreDialog(true);
    }

    const deleteMadreDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteMadreDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={MadreDelete} />
        </React.Fragment>
    );


    const cols = [
        { field: 'idMadre', header: 'ID MADRE' },
        { field: 'nroMadre', header: 'NUMERO MADRE' },
        { field: 'trazabilidad', header: 'TRAZABILIDAD' },
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));



    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, madres);
                doc.save('Madres.pdf');
            })
        })
    }


    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(madres);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'Madres');
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


    const editMadre = () => {
        if (selectedMadres !== null) {
            setMadreDialog(true);
            setIdMadre(selectedMadres.idMadre);
            setNroMadre(selectedMadres.nroMadre);
            setTrazabilidad(selectedMadres.trazabilidad);


        }


    }

    const limpiarMadre = () => {

        setIdMadre(null);
        setNroMadre('');
        setTrazabilidad('');

    }


    return (



        <div className="datatable-crud-demo">
            <ResponsiveAppBar />
            <br />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable value={madres} responsiveLayout="scroll" selection={selectedMadres} onSelectionChange={(e) => setSelectedMadres(e.value)} dataKey="idMadre" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} madres" filters={filters1} globalFilterFields={['tipoMadre', 'trazabilidad', 'gastoAlimento', 'contra', 'acceso', 'gastoMedicamento', 'cantTerneros']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="nroMadre" header="NUMERO DE MADRE"></Column>
                    <Column field="trazabilidad" header="TRAZABILIDAD"></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" ></Toolbar>
            </div>

            <Dialog visible={madreDialog} style={{ width: '450px' }} header="Datos Madre" modal className="p-fluid" footer={madreDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="nroMadre">Numero Madre</label>
                    <InputText value={nroMadre} keyfilter="num" id="nroMadre" onChange={(e) => setNroMadre(e.target.value)} required className={classNames({ 'p-invalid': submitted && !nroMadre })} />
                    {submitted && !nroMadre && <small className="p-error">Ingresar Nro Madre</small>}
                </div>

                <div className="field">
                    <label htmlFor="trazabilidad">Trazabilidad</label>
                    <InputText value={trazabilidad} keyfilter="num" id="trazabilidad" onChange={(e) => setTrazabilidad(e.target.value)} required className={classNames({ 'p-invalid': submitted && !trazabilidad })} />
                    {submitted && !trazabilidad && <small className="p-error">Ingresar Trazabilidad</small>}
                </div>

            </Dialog>

            <Dialog visible={deleteMadreDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteMadreDialogFooter} onHide={hideDeleteMadreDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedMadres && <span>Seguro desea eliminar la madre: <b>{selectedMadres.idMadre}</b> ?</span>}
                </div>
            </Dialog>

        </div>

    );
}