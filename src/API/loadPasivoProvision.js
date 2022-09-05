export default async function loadPasivoProvision(mes, año, tipo) {
  try {
    const response = await fetch(`/api/resumenconcepto?año=${año}&mes=${mes}&modo=provision&tipo=${tipo}`, {
      method: 'GET',
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
    });
    const result = await response.json();
    console.log('this is the response', result);
    return result;
  }
  catch (err) {
    console.log('error on getPasivoByID', err);
    return false;
  }
}