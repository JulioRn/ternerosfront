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






export default function GestionAlimentos() {

    var moment = require('moment');

    const [disa, setDisa] = useState(false);

    const [idTernero, setIdTernero] = useState(null)
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



    const [fechaMuerte, setFechaMuerte] = useState('')
    const [causa, setCausa] = useState('')
    const [dias, setDias] = useState('')
    const [comentario, setComentario] = useState('')

    const [fechaRefra, setFechaRefra] = useState('')
    const [edad, setEdad] = useState('')
    const [nota, setNota] = useState('')
    const [evento, setEvento] = useState('')



    const fechaMuerteC = moment(fechaMuerte).format('DD/MM/yyyy');
    const fechaRefraC = moment(fechaRefra).format('DD/MM/yyyy');


    return (

        <div className="surface-0">
            <ResponsiveAppBar />
            <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
                <div class="text-900 font-medium text-900 text-xl mb-3">Datos del Ternero</div>
                <div class="surface-card p-4 shadow-2 border-round p-fluid">
                    <div class="grid formgrid p-fluid">
                        <div class="field mb-4 col-12 md:col-6">
                            <label htmlFor="nroTernero" class="font-medium text-900">Nro Ternero</label>
                            <InputText disabled={disa} value={nroTernero} id="nroTernero" onChange={(e) => setNroTernero(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && !nroTernero })} />
                            {submitted && !nroTernero && <small className="p-error">Ingresar Nro Ternero</small>}
                        </div>

                        <div class="field mb-4 col-12 md:col-6">
                            <label htmlFor="fechaNac">Fecha Nacimiento</label>
                            <Calendar disabled={disa} value={fechaNac} placeholder={fechaNac} id="fechaNac" dateFormat="dd/mm/yy" onChange={(e) => setFechaNac(e.target.value)} showButtonBar required className={classNames({ 'p-invalid': submitted && !fechaNac })}></Calendar>                    {submitted && !fechaNac && <small className="p-error">Ingresar fechaNac</small>}
                        </div>

                        <div class="field mb-4 col-12 md:col-6">
                            <label htmlFor="peso">Peso Nacimiento</label>
                            <InputText value={peso} id="peso" locale="es" onChange={(e) => setPeso(e.target.value)} required className={classNames({ 'p-invalid': submitted && !peso })} />
                            {submitted && !peso && <small className="p-error">Ingresar Peso Nacimiento</small>}
                        </div>

                        <div class="field mb-4 col-12 md:col-6">
                            <label htmlFor="altura">Altura</label>
                            <InputText value={altura} id="altura" onChange={(e) => setAltura(e.target.value)} required className={classNames({ 'p-invalid': submitted && !peso })} />
                            {submitted && !altura && <small className="p-error">Ingresar Altura</small>}
                        </div>

                        <Divider align="center">
                            <span className="p-tag">Salida</span>
                        </Divider>


                        <div class="field mb-4 col-12 md:col-6">
                            <label htmlFor="fechaDes">Fecha Desleche</label>
                            <Calendar value={fechaDes} placeholder={fechaDes} id="fechaDes" dateFormat="dd/mm/yy" onChange={(e) => setFechaDes(e.target.value)} showButtonBar></Calendar>
                        </div>


                        <div class="field mb-4 col-12 md:col-6">
                            <label htmlFor="pesoDes">Peso Desleche</label>
                            <InputText value={pesoDes} id="pesoDes" onChange={(e) => setPesoDes(e.target.value)} />
                        </div>

                        <div class="surface-border border-top-1 opacity-50 mb-4 col-12">
</div>
                        <div class="field mb-4 col-12 md:col-6">
                        <label htmlFor="trazabilidad">Trazabilidad</label>
                            <InputText value={pesoDes} id="trazabilidad" onChange={(e) => setPesoDes(e.target.value)} />
                        </div>


                        <div class="field mb-4 col-6 md:col-3">
                        <label htmlFor="sexo">Sexo</label>
                            <InputText value={pesoDes} id="sexo" onChange={(e) => setPesoDes(e.target.value)} />
                        </div>

                        <div class="field mb-4 col-6 md:col-3">
                            <label for="item" class="font-medium text-900">Price</label>
                            <div class="flex align-content-center">
                                <span id="item3" class="p-inputnumber p-component p-inputwrapper flex-1"><input role="spinbutton" class="p-inputtext p-component p-inputnumber-input" type="text" inputmode="decimal" /></span>
                                <button class="p-button p-component p-button-danger p-button-text ml-2 p-button-icon-only"><span class="p-button-icon p-c pi pi-trash"></span><span class="p-button-label p-c">&nbsp;</span><span role="presentation" class="p-ink"></span></button>
                            </div>
                        </div>

                        <div class="field mb-4 col-12 md:col-6"><button aria-label="Add Item" class="p-button p-component p-button-secondary p-button-outlined w-auto"><span class="p-button-icon p-c p-button-icon-left pi pi-plus"></span><span class="p-button-label p-c">Add Item</span><span role="presentation" class="p-ink"></span></button>
</div>
                        <div class="field mb-4 col-12 md:col-6 text-right">
                            <span class="text-xl text-600 font-medium text-900 mr-2">Total</span>
                            <span class="text-xl text-900 font-medium text-900">$59</span>

                        </div>
                        <div class="field mb-4 col-12 flex align-items-center">
<div class="p-checkbox p-component">
<div class="p-hidden-accessible"><input type="checkbox" />
</div>
                            <div class="p-checkbox-box"><span class="p-checkbox-icon p-c"></span>
</div>
                        </div><span class="ml-2 text-900">Taxable (VAT 18%)</span>
</div>
                        <div class="surface-border border-top-1 opacity-50 mb-4 col-12">
</div>
                        <div class="field mb-4 col-12"><label for="notes" class="font-medium text-900">Notes</label><textarea id="notes" rows="5" class="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable" style={{ overflow: 'hidden', height: '131px;"' }}></textarea>
</div>
                        <div class="surface-border border-top-1 opacity-50 mb-4 col-12">
</div>
                    </div><button aria-label="Create Invoice" class="p-button p-component w-auto"><span class="p-button-icon p-c p-button-icon-left pi pi-file"></span><span class="p-button-label p-c">Create Invoice</span><span role="presentation" class="p-ink"></span></button>
                </div>
            </div>
        </div>

    );

}