export function calcularTarifa(fechaInicio, fechaFin) {
    if (fechaFin < fechaInicio) {
        throw new Error('La fecha de salida no puede ser anterior a la de entrada');
    }
}