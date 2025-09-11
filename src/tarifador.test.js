import { calcularTarifa, minutesBetween } from './Tarifador';

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

});