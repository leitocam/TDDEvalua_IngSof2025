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
    const mismoDiaCalendario = fechaInicio.toDateString() === fechaFin.toDateString() ||
        (fechaFin.getDate() === fechaInicio.getDate() + 1 && horaFin < 6);
    
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
    
    // Para estadías de múltiples días (lógica existente sin cambios)
    if (horaInicio >= 22 && (horaFin >= 0 && horaFin < 6)) {
        const tarifa = (minutos / 60) * 6;
        return Math.round(tarifa * 100) / 100;
    }
    
    if (horaInicio < 22 && (horaFin >= 0 && horaFin < 6)) {
        let tarifaTotal = 0;
        
        const finDiurno = new Date(fechaInicio);
        finDiurno.setHours(22, 0, 0, 0);
        
        if (fechaInicio < finDiurno) {
            const minutosDiurnos = minutesBetween(fechaInicio, finDiurno);
            tarifaTotal += (minutosDiurnos / 60) * 10;
        }
        
        const inicioNocturno = new Date(fechaInicio);
        inicioNocturno.setHours(22, 0, 0, 0);
        
        const minutosNocturnos = minutesBetween(inicioNocturno, fechaFin);
        tarifaTotal += (minutosNocturnos / 60) * 6;
        
        return Math.round(tarifaTotal * 100) / 100;
    }
    
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