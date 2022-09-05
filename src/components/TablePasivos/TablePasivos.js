import React from 'react';
import { Table } from 'semantic-ui-react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import DeleteResumen from './DeleteResumen';

const renderBodyRow = ({ resumen_id, proceso, modo, tipo, mes, año, notas }) => ({
  key: resumen_id,
  cells: [
    resumen_id || '',
    proceso ? { key: 'proceso', content: proceso } : '',
    modo ? { key: 'modo', content: modo } : '',
    tipo ? { key: 'tipo', content: tipo } : '',
    mes ? { key: 'mes', content: mes } : '',
    año ? { key: 'año', content: año } : '',
    notas ? { key: 'notas', content: notas } : '',
    {
      key: 'actions',
      content:
        <span>
          <Link to={`/pasivos/${resumen_id}`}>Ver </Link>
          <Link to={`/pasivos/${resumen_id}/editar`}>Editar</Link>
          <DeleteResumen id={resumen_id} />
        </span>,
    },
  ],
});

const headerRow = ['ID', 'Proceso', 'Modo', 'Tipo', 'Mes', 'Año', 'Notas', 'Acciones'];

const TablePasivos = props => (
  <Table
    textAlign="center"
    headerRow={headerRow}
    tableData={props.data}
    renderBodyRow={renderBodyRow}
    size="small"
    striped
  />
);

export default TablePasivos;
