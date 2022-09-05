import React, { Component } from 'react';
import deleteResumen from '../../API/deleteResumen';

const deleteResumenAndRender = (id) => {
  deleteResumen(id);
  window.location.reload();
};

const DeleteResumen = props => (
  <a onClick={() => deleteResumenAndRender(props.id)}> Eliminar </a>
);

export default DeleteResumen;
