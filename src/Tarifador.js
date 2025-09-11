export function calcularTarifa(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
        throw new Error('Debe proporcionar ambas fechas');
    }
    
    if (fechaFin < fechaInicio) {
        throw new Error('La fecha de salida no puede ser anterior a la de entrada');
    }
    
    const minutos = minutesBetween(fechaInicio, fechaFin);
    
    // Verificar si toda la estadía está en horario nocturno (22:00 - 06:00)
    const horaInicio = fechaInicio.getHours();
    const horaFin = fechaFin.getHours();
    
    // Si inicia a las 22:00 y termina entre 00:00 y 05:59 (horario nocturno completo)
    if (horaInicio >= 22 && (horaFin >= 0 && horaFin < 6)) {
        const tarifa = (minutos / 60) * 6; // Tarifa nocturna 6.00 por hora
        return Math.round(tarifa * 100) / 100;
    }
    
    // Tarifa diurna normal
    const tarifa = (minutos / 60) * 10;
    return Math.round(tarifa * 100) / 100;
}

export function minutesBetween(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
        throw new Error('Debe proporcionar ambas fechas');
    }
    
    const diffInMs = fechaFin.getTime() - fechaInicio.getTime();
    return Math.floor(diffInMs / (1000 * 60));
}