export default async function savePasivoResumen(resumenObj, resumen_id, modo) {
  console.log(resumenObj);
  const response = await fetch('/api/resumenConcepto', {
    method: 'POST',
    body: JSON.stringify({
      resumenObj,
      resumen_id,
      modo,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}
