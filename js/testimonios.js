document.addEventListener("DOMContentLoaded", () => {
    const formTestimonio = document.getElementById('form-testimonio');
    const listaTestimonios = document.getElementById('testimonios-lista');
    const confirmacion = document.getElementById('confirmacionTestimonio');

    function obtenerTestimonios() {
        const testimonios = localStorage.getItem('testimonios');
        return testimonios ? JSON.parse(testimonios) : [];
    }

    function guardarTestimonio(testimonio) {
        const testimonios = obtenerTestimonios();
        testimonios.push(testimonio);
        localStorage.setItem('testimonios', JSON.stringify(testimonios));
    }

    function mostrarTestimonios() {
        const testimonios = obtenerTestimonios();

        const testimoniosIniciales = [
            { nombre: "Laura M.", mensaje: "Excelente atención, productos de primera calidad. ¡100% recomendado!" },
            { nombre: "Daniel R.", mensaje: "El smartwatch llegó en 2 días. Muy buena experiencia." }
        ];

        const todosTestimonios = testimoniosIniciales.concat(testimonios);

        listaTestimonios.innerHTML = '';

        todosTestimonios.forEach(({ nombre, mensaje }) => {
            const div = document.createElement('div');
            div.className = 'testimonial';
            div.innerHTML = `<p>"${mensaje}"</p><span>- ${nombre}</span>`;
            listaTestimonios.appendChild(div);
        });
    }

    if (formTestimonio) {
        formTestimonio.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = formTestimonio.nombreTestimonio.value.trim();
            const mensaje = formTestimonio.mensajeTestimonio.value.trim();

            if (nombre && mensaje) {
                guardarTestimonio({ nombre, mensaje });
                mostrarTestimonios();
                formTestimonio.reset();

                confirmacion.style.display = 'block';
                confirmacion.textContent = '¡Gracias por tu testimonio!';
                setTimeout(() => {
                    confirmacion.style.display = 'none';
                }, 3000);
            }
        });
    }

    mostrarTestimonios();
});
