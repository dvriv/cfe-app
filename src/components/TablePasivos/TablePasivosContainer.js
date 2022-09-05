import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Select } from 'semantic-ui-react';
import { getPasivoBy } from '../../API/getPasivo';
import TablePasivos from './TablePasivos';
import NewPasivoModalContainer from '../NewPasivoModal/NewPasivoModalContainer';
import TablePasivosPagination from './TablePasivosPagination';
import TablePasivosControls from './TablePasivosControls';
import { pasivoTipos, pasivoModos, months, years } from '../../common';

// Adding the 'All' option for the filter Select options.
// This must be modified later and instead pull all the values from db
const allOption = { text: 'Todos', value: 'all' };

const tipoOptions = pasivoTipos.slice();
const modoOptions = pasivoModos.slice();
const monthOptions = months.slice();
const yearOptions = years.slice();

tipoOptions.unshift(allOption);
modoOptions.unshift(allOption);
monthOptions.unshift(allOption);
yearOptions.unshift(allOption);

console.log(months);
class TablePasivosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activePageData: [],
      showNewPasivoModal: false,
      totalPages: 1,
      pasivoTipoValue: 'all',
      pasivoModoValue: 'all',
      pasivoMonthValue: 'all',
      pasivoYearValue: 'all',
    };

    this.openNewPasivoModal = this.openNewPasivoModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.filterAndGetData = this.filterAndGetData.bind(this);
    this.closeNewPasivoModal = this.closeNewPasivoModal.bind(this);
    this.getDataAndPagination = this.getDataAndPagination.bind(this);
  }

  componentDidMount() {
    this.getDataAndPagination();
  }

  async getDataAndPagination() {
    const { data } = await getPasivoBy();
    console.log('data', data);
    if (data) {
      const activePageData = data.slice(0, 10);
      const totalPages = Math.ceil(data.length / 10);
      console.log('this is the data', data);
      this.setState({ data, activePageData, totalPages });
    }
    else {
      console.log('there was an error getting the data', data);
      // Show error not getting data from DB
    }
  }

  async filterAndGetData() {
    const tipo = this.state.pasivoTipoValue;
    const modo = this.state.pasivoModoValue;
    const month = this.state.pasivoMonthValue;
    const year = this.state.pasivoYearValue;
    try {
      const data = await getPasivoBy(tipo, modo, month, year);
      if (data && !data.error) {
        const activePageData = data.slice(0, 10);
        const totalPages = Math.ceil(data.length / 10);
        console.log('this is the data', data);
        this.setState({ data, activePageData, totalPages });
      }
      else {
        console.log('there was an error', data);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  openNewPasivoModal() {
    this.setState({ showNewPasivoModal: true });
  }

  closeNewPasivoModal() {
    this.setState({
      showNewPasivoModal: false,
    });
  }

  handlePageChange(event, data) {
    const firstElement = (data.activePage - 1) * 10;
    const lastElement = data.activePage * 10;
    const activePageData = this.state.data.slice(firstElement, lastElement);
    this.setState({ activePageData });
  }

  handleSelectChange(event, { name, value }) {
    switch (name) {
      case 'tipo':
        this.setState({ pasivoTipoValue: value });
        break;
      case 'modo':
        this.setState({ pasivoModoValue: value });
        break;
      case 'month':
        this.setState({ pasivoMonthValue: value });
        break;
      case 'year':
        this.setState({ pasivoYearValue: value });
        break;
      default: throw new Error('value not valid');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          <TablePasivosControls
            pasivoTipoValue={this.state.pasivoTipoValue}
            pasivoModoValue={this.state.pasivoModoValue}
            pasivoMonthValue={this.state.pasivoMonthValue}
            pasivoYearValue={this.state.pasivoYearValue}
            handleSelectChange={this.handleSelectChange}
            tipoOptions={tipoOptions}
            modoOptions={modoOptions}
            monthOptions={monthOptions}
            yearOptions={yearOptions}
            filterAndGetData={this.filterAndGetData}
            openNewPasivoModal={this.openNewPasivoModal}
          />
          <TablePasivos data={this.state.activePageData} />
          <NewPasivoModalContainer showModal={this.state.showNewPasivoModal} closeNewPasivoModal={this.closeNewPasivoModal} />
        </div>
        <div className="container">
          <TablePasivosPagination
            handlePageChange={this.handlePageChange}
            totalPages={this.state.totalPages}
          />
        </div>
      </div>
    );
  }
}

export default TablePasivosContainer;
