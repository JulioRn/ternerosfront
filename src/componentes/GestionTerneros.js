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
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';






export default function GestionTerneros() {

    var moment = require('moment');

    const navigate = useNavigate();
    const toast = useRef(null);

    const [selectedEnfermedad, setSelectedEnfermedad] = useState('');

    const [selectedTerneros, setSelectedTerneros] = useState(null);

    const [terneroDialog, setTerneroDialog] = useState(false);
    const [partoDialog, setPartoDialog] = useState(false);
    const [muerteDialog, setMuerteDialog] = useState(false);
    const [refraDialog, setRefraDialog] = useState(false);

    const [muertes, setMuertes] = useState([]);
    const [partos, setPartos] = useState([]);
    const [terneros, setTerneros] = useState([]);
    const [enfermedades, setEnfermedades] = useState([]);
    const [refractrometrias, setRefractrometrias] = useState([]);
    const [disa, setDisa] = useState(false);

    const [madres, setMadres] = useState([]);
    const [selectMadre, setSelectMadre] = useState([]);
    const [madreDialog, setMadreDialog] = useState(false);

    const [guacheras, setGuacheras] = useState([]);
    const [selectGuachera, setSelectGuachera] = useState([]);



    useEffect(() => {
        TernerosGet();
        EnfermedadesGet();
        MuertesGet();
        MadresGet();
        GuacherasGet();
        RefractrometriasGet();
        initFilters1();
    }, [])






    const ConfirmarMuerte = () => {
        setSubmitted(true);


        var data = {
            'id': selectedTerneros.id,
            'nroTernero': selectedTerneros.nroTernero,
            'fechaNac': selectedTerneros.fechaNac,
            'peso': selectedTerneros.peso,
            'fechaDes': selectedTerneros.fechaDes,
            'pesoDes': selectedTerneros.pesoDes,
            'altura': selectedTerneros.altura,
            'parto': selectedTerneros.parto,
            'enfermedad': selectedTerneros.enfermedad,
            'salud': 'https://i.ibb.co/sC2PpWJ/3.png',
            'muerte': muertes[muertes.length - 1],
        }

        let _terneros = [...terneros];
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

            ).then(
                toast.current.show({ severity: 'success', summary: 'Baja Realizada!', detail: 'El ternero ha muerto!', life: 3000 })
            )
        setTerneros(_terneros);
        setBajaTerneroDialog(false);
        console.log(data);



    }

    const TerneroGuardar = () => {

        setSubmitted(true);

        var salud2;
        var fechaN;
        var fechaD;

        const fechaNacC = moment(fechaNac).format('DD/MM/yyyy');
        const fechaDesC = moment(fechaDes).format('DD/MM/yyyy');
        

        if (selectedEnfermedad[0] !== null) {
            salud2 = 'https://i.ibb.co/2t2dPKp/2.png'
        }

        if (selectedEnfermedad.length === 0) {
            salud2 = 'https://i.ibb.co/NC0Km72/1.png'
        }

        if (fechaNac === '') {
            fechaN = null
        }
        if (fechaDes === '') {
            fechaD = null
        }
        if (fechaNac !== '') {
            fechaN = fechaNacC
        }
        if (fechaDes !== '') {
            fechaD = fechaDesC
        }

        


        var data = {
            'id': idTernero,
            'nroTernero': nroTernero,
            'fechaNac': fechaN,
            'peso': peso,
            'fechaDes': fechaD,
            'pesoDes': pesoDes,
            'altura': altura,
            'enfermedad': selectedEnfermedad[0],
            'salud': salud2,
            'parto': parto,
            'trazabilidad': trazabilidad,
            'sexo': sexo,
            'madre': madre,
            'guachera': guachera,
        }
        var data2 = {
            'id': idTernero,
            'nroTernero': nroTernero,
            'fechaNac': fechaN,
            'peso': peso,
            'fechaDes': fechaD,
            'pesoDes': pesoDes,
            'altura': altura,
            'enfermedad': selectedEnfermedad[0],
            'salud': salud2,
            'parto': parto,
            'trazabilidad': trazabilidad,
            'sexo': sexo,
            'madre': selectMadre[0],
            'guachera': selectGuachera[0],
        }
        let _terneros = [...terneros];
        let _ternero = { ...data2 };

        if (nroTernero === '') {
            console.log("No se ingreso NroTernero");
        } if (fechaN === '') {
            console.log("No se ingreso fecha nacimiento");
        } if (peso === '') {
            console.log("No se ingreso peso");
        } if (altura === '') {
            console.log("No se ingreso altura");
        } else {
            fetch("http://localhost:8080/ternero/agregar", {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            }

            ).then(result => {
                console.log(result);

                toast.current.show({ severity: 'success', summary: 'Acción exitosa!', detail: 'Datos del Ternero registrados', life: 3000 })
            })

            _terneros.push(_ternero);
            setTerneros(_terneros);
            setTerneroDialog(false);
            console.log(data);
            console.log(partos)

        }

    }

    const PartoGuardar = () => {
        setSubmitted(true);

        var data = {
            'id_parto': null,
            'tipoPar': tipoPar,
            'retencionPla': retencionPla,

        }
        var data2 = {
            'id_parto': null,
            'tipoPar': tipoPar,
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
            console.log(data);
            setTerneroDialog(true);
            console.log(partos);
            PartosGet();
        } fetch("http://localhost:8080/parto/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setPartos(result)
                }
            )


    }

    const MuerteRegistrar = () => {
        setSubmitted(true);

        var data = {
            'id_muerte': null,
            'causa': causa,
            'dias': dias,
            'fecha': fechaMuerteC,
            'comentario': comentario,

        }
        let _muertes = [...muertes];

        if (causa === '') {
            console.log("Error");
        } else {
            fetch("http://localhost:8080/muerte/agregar", {
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

            setMuertes(_muertes);
            setMuerteDialog(false);
            console.log(data);
            setBajaTerneroDialog(true);
            MuertesGet();
        }

        MuertesGet();

    }

    const MadreGuardar = () => {
        setSubmitted(true);



        var data = {
            'idMadre': null,
            'nroMadre': nroMadre,
            'trazabilidad': trazabilidadM,
        }
        let _madres = [...madres];
        let _madre = { ...data };

        if (nroMadre === '') {
            console.log("No se ingreso NroMadre");
        }
        if (trazabilidadM === '') {
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

            ).then(
                toast.current.show({ severity: 'success', summary: 'Registro exitoso!', detail: 'Madre registrada', life: 3000 })
            )

            _madres.push(_madre);
            setMadres(_madres);
            setMadreDialog(false);

        }

    }

    const [nroMadre, setNroMadre] = useState('')
    const [trazabilidadM, setTrazabilidadM] = useState('')

    const RefraRegistrar = () => {
        setSubmitted(true);

        var data = {
            'id_refractrometria': null,
            'fecha': fechaRefraC,
            'nota': nota,
            'evento': evento,
            'ternero': selectedTerneros,

        }
        var data2 = {
            'id_refractrometria': null,
            'fecha': fechaRefraC,
            'nota': nota,
            'evento': evento,
            'ternero': selectedTerneros,
        }
        let _refractrometrias = [...refractrometrias];
        let _refractrometria = { ...data2 };

        if (nota === '') {
            console.log("Error");
        } else {
            fetch("http://localhost:8080/refractrometria/agregar", {
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
                            toast.current.show({ severity: 'success', summary: 'Registro exitoso!', detail: 'Refra registrado', life: 3000 })
                        }
                    }

                )


            _refractrometrias.push(_refractrometria);
            setRefractrometrias(_refractrometrias);
            setRefraDialog(false);
            console.log(data);
        }

    }

    //DATOS TERNEROS
    const [descEnfe, setDescEnfe] = useState('')
    const [sexo, setSexo] = useState('')
    const [idTernero, setIdTernero] = useState(null)
    const [nroTernero, setNroTernero] = useState('')
    const [fechaNac, setFechaNac] = useState('')
    const [fechaDes, setFechaDes] = useState('')
    const [peso, setPeso] = useState('')
    const [parto, setParto] = useState(null)
    const [pesoDes, setPesoDes] = useState('')
    const [altura, setAltura] = useState('')
    const [trazabilidad, setTrazabilidad] = useState('')
    const [madre, setMadre] = useState(null)


    //DATOS FILTROS
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [submitted, setSubmitted] = useState(false);


    //DATOS PARTO
    const [tipoPar, setTipoPar] = useState('')
    const [retencionPla, setRetencionPla] = useState('')


    //DATOS MUERTE
    const [fechaMuerte, setFechaMuerte] = useState('')
    const [causa, setCausa] = useState('')
    const [dias, setDias] = useState('')
    const [comentario, setComentario] = useState('')

    //DATOS REFRACTROMETRIA
    const [fechaRefra, setFechaRefra] = useState('')
    const [nota, setNota] = useState('')
    const [evento, setEvento] = useState('')

    //DATOS GUACHERA
    const[guachera, setGuachera] = useState('')

    const fechaMuerteC = moment(fechaMuerte).format('DD/MM/yyyy');
    const fechaRefraC = moment(fechaRefra).format('DD/MM/yyyy');


    const tipos = [
        { label: 'Refractrometro', value: 'Refractrometro' },
        { label: 'Calostrometro', value: 'Calostrometro' },
    ];

    const tiposCausas = [
        { label: 'Diarrea', value: 'Diarrea' },
        { label: 'Neumonía ', value: 'Neumonía' },
        { label: 'Onfalitis (ombligo)', value: 'Onfalitis (ombligo)' },
        { label: 'Septicemia ', value: 'Septicemia ' },
        { label: 'Traumática ', value: 'Traumática ' },
        { label: 'Iatrogénica', value: 'Iatrogénica' },
        { label: 'Problemas congénitos', value: 'Problemas congénitos' },
        { label: 'Meteorismo', value: 'Meteorismo' },
        { label: 'Otras', value: 'Otras' },
    ];

    const sexoHM = [
        { label: 'MACHO', value: 'MACHO' },
        { label: 'HEMBRA', value: 'HEMBRA' },
    ];

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

    const GuacherasGet = () => {
        fetch("http://localhost:8080/guachera/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setGuacheras(result)
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

    const PartosGet = () => {
        fetch("http://localhost:8080/parto/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setPartos(result)
                }
            )
    }

    const RefractrometriasGet = () => {
        fetch("http://localhost:8080/refractrometria/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setRefractrometrias(result)
                }
            )
    }

    const MuertesGet = () => {
        fetch("http://localhost:8080/muerte/getAll")
            .then(res => res.json())
            .then(
                (result) => {
                    setMuertes(result)
                }
            )
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


    const TerneroDelete = () => {
        fetch("http://localhost:8080/ternero/eliminar/" + selectedTerneros.id)
            .then(
                toast.current.show({ severity: 'success', summary: 'Accion exitosa!', detail: 'Ternero Eliminado', life: 3000 })


            );
        let _terneros = terneros.filter(val => val.id !== selectedTerneros.id);
        setTerneros(_terneros);
        setDeleteTerneroDialog(false);
    }



    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.salud}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" style={{ width: '70px' }} />
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

    const [labelTe, setLabelTe] = useState('')
    const [labelFTe, setFLabelTe] = useState('')

    const openNewMuerte = () => {

        if (selectedTerneros !== null && selectedTerneros.muerte !== null) {
            toast.current.show({ severity: 'error', summary: 'Accion denegada!', detail: 'El ternero ya ha muerto', life: 3000 })
        } else {
            setSubmitted(false);
            setMuerteDialog(true);
            setLabelTe(selectedTerneros.nroTernero)
        }
        console.log(selectedTerneros.nroTernero);
        console.log(labelTe);

    }


    const openNewRefra = () => {



        setLabelTe(selectedTerneros.nroTernero)
        setFLabelTe(selectedTerneros.fechaNac)
        setSubmitted(false);
        setRefraDialog(true);



    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openDialogParto} />

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


    const opcionesToolbar = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-buttonset" style={{ marginLeft: '1em' }}>

                    <Button label="Refractrometría" icon="pi pi-check" className="p-button p-component p-button-raised p-button-secundary" onClick={openNewRefra} />
                    <Button label="Eliminar Registro" icon="pi pi-trash" className="p-button p-component p-button-raised p-button-danger" onClick={() => confirmDeleteTernero(rowData)}/>
                </span>
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
        limpiarTernero();
        setSelectedTerneros([]);
        setSubmitted(false);
        setTerneroDialog(false);
        setPartoDialog(false);
        setRegistrarPDialog(false);
        setMuerteDialog(false);
        setRefraDialog(false);
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

    const muerteDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={MuerteRegistrar} />
        </React.Fragment>
    );

    const refraDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={RefraRegistrar} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => editTernero()} />
                <Button icon="pi pi-times-circle" className="p-button-rounded p-button-danger" onClick={openNewMuerte} />
            </React.Fragment>
        );
    }

    const [deleteTerneroDialog, setDeleteTerneroDialog] = useState(false);
    const [registrarPDialog, setRegistrarPDialog] = useState(false);
    const [bajaTerneroDialog, setBajaTerneroDialog] = useState(false);

    const hideDeleteTerneroDialog = () => {
        setDeleteTerneroDialog(false);
    }

    const hideBajaTerneroDialog = () => {
        setBajaTerneroDialog(false);
    }

    const confirmDeleteTernero = () => {
        setDeleteTerneroDialog(true);
    }

    const editTernero = () => {
        if (selectedTerneros !== null) {

            setTerneroDialog(true);
            moment.defaultFormat = "DD.MM.YYYY HH:mm";
            
            if (selectedTerneros.enfermedad !== null) {
                setDescEnfe(selectedTerneros.enfermedad.observaciones)
            }
            setDisa(true);
            setIdTernero(selectedTerneros.id)
            setAltura(selectedTerneros.altura)
            setSexo(selectedTerneros.sexo)
            setNroTernero(selectedTerneros.nroTernero)
            setPeso(selectedTerneros.peso)
            setFechaNac(moment(selectedTerneros.fechaNac, moment.defaultFormat).toDate())
            setPesoDes(selectedTerneros.pesoDes)
            if (selectedTerneros.parto !== null) {
                setParto(selectedTerneros.parto)
            } if (selectedTerneros.parto === '') {
                setParto(null)
            }
            if (selectedTerneros.madre !== null) {
                setMadre(selectedTerneros.madre)
            } if (selectedTerneros.madre === '') {
                setMadre(null)
            }
            if (selectedTerneros.fechaDes !== null) {
                setFechaDes(moment(selectedTerneros.fechaDes, moment.defaultFormat).toDate())
            } if (selectedTerneros.fechaDes === '') {
                setFechaDes(null)
            }

            if (selectedTerneros.muerte !== null) {
                setFechaMuerte(moment(selectedTerneros.muerte.fechaMuerte, moment.defaultFormat).toDate())
                setCausa(selectedTerneros.muerte.causa)
                setComentario(selectedTerneros.muerte.comentario)
            }

            console.log(selectedTerneros.fechaNac)
            console.log(parto)
        }
    }

    const limpiarTernero = () => {

        setDisa(false);
        setAltura('');
        setNroTernero('');
        setPeso('');
        setFechaNac('');
        setFechaDes('');
        setPesoDes('');
        setDescEnfe('');
    }

    const deleteTerneroDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTerneroDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={TerneroDelete} />
        </React.Fragment>
    );

    const bajaTerneroDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideBajaTerneroDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={ConfirmarMuerte} />
        </React.Fragment>
    );

    const registarPDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={openNew} />
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={openNewParto} />
        </React.Fragment>
    );

    const madreDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={MadreGuardar} />
        </React.Fragment>
    );


    const cols = [
        { field: 'nroTernero', header: 'NroTernero' },
        { field: 'fechaNac', header: 'Fech. Nac.' },
        { field: 'peso', header: 'Peso' },
        { field: 'fechaDes', header: 'Fech. Des.' },
        { field: 'pesoDes', header: 'Peso Des.' },
        { field: 'altura', header: 'Altura' },
        { field: 'enfermedad', header: 'Enfermedad' },
        { field: 'parto.id_parto', header: 'Parto' },
        { field: 'muerte.id_muerte', header: 'Muerte' }
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
            saveAsExcelFile(excelBuffer, 'Terneros');
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
                    <Column field="salud" header="SALUD" body={imageBodyTemplate}></Column>
                    <Column field="nroTernero" header="NRO TERNERO"></Column>
                    <Column field="fechaNac" header="FECHA NACIMIENTO"></Column>
                    <Column field="peso" header="PESO"></Column>
                    <Column field="altura" header="ALTURA"></Column>
                    <Column field="parto.id_parto" header="PARTO"></Column>
                    <Column field="parto.trazabilidad" header="TRAZABILIDAD"></Column>
                    <Column field="enfermedad.nombre" header="ENFERMEDAD"></Column>




                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
                <Toolbar className="p-toolbar p-component mb-4" right={opcionesToolbar} ></Toolbar>
            </div>

            <Dialog visible={terneroDialog} style={{ width: '90%' }} header="Datos Ternero" modal className="p-fluid" footer={terneroDialogFooter} onHide={hideDialog}>
                <div className="surface-card p-4 border-round p-fluid">
                    <Divider align="center">
                        <span className="p-tag">Nacimiento</span>
                    </Divider>
                    <div className="grid formgrid p-fluid">

                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="nroTernero">Nro Ternero</label>
                            <InputText disabled={disa} value={nroTernero} id="nroTernero" onChange={(e) => setNroTernero(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nroTernero })} />
                            {submitted && !nroTernero && <small className="p-error">Ingresar Nro Ternero</small>}
                        </div>

                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="fechaNac">Fecha Nacimiento</label>
                            <Calendar disabled={disa} value={fechaNac} placeholder={fechaNac} id="fechaNac" dateFormat="dd/mm/yy" onChange={(e) => setFechaNac(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !fechaNac })}></Calendar>                    {submitted && !fechaNac && <small className="p-error">Ingresar fechaNac</small>}
                        </div>

                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="trazabilidad">Trazabilidad</label>
                            <InputText value={trazabilidad} id="trazabilidad" onChange={(e) => setTrazabilidad(e.target.value)} keyfilter="int" />
                        </div>


                        <div className="field mb-4 col-6 md:col-3">
                            <label className="font-medium text-900" htmlFor="peso">Peso Nacimiento</label>
                            <InputText value={peso} keyfilter="num" id="peso" locale="es" onChange={(e) => setPeso(e.target.value)} required className={classNames({ 'p-invalid': submitted && !peso })} />
                            {submitted && !peso && <small className="p-error">Ingresar Peso Nacimiento</small>}
                        </div>

                        <div className="field mb-4 col-6 md:col-3">
                            <label className="font-medium text-900" htmlFor="altura">Altura</label>
                            <InputText value={altura} keyfilter="num" id="altura" onChange={(e) => setAltura(e.target.value)} required className={classNames({ 'p-invalid': submitted && !peso })} />
                            {submitted && !altura && <small className="p-error">Ingresar Altura</small>}
                        </div>

                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="sexo">Sexo</label>
                            <Dropdown value={sexo} options={sexoHM} onChange={(e) => setSexo(e.value)} placeholder="Seleccionar sexo" />
                            {submitted && !evento && <small className="p-error">Ingresar sexo</small>}

                        </div>

                        <div className="field mb-4 col-6 md:col-3">
                            <label className="font-medium text-900" htmlFor="item">Guachera</label>
                            <div className="flex align-content-center">
                                <Dropdown value={guachera} options={guacheras} onChange={(e) => setGuachera(e.value)} optionLabel="nroGuachera" placeholder="Seleccionar guachera" />
                                {submitted && !evento && <small className="p-error">Ingresar Guachera</small>}
                            </div>
                        </div>

                        <div className="field mb-4 col-6 md:col-3">
                            <label className="font-medium text-900" htmlFor="item">Madre</label>
                            <div className="flex align-content-center">
                                <Dropdown value={madre} options={madres} onChange={(e) => setMadre(e.value)} optionLabel="nroMadre" placeholder="Seleccionar madre" />
                                {submitted && !evento && <small className="p-error">Ingresar Madre</small>}
                                <Button icon="pi pi-plus" className="p-button-rounded p-button-success p-button-text" aria-label="Agregar" />
                            </div>
                        </div>

                        



                        <div className="field mb-4 col-12 md:col-6">

                        </div>

                        <Divider align="center">
                            <span className="p-tag">Enfermedad</span>
                        </Divider>


                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="altura">Enfermedad</label>
                            <MultiSelect value={selectedEnfermedad} options={enfermedades} onChange={(e) => setSelectedEnfermedad(e.value)} optionLabel="nombre" placeholder="Seleccionar Enfermedad" maxSelectedLabels={3} />
                        </div>


                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="descEnfe">Descripción</label>
                            <InputTextarea disabled value={descEnfe} id="descEnfe" autoResize />
                        </div>

                        <Divider align="center">
                            <span className="p-tag">Salida</span>
                        </Divider>


                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="fechaDes">Fecha Desleche</label>
                            <Calendar value={fechaDes} placeholder={fechaDes} id="fechaDes" dateFormat="dd/mm/yy" onChange={(e) => setFechaDes(e.target.value)} showButtonBar></Calendar>
                        </div>


                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="pesoDes">Peso Desleche</label>
                            <InputText value={pesoDes} keyfilter="num" id="pesoDes" onChange={(e) => setPesoDes(e.target.value)} />
                        </div>

                        <Divider align="center">
                            <span className="p-tag">Muerte</span>
                        </Divider>


                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="fechaMuerte">Fecha</label>
                            <InputText disabled value={fechaMuerte} id="fechaMuerte" />
                        </div>


                        <div className="field mb-4 col-12 md:col-6">
                            <label className="font-medium text-900" htmlFor="causa">Causa</label>
                            <InputText disabled value={causa} id="causa" onChange={(e) => setCausa(e.target.value)} />
                        </div>

                        <div className="field mb-4 col-12">
                            <label className="font-medium text-900" htmlFor="comentario">Comentario</label>
                            <InputTextarea disabled value={comentario} id="comentario" autoResize />
                        </div>

                        <div className="surface-border border-top-1 opacity-50 mb-4 col-12">
                        </div>
                    </div>
                </div>


            </Dialog>

            <Dialog visible={partoDialog} style={{ width: '450px' }} header="Datos Parto" modal className="p-fluid" footer={partoDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label className="font-medium text-900" >Tipo Parto</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="tipoPar" value="Natural" onChange={(e) => setTipoPar(e.value)} checked={tipoPar === 'Natural'} />
                            <label className="font-medium text-900" htmlFor="category1">Natural</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="tipoPar" value="Asistido" onChange={(e) => setTipoPar(e.value)} checked={tipoPar === 'Asistido'} />
                            <label className="font-medium text-900" htmlFor="category2">Asistido</label>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="retencionPla">Retención Placenta</label>
                    <InputText id="retencionPla" onChange={(e) => setRetencionPla(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !retencionPla })} />
                    {submitted && !retencionPla && <small className="p-error">Ingresar Retención</small>}
                </div>
            </Dialog>


            <Dialog visible={muerteDialog} style={{ width: '450px' }} header="Datos Muerte" modal className="p-fluid" footer={muerteDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="causa">Nro Ternero</label>
                    <InputText disabled id="causa" value={labelTe} />

                </div>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="fechaMuerte">Fecha Muerte</label>
                    <Calendar id="fechaMuerte" dateFormat="dd/mm/yy" onChange={(e) => setFechaMuerte(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !fechaMuerte })}></Calendar>
                    {submitted && !fechaMuerte && <small className="p-error">Ingresar Fecha Muerte</small>}
                </div>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="causa">Causa</label>
                    <Dropdown value={causa} options={tiposCausas} onChange={(e) => setCausa(e.value)} placeholder="Seleccionar causa" />                    {submitted && !evento && <small className="p-error">Ingresar Evento</small>}
                    {submitted && !causa && <small className="p-error">Ingresar Causa</small>}
                </div>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="dias">Días</label>
                    <InputText id="dias" onChange={(e) => setDias(e.target.value)} required />

                </div>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="comentario">Comentario</label>
                    <InputText id="comentario" onChange={(e) => setComentario(e.target.value)} required />

                </div>

            </Dialog>


            <Dialog visible={refraDialog} style={{ width: '450px' }} header="Datos Refractrometría" modal className="p-fluid" footer={refraDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="causa">Nro Ternero</label>
                    <InputText disabled id="causa" value={labelTe} />

                </div>


                <div className="field">
                    <label className="font-medium text-900" htmlFor="fechaNac">Fecha Nacimiento</label>
                    <InputText disabled value={labelFTe} id="fechaNac" />
                </div>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="fechaRefra">Fecha Refractromería</label>
                    <Calendar id="fechaRefra" dateFormat="dd/mm/yy" onChange={(e) => setFechaRefra(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !fechaRefra })}></Calendar>
                    {submitted && !fechaRefra && <small className="p-error">Ingresar Fecha Refractromería</small>}
                </div>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="evento">Evento</label>
                    <Dropdown value={evento} options={tipos} onChange={(e) => setEvento(e.value)} placeholder="Seleccionar evento" />                    {submitted && !evento && <small className="p-error">Ingresar Evento</small>}
                </div>

                <div className="field">
                    <label className="font-medium text-900" htmlFor="nota">Nota</label>
                    <InputText id="nota" onChange={(e) => setNota(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nota })} />
                    {submitted && !nota && <small className="p-error">Ingresar Nota</small>}
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

            <Dialog visible={bajaTerneroDialog} style={{ width: '450px' }} header="Confirmar Muerte" modal footer={bajaTerneroDialogFooter} onHide={hideBajaTerneroDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedTerneros && <span>Seguro desea dar de baja el ternero: <b>{selectedTerneros.nroTernero}</b> ?</span>}
                </div>
            </Dialog>

            <Dialog visible={madreDialog} style={{ width: '450px' }} header="Datos Madre" modal className="p-fluid" footer={madreDialogFooter} onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="nroMadre">Numero Madre</label>
                    <InputText id="nroMadre" onChange={(e) => setNroMadre(e.target.value)} required className={classNames({ 'p-invalid': submitted && !nroMadre })} />
                    {submitted && !nroMadre && <small className="p-error">Ingresar Nro Madre</small>}
                </div>

                <div className="field">
                    <label htmlFor="trazabilidadM">Trazabilidad</label>
                    <InputText id="trazabilidadM" onChange={(e) => setTrazabilidadM(e.target.value)} required className={classNames({ 'p-invalid': submitted && !trazabilidadM })} />
                    {submitted && !trazabilidadM && <small className="p-error">Ingresar Trazabilidad</small>}
                </div>

            </Dialog>

        </div>

    );
}