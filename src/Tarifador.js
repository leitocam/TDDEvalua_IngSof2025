export function calcularTarifa(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
        throw new Error('Debe proporcionar ambas fechas');
    }
    
    if (fechaFin < fechaInicio) {
        throw new Error('La fecha de salida no puede ser anterior a la de entrada');
    }
    
    const minutos = minutesBetween(fechaInicio, fechaFin);
    const horaInicio = fechaInicio.getHours();
    const horaFin = fechaFin.getHours();
    
    // Verificar si es el mismo día calendario o si cruza a la madrugada del día siguiente
    const inicioStr = fechaInicio.toDateString();
    const finStr = fechaFin.toDateString();
    const mismoDiaCalendario = inicioStr === finStr ||
        (fechaFin.getDate() === fechaInicio.getDate() + 1 && 
         fechaFin.getMonth() === fechaInicio.getMonth() &&
         fechaFin.getFullYear() === fechaInicio.getFullYear() &&
         horaFin < 6);
    
    if (mismoDiaCalendario) {
        let tarifaTotal = 0;
        
        // Si toda la estadía está en horario nocturno (22:00 - 06:00)
        if (horaInicio >= 22 && horaFin < 6) {
            tarifaTotal = (minutos / 60) * 6;
        }
        // Si cruza de horario diurno a nocturno
        else if (horaInicio < 22 && horaFin < 6) {
            // Calcular horas diurnas hasta las 22:00
            const finDiurno = new Date(fechaInicio);
            finDiurno.setHours(22, 0, 0, 0);
            
            const minutosDiurnos = minutesBetween(fechaInicio, finDiurno);
            tarifaTotal += (minutosDiurnos / 60) * 10;
            
            // Calcular horas nocturnas desde las 22:00
            const minutosNocturnos = minutesBetween(finDiurno, fechaFin);
            tarifaTotal += (minutosNocturnos / 60) * 6;
        }
        // Tarifa diurna normal
        else {
            tarifaTotal = (minutos / 60) * 10;
        }
        
        // Aplicar tope de 50 Bs por día y redondear
        const tarifaRedondeada = Math.round(tarifaTotal * 100) / 100;
        return Math.min(tarifaRedondeada, 50.00);
    }
    
    // Para estadías de múltiples días - calcular día por día
    let tarifaTotal = 0;
    let fechaActual = new Date(fechaInicio.getTime());
    
    // Primer día (día de entrada)
    const finPrimerDia = new Date(fechaActual);
    finPrimerDia.setHours(23, 59, 59, 999);
    
    const minutosPrimerDia = minutesBetween(fechaActual, finPrimerDia);
    let tarifaPrimerDia = (minutosPrimerDia / 60) * 10;
    tarifaTotal += Math.min(50.00, tarifaPrimerDia);
    
    // Días completos intermedios
    fechaActual.setDate(fechaActual.getDate() + 1);
    fechaActual.setHours(0, 0, 0, 0);
    
    while (fechaActual.toDateString() !== fechaFin.toDateString()) {
        // Un día completo = 24 horas * 10 Bs = 240 Bs, pero con tope de 50 Bs
        tarifaTotal += 50.00;
        
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    
    // Último día (día de salida) - solo si hay tiempo en ese día
    if (fechaFin.getHours() > 0 || fechaFin.getMinutes() > 0) {
        const inicioUltimoDia = new Date(fechaFin);
        inicioUltimoDia.setHours(0, 0, 0, 0);
        
        const minutosUltimoDia = minutesBetween(inicioUltimoDia, fechaFin);
        let tarifaUltimoDia = (minutosUltimoDia / 60) * 10;
        tarifaTotal += Math.min(50.00, tarifaUltimoDia);
    }
    
    return Math.round(tarifaTotal * 100) / 100;
}

export function minutesBetween(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
        throw new Error('Debe proporcionar ambas fechas');
    }
    
    const diffInMs = fechaFin.getTime() - fechaInicio.getTime();
    return Math.floor(diffInMs / (1000 * 60));
}