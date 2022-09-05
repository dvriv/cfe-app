import React from 'react';
import PasivoEntryTableOperacionCOP from './PasivoEntryTableOperacionCOP';
import PasivoEntryPasivoLaboral from './PasivoEntryPasivoLaboral';
import PasivoEntryImpNomina from './PasivoEntryImpNomina';
import PasivoEntryTableEventuales from './PasivoEntryTableEventuales';
import PasivoEntryTotalMenu from './PasivoEntryTotalMenu';
import PasivoEntryInfo from './PasivoEntryInfo';

const PasivoEntry = (props) => {
  if (props.metadata.proceso === 'cuotasIMSS') {
    return (
      <div className="section">
        <div className="container">
          <PasivoEntryInfo metadata={props.metadata} />
          {props.metadata.tipo === 'Operacion' ?
            <PasivoEntryTableOperacionCOP
              metadata={props.metadata}
              provisionShouldBeDisabled={props.provisionShouldBeDisabled}
              liquidacionShouldBeDisabled={props.liquidacionShouldBeDisabled}
              inputData={props.inputData}
              provisionData={props.provisionData}
              diferenciaData={props.diferenciaData}
              inputHandleChange={props.inputHandleChange}
              inputHandleBlur={props.inputHandleBlur}
            />
        :
            <PasivoEntryTableEventuales
              metadata={props.metadata}
              provisionShouldBeDisabled={props.provisionShouldBeDisabled}
              liquidacionShouldBeDisabled={props.liquidacionShouldBeDisabled}
              inputData={props.inputData}
              provisionData={props.provisionData}
              diferenciaData={props.diferenciaData}
              inputHandleChange={props.inputHandleChange}
              inputHandleBlur={props.inputHandleBlur}
            /> }
          <PasivoEntryTotalMenu
            proceso={props.metadata.proceso}
            modo={props.metadata.modo}
            tipo={props.metadata.tipo}
            inputDataTotals={props.inputDataTotals}
            provisionDataTotals={props.provisionDataTotals}
            diferenciaDataTotals={props.diferenciaDataTotals}
            generateFile={props.generateFile}
            saveResumenClickHandler={props.saveResumenClickHandler}
          />
        </div>
      </div>
    );
  }

  if (props.metadata.proceso === 'pasivoLaboral') {
    return (
      <div className="container">
        <PasivoEntryInfo metadata={props.metadata} />
        <PasivoEntryPasivoLaboral
          inputData={props.inputData}
          inputDataTotals={props.inputDataTotals}
          inputHandleChange={props.inputHandleChange}
          inputHandleBlur={props.inputHandleBlur}
        />
        <PasivoEntryTotalMenu
          proceso={props.metadata.proceso}
          inputDataTotals={props.inputDataTotals}
          generateFile={props.generateFile}
          saveResumenClickHandler={props.saveResumenClickHandler}
        />
      </div>
    );
  }

  if (props.metadata.proceso === 'impNomina') {
    return (
      <div className="container">
        <PasivoEntryInfo metadata={props.metadata} />
        <PasivoEntryImpNomina
          inputData={props.inputData}
          inputDataTotals={props.inputDataTotals}
          inputHandleChange={props.inputHandleChange}
          inputHandleBlur={props.inputHandleBlur}
        />
        <PasivoEntryTotalMenu
          proceso={props.metadata.proceso}
          inputDataTotals={props.inputDataTotals}
          generateFile={props.generateFile}
          saveResumenClickHandler={props.saveResumenClickHandler}
        />
      </div>
    );
  }

  return (
    <div>
      <span>Ha ocurrido un error</span>
    </div>
  );
};

export default PasivoEntry;
