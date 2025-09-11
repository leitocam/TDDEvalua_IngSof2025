import { calcularTarifa, minutesBetween } from './Tarifador.js';

describe('calcularTarifa', () => {
    //verifica que la funcion exista y reciba dos fechas como parametros
    it('deberia existir la funcion calcularTarifa', () => {
        expect(typeof calcularTarifa).toBe('function');
        expect(calcularTarifa.length).toBe(2);
    });
    //verifica que la fecha de salida no sea anterior a la de entrada
    it('deberia lanzar un error si la fecha de salida es anterior a la de entrada', () => {
        const fechaInicio = new Date('2023-10-10T10:00:00');
        const fechaFin = new Date('2023-10-09T10:00:00');
        expect(() => calcularTarifa(fechaInicio, fechaFin)).toThrow('La fecha de salida no puede ser anterior a la de entrada');
    });
    //verifica que si solo se proporciona una fecha, lance un error de que debe ingresar ambas fechas
    it('deberia lanzar un error si no se proporcionan ambas fechas', () => {
        const fechaInicio = new Date('2023-10-10T10:00:00');
        expect(() => calcularTarifa(fechaInicio, null)).toThrow();
        expect(() => calcularTarifa(null, fechaInicio)).toThrow();
        expect(() => calcularTarifa(null, null)).toThrow();
    });
    //verifica que si se proporcionan ambas fechas correctamente, no lance ningun error
    it('deberia no lanzar un error si se proporcionan ambas fechas correctamente', () => {
        const fechaInicio = new Date('2023-10-10T10:00:00');
        const fechaFin = new Date('2023-10-11T10:00:00');
        expect(() => calcularTarifa(fechaInicio, fechaFin)).not.toThrow();
    });
    //test(core): minutesBetween calcula minutos naturales entre dos fechas
    it('deberia calcular minutos naturales entre dos fechas', () => {
        const fechaInicio = new Date('2023-10-10T10:00:00');
        const fechaFin = new Date('2023-10-10T10:30:00');
        expect(minutesBetween(fechaInicio, fechaFin)).toBe(30);
    });
    //Debe calcular eo cobro para estadia de una hora exacta
    it('deberia calcular la tarifa para una estadia de una hora exacta', () => {
        const fechaInicio = new Date('2023-10-10T10:00:00');
        const fechaFin = new Date('2023-10-10T11:00:00');
        expect(calcularTarifa(fechaInicio, fechaFin)).toBe(10.00);
    });
    //Debe calcular el cobro para estadia menor a una hora redondeando en 2 decimales
    it('deberia calcular la tarifa para una estadia menor a una hora', () => {
        const fechaInicio = new Date('2023-10-10T10:00:00');
        const fechaFin = new Date('2023-10-10T10:45:00');
        expect(calcularTarifa(fechaInicio, fechaFin)).toBe(7.50);
    });
    //Debe calcular el cobro para estadia mayor a una hora y horas no cerradas redondeando en 2 decimales
    it('deberia calcular la tarifa para una estadia mayor a una hora y horas no cerradas', () => {
        const fechaInicio = new Date('2023-10-10T10:00:00');
        const fechaFin = new Date('2023-10-10T11:45:00');
        expect(calcularTarifa(fechaInicio, fechaFin)).toBe(17.50);
    });
    //Debe aplicar tarifa nocturna entre 22:00 y 06:00 donde se rige 6.00 por hora o fracción
    it('deberia aplicar tarifa nocturna entre 22:00 y 06:00', () => {
        const fechaInicio = new Date('2023-10-10T22:00:00');
        const fechaFin = new Date('2023-10-11T01:00:00');
        expect(calcularTarifa(fechaInicio, fechaFin)).toBe(18.00);
    });
    // debe comprobar el cobro para estadia que inicia en horario diurno y termina en horario nocturno
    it('deberia calcular la tarifa para una estadia que inicia en horario diurno y termina en horario nocturno', () => {
        const fechaInicio = new Date('2023-10-10T21:00:00');
        const fechaFin = new Date('2023-10-11T01:00:00');
        expect(calcularTarifa(fechaInicio, fechaFin)).toBe(28.00);
    });
    // debe aplicar tope de 50 Bs por día calendario
    it('deberia aplicar tope de 50 Bs por dia calendario', () => {
        const fechaInicio = new Date('2023-10-10T10:00:00');
        const fechaFin = new Date('2023-10-10T23:59:59');
        expect(calcularTarifa(fechaInicio, fechaFin)).toBe(50.00);
    });
    // 'deberia calcular correctamente estadías de múltiples días 
    it('deberia calcular correctamente estadías de múltiples días', () => {
        const fechaInicio = new Date('2023-10-10T08:00:00');
        const fechaFin = new Date('2023-10-12T10:00:00');
        expect(calcularTarifa(fechaInicio, fechaFin)).toBe(150.00);
    });
});