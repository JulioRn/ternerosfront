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
import { MultiSelect } from 'primereact/multiselect';
import { RadioButton } from 'primereact/radiobutton';






export default function GestionTerneros() {

    var moment = require('moment');

    const navigate = useNavigate();
    const toast = useRef(null);

   // const [checked, setChecked] = useState(false);

    const [selectedEnfermedad, setSelectedEnfermedad] = useState(null);

    const [selectedTerneros, setSelectedTerneros] = useState(null);

    const [terneroDialog, setTerneroDialog] = useState(false);
    const [partoDialog, setPartoDialog] = useState(false);

    const [partos, setPartos] = useState([]);
    const [terneros, setTerneros] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);

    useEffect(() => {
        TernerosGet();
        EnfermedadesGet();
        initFilters1();
    }, [])


    


    const TerneroGuardar = () => {
        setSubmitted(true);

        var data = {
            'id': null,
            'nroTernero': nroTernero,
            'fechaNac': fechaNacC,
            'peso': peso,
            'fechaDes': fechaDesC,
            'pesoDes': pesoDes,
            'altura': altura,
            'enfermedad': selectedEnfermedad[0],
        }
        var data2 = {
            'id': null,
            'nroTernero': nroTernero,
            'fechaNac': fechaNacC,
            'peso': peso,
            'fechaDes': fechaDesC,
            'pesoDes': pesoDes,
            'altura': altura,
            'enfermedad': selectedEnfermedad[0],
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
                            toast.current.show({ severity: 'success', summary: 'Registro exitoso!', detail: 'Ternero registrado', life: 3000 })
                        }
                    }

                )

            _terneros.push(_ternero);
            setTerneros(_terneros);
            setTerneroDialog(false);
            console.log(data);


        }

    }

    const PartoGuardar = () => {
        setSubmitted(true);

        var data = {
            'id_parto': null,
            'tipoPar': tipoPar,
            'sexo': sexo,
            'trazabilidad': trazabilidad,
            'retencionPla': retencionPla,
        
        }
        var data2 = {
            'id_parto': null,
            'tipoPar': tipoPar,
            'sexo': sexo,
            'trazabilidad': trazabilidad,
            'retencionPla': retencionPla,
        }
        let _partos = [...partos];
        let _parto = { ...data2 };

        if (tipoPar === '') {
            console.log("Error");
        } else {
            fetch("http://localhost:8080/parto/agregar", {
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
                            toast.current.show({ severity: 'success', summary: 'Registro exitoso!', detail: 'Ternero registrado', life: 3000 })
                        }
                    }

                )

            _partos.push(_parto);
            setPartos(_partos);
            setPartoDialog(false);
            setTerneroDialog(true);
            setParto(partos);
            console.log(data);


        }

    }

    //const [enfermedad, setEnfermedad] = useState('')
    const [nroTernero, setNroTernero] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    const [fechaDes, setFechaDes] = useState('')
    const [peso, setPeso] = useState('')
    const [parto, setParto] = useState('')
    const [pesoDes, setPesoDes] = useState('')
    const [altura, setAltura] = useState('')
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const [tipoPar, setTipoPar] = useState('')
    const [sexo, setSexo] = useState('')
    const [trazabilidad, setTrazabilidad] = useState('')
    const [retencionPla, setRetencionPla] = useState('')

    const fechaNacC = moment(fechaNac).format('DD/MM/yyyy');
    const fechaDesC = moment(fechaDes).format('DD/MM/yyyy');

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'nroTernero': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'fechaNac': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'tiempo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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

    const EnfermedadesGet = () => {
        fetch("http://localhost:8080/enfermedad/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setEnfermedades(result)
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
        setRegistrarPDialog(false);
        setTerneroDialog(true);
    }

    const openDialogParto = () => {
        setSubmitted(false);
        setRegistrarPDialog(true);
    }

    const openNewParto = () => {
        setSubmitted(false);
        setRegistrarPDialog(false);
        setPartoDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openDialogParto} />
                <Button label="Borrar" icon="pi pi-trash" className="p-button-danger" />

            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button type="button" onClick={exportPdf} className="p-button-rounded p-button-text" data-pr-tooltip="PDF"><img id="imgExport"  src='https://i.ibb.co/9ybqLVM/pdf.png'/></Button>
                <Button type="button"  onClick={exportExcel} className="p-button-rounded p-button-text" data-pr-tooltip="PDF"><img id="imgExport"  src='https://i.ibb.co/9hjyjYy/excel.png'/></Button>
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
        setPartoDialog(false);
        setRegistrarPDialog(false);
    }

    const terneroDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={TerneroGuardar} />
        </React.Fragment>
    );

    const partoDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={PartoGuardar} />
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
    const [registrarPDialog, setRegistrarPDialog] = useState(false);

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

    const registarPDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={openNew} />
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={openNewParto} />
        </React.Fragment>
    );


    const cols = [
        { field: 'cedula', header: 'Cedula' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'apellido', header: 'APELLIDO' },
        { field: 'mail', header: 'MAIL' },
        { field: 'telefono', header: 'TELEFONO' },
        { field: 'acceso', header: 'ACCESO' },
        { field: 'contra', header: 'CONTRA' }
    ];

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));



    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, terneros);
                doc.save('Usuarios.pdf');
            })
        })
    }


    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(terneros);
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
                <DataTable value={terneros} reflow="true" selection={selectedTerneros} onSelectionChange={(e) => setSelectedTerneros(e.value)} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} terneros" filters={filters1} globalFilterFields={['nroTernero', 'fechaNac', 'peso', 'fechaRef', 'tiempo', 'parto', 'cantCal']} header={header} >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }} exportable={false} ></Column>
                    <Column field="nroTernero" header="NRO TERNERO"></Column>
                    <Column field="fechaNac" header="FECHA NACIMIENTO"></Column>
                    <Column field="peso" header="PESO"></Column>
                    <Column field="parto.id_parto" header="PARTO"></Column>
                    <Column field="fechaDes" header="FECHA DESLECHE"></Column>
                    <Column field="enfermedad.nombre" header="ENFERMEDAD"></Column>

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
                    <Calendar id="fechaNac" dateFormat="dd/mm/yy" onChange={(e) => setFechaNac(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !fechaNac })}></Calendar>                    {submitted && !fechaNac && <small className="p-error">Ingresar fechaNac</small>}
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
                    <span className="p-tag">Desleche</span>
                </Divider>

                <div className="field">
                    <label htmlFor="fechaDes">Fecha Desleche</label>
                    <Calendar id="fechaDes" onChange={(e) => setFechaDes(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !fechaDes })}></Calendar>
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

                <div className="field">
                    <label htmlFor="altura">Enfermedad</label>
                    <MultiSelect value={selectedEnfermedad} options={enfermedades} onChange={(e) => setSelectedEnfermedad(e.value)} optionLabel="nombre" placeholder="Seleccionar Enfermedad" maxSelectedLabels={3} />

                </div>


            </Dialog>

            <Dialog visible={partoDialog} style={{ width: '450px' }} header="Datos Parto" modal className="p-fluid" footer={partoDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="id_parto">Nro Parto</label>
                    <InputText id="id_parto" onChange={(e) => setNroTernero(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nroTernero })} />
                    {submitted && !nroTernero && <small className="p-error">Ingresar Nro Ternero</small>}
                </div>

                <div className="field">
                    <label className="mb-3">Sexo</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1S" name="sexo" value="Macho" onChange={(e) => setSexo(e.value)} checked={sexo === 'Macho'} />
                            <label htmlFor="category1S">Macho</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2S" name="sexo" value="Hembra" onChange={(e) => setSexo(e.value)} checked={sexo === 'Hembra'} />
                            <label htmlFor="category2S">Hembra</label>
                        </div>
                    </div>
                </div>

                  <div className="field">
                    <label className="mb-3">Tipo Parto</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="tipoPar" value="Natural" onChange={(e) => setTipoPar(e.value)} checked={tipoPar === 'Natural'} />
                            <label htmlFor="category1">Natural</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="tipoPar" value="Asistido" onChange={(e) => setTipoPar(e.value)} checked={tipoPar === 'Asistido'} />
                            <label htmlFor="category2">Asistido</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="trazabilidad">Trazabilidad</label>
                    <InputText id="trazabilidad" onChange={(e) => setTrazabilidad(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !trazabilidad })} />
                    {submitted && !trazabilidad && <small className="p-error">Ingresar Trazabilidad</small>}
                </div>

                <div className="field">
                    <label htmlFor="retencionPla">Retención Placenta</label>
                    <InputText id="retencionPla" onChange={(e) => setRetencionPla(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !retencionPla })} />
                    {submitted && !retencionPla && <small className="p-error">Ingresar Retención</small>}
                </div>




            </Dialog>

            <Dialog visible={deleteTerneroDialog} style={{ width: '450px' }} header="Confirmar Acción" modal footer={deleteTerneroDialogFooter} onHide={hideDeleteTerneroDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedTerneros && <span>Seguro desea eliminar el ternero: <b>{selectedTerneros.nroTernero}</b> ?</span>}
                </div>
            </Dialog>

            <Dialog visible={registrarPDialog} style={{ width: '450px' }} header="Registrar Parto" modal footer={registarPDialogFooter} onHide={hideDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {<span>Es necesario registrar Parto para este nuevo Ternero</span>}
                </div>
            </Dialog>

        </div>

    );
}