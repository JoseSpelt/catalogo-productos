document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contacto");
    const confirmacion = document.getElementById("confirmacion");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();

        if(nombre === "" || email === "" || mensaje === "") {
            alert("Por favor completa todos los campos.");
            return;
        }

        let mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];

        const nuevoMensaje = {
            id: Date.now(),
            nombre,
            email,
            mensaje
        };

        mensajes.push(nuevoMensaje);
        localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));

        form.reset();
        confirmacion.style.display = "block";

        setTimeout(() => {
            confirmacion.style.display = "none";
        }, 3000);
    });
});
