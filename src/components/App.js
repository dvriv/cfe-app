import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TablePasivosContainer from './TablePasivos/TablePasivosContainer';
import HomePage from './HomePage';
import MainSideNav from './MainSideNav';
import PasivoEntryContainer from './PasivoEntry/PasivoEntryContainer';
import CentroCosto from './CentrosCosto/CentrosCosto';
import Test from './Test';

// import EditPasivo from './EditPasivo';

const App = () => (
  <div className="app-container">
    <MainSideNav />
    <div className="content-container">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pasivos" component={TablePasivosContainer} />
        <Route path="/pasivos/:id/:mode" component={PasivoEntryContainer} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/centroscosto" component={CentroCosto} />
      </Switch>
    </div>
  </div>
);
export default App;
