import React from 'react';
import { Button, Select } from 'semantic-ui-react';

const TablePasivosControls = (props) => {
  return (
    <div className="container table-header" style={{ textAlign: 'left' }}>
      <span><strong> Tipo: </strong></span>
      <Select
        placeholder="Tipo"
        name="tipo"
        value={props.pasivoTipoValue}
        onChange={props.handleSelectChange}
        options={props.tipoOptions}
        closeOnChange
      />
      <span><strong> Modo: </strong></span>
      <Select
        placeholder="Modo"
        name="modo"
        value={props.pasivoModoValue}
        onChange={props.handleSelectChange}
        options={props.modoOptions}
        closeOnChange
      />
      <span><strong> Mes: </strong></span>
      <Select
        placeholder="Mes"
        name="month"
        value={props.pasivoMonthValue}
        onChange={props.handleSelectChange}
        options={props.monthOptions}
        closeOnChange
      />
      <span><strong> Año: </strong></span>
      <Select
        placeholder="Año"
        name="year"
        value={props.pasivoYearValue}
        onChange={props.handleSelectChange}
        options={props.yearOptions}
        closeOnChange
      />
      <Button onClick={props.filterAndGetData} secundary="true">Filtrar</Button>
      <Button onClick={props.openNewPasivoModal} primary>Agregar nuevo</Button>
    </div>
  );
};

export default TablePasivosControls;

