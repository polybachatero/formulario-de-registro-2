const togglePasswordVisibility = (inputId, iconId, button) => {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (!input || !icon) {
    console.warn("No se encontró el campo de contraseña o su icono.");
    return;
  }

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "visibility_off";
    button.setAttribute("aria-label", "Ocultar contraseña");
    return;
  }

  input.type = "password";
  icon.textContent = "visibility";
  button.setAttribute("aria-label", "Mostrar contraseña");
};

const handleSubmit = (event) => {
  event.preventDefault();

  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const statusMessage = document.getElementById("statusMessage");
  const statusIcon = document.getElementById("statusIcon");
  const statusText = document.getElementById("statusText");

  if (!password || !confirmPassword || !statusMessage || !statusIcon || !statusText) {
    console.error("No se pudo completar el registro: faltan elementos del formulario.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    statusMessage.hidden = false;
    statusMessage.classList.add("is-error");
    statusIcon.textContent = "error";
    statusText.textContent = "Las contraseñas no coinciden. Por favor, inténtelo de nuevo.";
    return;
  }

  const profile = {
    nombre: document.getElementById("nombre").value.trim(),
    apellido: document.getElementById("apellido").value.trim(),
    edad: document.getElementById("edad").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    genero: document.getElementById("genero").value,
    estadoCivil: document.getElementById("estadoCivil").value,
    email: document.getElementById("email").value.trim()
  };

  try {
    localStorage.setItem("registroUsuario", JSON.stringify(profile));
  } catch (error) {
    console.error("No se pudo guardar el perfil en el almacenamiento local.", error);
    statusMessage.hidden = false;
    statusMessage.classList.add("is-error");
    statusIcon.textContent = "error";
    statusText.textContent = "No se pudo guardar el registro. Compruebe la configuración de almacenamiento del navegador.";
    return;
  }

  statusMessage.hidden = false;
  statusMessage.classList.remove("is-error");
  statusIcon.textContent = "check_circle";
  statusText.textContent = "¡Registro completado exitosamente! Redirigiendo a bienvenida...";

  window.setTimeout(() => {
    window.location.href = "bienvenida.html";
  }, 1000);
};

const initializeWelcome = () => {
  const welcomeName = document.getElementById("welcomeName");

  if (!welcomeName) {
    return;
  }

  try {
    const savedProfile = localStorage.getItem("registroUsuario");

    if (!savedProfile) {
      return;
    }

    const profile = JSON.parse(savedProfile);

    if (profile.nombre) {
      welcomeName.textContent = `Hola, ${profile.nombre}. Tu perfil está listo.`;
    }
  } catch (error) {
    console.error("No se pudo recuperar el perfil guardado.", error);
  }
};

window.togglePasswordVisibility = togglePasswordVisibility;
window.handleSubmit = handleSubmit;
initializeWelcome();
