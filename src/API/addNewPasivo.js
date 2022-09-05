export default async function addNewPasivo(proceso, tipo, modo, mes, año, notas) {
  console.log(tipo, modo, mes, año, notas);
  const response = await fetch('/api/pasivos', {
    method: 'POST',
    body: JSON.stringify({
      proceso,
      tipo,
      modo,
      mes,
      año,
      notas,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}
