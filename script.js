const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
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

const handleSubmit = async (event) => {
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
    const response = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailRegistrado })
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.message || "El servidor no pudo completar el registro.");
    }
  } catch (error) {
    console.error("No se pudo completar el registro con el servidor.", error);
    statusMessage.hidden = false;
    statusMessage.classList.add("is-error");
    statusIcon.textContent = "error";
    statusText.textContent = "No se pudo enviar el registro. Compruebe la conexión e inténtelo de nuevo.";
    return;
  }

  statusMessage.hidden = false;
  statusMessage.classList.remove("is-error");
  statusIcon.textContent = "check_circle";
  statusText.textContent = "¡Registro completado exitosamente! Redirigiendo a bienvenida...";

  const registroUsuario = {
    nombre: firstNameInput.value.trim(),
    apellido: lastNameInput.value.trim(),
    edad: ageInput.value,
    fechaNacimiento: birthDateInput.value,
    genero: genderInput.value,
    estadoCivil: maritalStatusInput.value,
    email: emailRegistrado
  };

  try {
    localStorage.setItem("emailRegistrado", emailRegistrado);
    localStorage.setItem("registroUsuario", JSON.stringify(registroUsuario));
  } catch (error) {
    console.warn("El registro se completó, pero no se pudieron guardar los datos localmente.", error);
  }

  window.setTimeout(() => {
    window.location.href = "bienvenida.html";
  }, 1000);
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

window.handleSubmit = handleSubmit;
window.handleLogout = handleLogout;