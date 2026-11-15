const passwordInput = document.getElementById("password");
const passwordIcon = document.getElementById("eyePass1");
const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmPasswordIcon = document.getElementById("eyePass2");
const firstNameInput = document.getElementById("nombre");
const lastNameInput = document.getElementById("apellido");
const ageInput = document.getElementById("edad");
const birthDateInput = document.getElementById("fechaNacimiento");
const genderInput = document.getElementById("genero");
const maritalStatusInput = document.getElementById("estadoCivil");
const emailInput = document.getElementById("email");
const statusMessage = document.getElementById("statusMessage");
const statusIcon = document.getElementById("statusIcon");
const statusText = document.getElementById("statusText");
const welcomeName = document.getElementById("welcomeName");
const passwordFields = {
  password: { input: passwordInput, icon: passwordIcon },
  confirmPassword: { input: confirmPasswordInput, icon: confirmPasswordIcon }
};

const togglePasswordVisibility = (inputId, iconId, button) => {
  const passwordField = passwordFields[inputId];

  if (!passwordField || !passwordField.input || !passwordField.icon || passwordField.icon.id !== iconId || !button) {
    console.warn("No se encontró el campo de contraseña o su icono.");
    return;
  }

  if (passwordField.input.type === "password") {
    passwordField.input.type = "text";
    passwordField.icon.textContent = "visibility_off";
    button.setAttribute("aria-label", "Ocultar contraseña");
    return;
  }

  passwordField.input.type = "password";
  passwordField.icon.textContent = "visibility";
  button.setAttribute("aria-label", "Mostrar contraseña");
};

const handleSubmit = (event) => {
  event.preventDefault();

  const registrationElements = [
    passwordInput,
    confirmPasswordInput,
    firstNameInput,
    lastNameInput,
    ageInput,
    birthDateInput,
    genderInput,
    maritalStatusInput,
    emailInput,
    statusMessage,
    statusIcon,
    statusText
  ];

  if (registrationElements.some((element) => !element)) {
    console.error("No se pudo completar el registro: faltan elementos del formulario.");
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    statusMessage.hidden = false;
    statusMessage.classList.add("is-error");
    statusIcon.textContent = "error";
    statusText.textContent = "Las contraseñas no coinciden. Por favor, inténtelo de nuevo.";
    return;
  }

  const emailRegistrado = emailInput.value.trim();

  try {
    localStorage.setItem("emailRegistrado", emailRegistrado);
    localStorage.removeItem("registroUsuario");
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
  if (!welcomeName) {
    return;
  }

  try {
    const emailRegistrado = localStorage.getItem("emailRegistrado");

    if (!emailRegistrado) {
      return;
    }

    welcomeName.textContent = `Hola, ${emailRegistrado}. Tu perfil está listo.`;
  } catch (error) {
    console.error("No se pudo recuperar el perfil guardado.", error);
  }
};

const handleLogout = (event) => {
  event.preventDefault();

  try {
    localStorage.removeItem("emailRegistrado");
    localStorage.removeItem("registroUsuario");
  } catch (error) {
    console.error("No se pudieron eliminar los datos del registro.", error);
    return;
  }

  window.location.href = "index.html";
};

window.togglePasswordVisibility = togglePasswordVisibility;
window.handleSubmit = handleSubmit;
window.handleLogout = handleLogout;
initializeWelcome();
