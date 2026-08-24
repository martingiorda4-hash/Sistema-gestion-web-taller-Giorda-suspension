// Inserta archivos CSS al document.
export async function LoadCSS(relativePath, moduleURL) {
  try {
    const absolutePath = new URL(relativePath, moduleURL).href;

    const response = await fetch(absolutePath);
    if (!response.ok) throw new Error(`No se pudo cargar el CSS: ${absolutePath}`);

    const css = await response.text();
    const style = new CSSStyleSheet();
    await style.replace(css);

    document.adoptedStyleSheets = [...document.adoptedStyleSheets, style];
  } catch (error) {
    console.error("Error en LoadCSS:", error);
  }
}

// Genera y devuelve un código alfanumérico de la longitud deseada. 
export function GenerateIdcod(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

// Convierte de MySQL (YYYY-MM-DD o YYYY-MM-DD HH:mm:ss) a Legible (DD/MM/YYYY o DD/MM/YYYY HH:mm).
export function formatDateFromMySQL(mysqlDateString) {
  if (!mysqlDateString) return '';

  const parts = mysqlDateString.trim().split(' ');
  const datePart = parts[0];
  const timePart = parts[1];

  const dateSplits = datePart.split('-');
  if (dateSplits.length !== 3) return mysqlDateString;

  const [year, month, day] = dateSplits;
  const formattedDate = `${day}/${month}/${year}`;

  if (!timePart) {
    return formattedDate;
  }

  const timeSplits = timePart.split(':');
  const hours = timeSplits[0] || '00';
  const minutes = timeSplits[1] || '00';

  return `${formattedDate} ${hours}:${minutes}`;
}

// Convierte de MySQL (YYYY-MM-DD o YYYY-MM-DD HH:mm:ss) a Legible (DD/MM/YYYY o DD/MM/YYYY HH:mm).
export function FormatDateFromMySQL(mysqlDateString) {
  if (!mysqlDateString) return '';

  const parts = mysqlDateString.trim().split(' ');
  const datePart = parts[0];
  const timePart = parts[1];

  const dateSplits = datePart.split('-');
  if (dateSplits.length !== 3) return mysqlDateString;

  const [year, month, day] = dateSplits;
  const formattedDate = `${day}/${month}/${year}`;

  if (!timePart) {
    return formattedDate;
  }

  const timeSplits = timePart.split(':');
  const hours = timeSplits[0] || '00';
  const minutes = timeSplits[1] || '00';

  return `${formattedDate} ${hours}:${minutes}`;
}

// Convierte de Legible/Input (DD/MM/YYYY o DD/MM/YYYY HH:mm) a MySQL (YYYY-MM-DD o YYYY-MM-DD HH:mm:ss)
export function FormatDateToMySQL(localDateString) {
  if (!localDateString) return '';

  const parts = localDateString.trim().split(' ');
  const datePart = parts[0];
  const timePart = parts[1];

  const dateSplits = datePart.split('/');
  if (dateSplits.length !== 3) return localDateString;

  const [day, month, year] = dateSplits;
  const formattedDate = `${year}-${month}-${day}`;

  if (!timePart) {
    return formattedDate;
  }

  return `${formattedDate} ${timePart}:00`;
}

export function FormatCurrency(amount, currency = 'ARS', locale = 'es-AR') {
  if (isNaN(amount)) return '$ 0,00';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
