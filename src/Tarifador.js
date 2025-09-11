export function calcularTarifa(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
        throw new Error('Debe proporcionar ambas fechas');
    }
    
    if (fechaFin < fechaInicio) {
        throw new Error('La fecha de salida no puede ser anterior a la de entrada');
    }
    
    const minutos = minutesBetween(fechaInicio, fechaFin);
    
    // Para una hora exacta (60 minutos) retorna 10.00
    if (minutos === 60) {
        return 10.00;
    }
    
    if (minutos < 60) {
        const tarifa = (minutos / 60) * 10;
        return Math.round(tarifa * 100) / 100; 
    }
    
    return 0;
}

export function minutesBetween(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
        throw new Error('Debe proporcionar ambas fechas');
    }
    
    const diffInMs = fechaFin.getTime() - fechaInicio.getTime();
    return Math.floor(diffInMs / (1000 * 60));
}