document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contacto");
    const toastContainer = document.getElementById("toast-contacto");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();

        if (nombre === "" || email === "" || mensaje === "") {
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
        mostrarToast("¡Mensaje enviado correctamente!");
    });

    function mostrarToast(mensaje) {
        const toast = document.createElement("div");
        toast.className = "toast-exito";
        toast.innerHTML = `<i>✔️</i> <span>${mensaje}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 100);
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});
