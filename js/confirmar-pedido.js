document.getElementById("formulario-pedido").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  if (!nombre || !telefono || !email || !direccion) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  const datosUsuario = {
    nombre,
    telefono,
    email,
    direccion,
    comentario,
  };

  localStorage.setItem("datosPedido", JSON.stringify(datosUsuario));

  // Mensaje de éxito
  const exito = document.createElement("div");
  exito.className = "toast-exito show";
  exito.innerHTML = `<i>✅</i> ¡Tu pedido fue enviado correctamente!`;
  document.body.appendChild(exito);

  // Espera para mostrar el toast antes de redirigir
  setTimeout(() => {
    window.location.href = "pedido.html";
  }, 1500);
});
