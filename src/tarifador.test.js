
import { calcularTarifa } from './Tarifador';

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
    
});