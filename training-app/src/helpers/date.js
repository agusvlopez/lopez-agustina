/**
 * Transforma un objeto Date a una representación como string con el formato:
 * AAAA-MM-DD hh:mm:ss
 * 
 * @param {Date} date 
 */

export function dateToString(date){

    const dateFormatter = new Intl.DateTimeFormat('es-AR', {
        //que reglas quiero que tenga
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);

    return dateFormatter.replace(',', '');
}