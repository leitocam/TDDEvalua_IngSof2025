
import { calcularTarifa } from './Tarifador';

describe('calcularTarifa', () => {
    //verifica que la funcion exista y reciba dos fechas como parametros
    it('deberia existir la funcion calcularTarifa', () => {
        expect(typeof calcularTarifa).toBe('function');
        expect(calcularTarifa.length).toBe(2);
    });
});