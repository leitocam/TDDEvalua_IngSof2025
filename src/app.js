import { calcularTarifa } from './Tarifador.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tarifaForm');
    const resultadoDiv = document.getElementById('resultado');
    const errorDiv = document.getElementById('error');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ocultar resultados y errores previos
        resultadoDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
        
        // Obtener las fechas del formulario
        const fechaEntradaInput = document.getElementById('fechaEntrada').value;
        const fechaSalidaInput = document.getElementById('fechaSalida').value;
        
        if (!fechaEntradaInput || !fechaSalidaInput) {
            mostrarError('Por favor, selecciona ambas fechas');
            return;
        }
        
        // Convertir a objetos Date
        const fechaEntrada = new Date(fechaEntradaInput);
        const fechaSalida = new Date(fechaSalidaInput);
        
        try {
            // Calcular la tarifa
            const tarifa = calcularTarifa(fechaEntrada, fechaSalida);
            
            // Mostrar las fechas seleccionadas y el resultado
            mostrarResultado(fechaEntrada, fechaSalida, tarifa);
            
        } catch (error) {
            mostrarError(error.message);
        }
    });
    
    function mostrarResultado(fechaEntrada, fechaSalida, tarifa) {
        // Formatear las fechas para mostrar
        const opcionesFormato = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        const fechaEntradaFormateada = fechaEntrada.toLocaleDateString('es-ES', opcionesFormato);
        const fechaSalidaFormateada = fechaSalida.toLocaleDateString('es-ES', opcionesFormato);
        
        // Actualizar el contenido
        document.getElementById('entrada-mostrada').textContent = fechaEntradaFormateada;
        document.getElementById('salida-mostrada').textContent = fechaSalidaFormateada;
        document.getElementById('tarifa-valor').textContent = tarifa.toFixed(2);
        
        // Mostrar el resultado
        resultadoDiv.classList.remove('hidden');
    }
    
    function mostrarError(mensaje) {
        document.getElementById('mensaje-error').textContent = mensaje;
        errorDiv.classList.remove('hidden');
    }
});