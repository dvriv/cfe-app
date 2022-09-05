import React from 'react';
import { Header, Segment, Grid } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { months } from '../../common';

const PasivoEntryInfo = ({ metadata }) => {
  const monthPosition = (metadata.mes - 1);
  const month = months[monthPosition].text;

  return (
    <Segment>
      <Grid>
        <Grid.Column width={3}>
          <Header sub size="huge">Mes</Header>
          <span>{month}</span>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header sub size="huge">Año</Header>
          <span>{metadata.año}</span>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header sub size="huge">Tipo</Header>
          <span>{metadata.tipo}</span>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header sub size="huge">Modo</Header>
          <span>{metadata.modo}</span>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header sub size="huge">Ultima Modif.</Header>
          <span>{new Date().toJSON().slice(0, 10).replace(/-/g, '/')}</span>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default PasivoEntryInfo;
