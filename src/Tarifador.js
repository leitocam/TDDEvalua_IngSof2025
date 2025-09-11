export function calcularTarifa(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
        throw new Error('Debe proporcionar ambas fechas');
    }
    
    if (fechaFin < fechaInicio) {
        throw new Error('La fecha de salida no puede ser anterior a la de entrada');
    }
    
    const minutos = minutesBetween(fechaInicio, fechaFin);
    
    // Si la estadía cruza entre horario diurno y nocturno, calcular por separado
    const horaInicio = fechaInicio.getHours();
    const horaFin = fechaFin.getHours();
    
    // Verificar si es estadía mixta (cruza horarios)
    const esMixta = (horaInicio < 22 && horaInicio >= 6) && (horaFin <= 6 || fechaFin.getDate() > fechaInicio.getDate());
    
    if (esMixta) {
        // Calcular minutos diurnos hasta las 22:00
        const fechaCorte = new Date(fechaInicio);
        fechaCorte.setHours(22, 0, 0, 0);
        
        const minutosDiurnos = minutesBetween(fechaInicio, fechaCorte);
        const minutosNocturnos = minutos - minutosDiurnos;
        
        const tarifaDiurna = (minutosDiurnos / 60) * 10;
        const tarifaNocturna = (minutosNocturnos / 60) * 6;
        
        return Math.round((tarifaDiurna + tarifaNocturna) * 100) / 100;
    }
    
    // Verificar si toda la estadía está en horario nocturno (22:00 a 06:00)
    const esHorarioNocturno = (horaInicio >= 22 || horaInicio < 6) && (horaFin <= 6 || horaFin >= 22);
    
    if (esHorarioNocturno) {
        // Tarifa nocturna: 6.00 por hora
        const tarifa = (minutos / 60) * 6;
        return Math.round(tarifa * 100) / 100;
    }
    
    // Tarifa diurna normal: 10.00 por hora
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