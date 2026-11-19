Design.md --- Formulario de registro
1. Descripción del proyecto
Crear un formulario de registro web sencillo, claro y responsivo. El
usuario podrá ingresar sus datos, validarlos y, si todo es correcto,
acceder a una página de bienvenida.

El proyecto se desarrollará con HTML, CSS y JavaScript puro, sin
librerías ni frameworks.
2. Objetivo
- Permitir que una persona complete sus datos.
- Comprobar que los campos obligatorios no estén vacíos.
- Verificar que el correo electrónico y su confirmación coincidan.
- Mostrar mensajes claros cuando exista un error.
- Mostrar una confirmación cuando el registro sea válido.
- Redirigir a una página de bienvenida.
3. Estructura de archivos
El proyecto estará organizado en cuatro archivos:
formulario-registro/
├── index.html
├── style.css
├── script.js
└── bienvenida.html
- index.html: contiene la estructura del formulario.
- style.css: contiene todos los estilos visuales.
- script.js: contiene las funciones y validaciones.
- bienvenida.html: muestra el mensaje de bienvenida y un botón
  para regresar.
4. Campos del formulario
  Campo                   Tipo de input           Requisito
  Nombre completo         text                  Obligatorio

  Apellido                text                  Obligatorio

  Edad                    number                Obligatorio; debe ser
un número válido

  Correo electrónico      email                 Obligatorio
Confirmar correo        email                 Obligatorio; debe
electrónico                                     coincidir con el correo
anterior
Cada campo tendrá un label asociado mediante los atributos for e
id. Los placeholder se utilizarán como ayuda, no como reemplazo de
las etiquetas.
5. Diseño visual
- Presentar el formulario dentro de una tarjeta centrada en la página.
- Usar un fondo claro y una tarjeta blanca.
- Mantener una separación uniforme entre los campos.
- Colocar las etiquetas encima de sus respectivos inputs.
- Utilizar bordes suaves y esquinas ligeramente redondeadas.
- Destacar el botón de registro con un color diferente.
- Mostrar los mensajes de error cerca del campo correspondiente.
- Adaptar el formulario a pantallas de celulares, tabletas y
  computadoras.
6. Comportamiento y validaciones
Al presionar el botón Registrarse, JavaScript deberá:
1. Evitar el envío tradicional del formulario mediante
   event.preventDefault().
2. Obtener los valores de los campos.
3. Comprobar que ningún campo obligatorio esté vacío.
4. Comprobar que la edad sea un número válido y cumpla el criterio de
   edad que se defina para el proyecto.
5. Comprobar que el correo tenga un formato válido.
6. Comparar el correo electrónico con su confirmación.
7. Si hay errores, mostrar mensajes y mantener al usuario en el
   formulario.
8. Si todos los datos son correctos, mostrar una confirmación y
   redirigir a bienvenida.html.
Los mensajes deben ser breves y fáciles de entender. No se debe mostrar
la contraseña ni información privada en mensajes de error.
7. Página de bienvenida
La página bienvenida.html deberá incluir:
- Un título de bienvenida.
- Un mensaje que confirme que el registro fue completado.
- Un botón Salir / Regresar que lleve nuevamente a index.html.
Si se desea mostrar el nombre de la persona en esta página, se podrá
guardar únicamente el dato necesario en localStorage y recuperarlo al
cargar la página.
Importante: este ejercicio es una práctica de frontend. La validación
en JavaScript y localStorage no reemplazan un sistema de registro
seguro con servidor. No guardar contraseñas ni datos sensibles en
localStorage.

8. Requisitos técnicos
- Utilizar HTML semántico: header, main, form y footer cuando
  corresponda.
- Utilizar CSS tradicional, sin frameworks.
- Escribir las funciones de JavaScript con funciones flecha.
- Utilizar condicionales if para las validaciones.
- Separar la estructura, los estilos y la lógica en sus respectivos
  archivos.
- Vincular style.css y script.js correctamente desde index.html.
- Mantener nombres de variables claros y descriptivos.
9. Accesibilidad y experiencia de usuario
- Todos los campos deben tener etiquetas visibles.
- Los botones deben tener textos claros.
- Los campos obligatorios deben indicarse de manera comprensible.
- Los errores no deben comunicarse solamente mediante colores.
- El formulario debe poder utilizarse con teclado.
- Los textos deben tener buen contraste y un tamaño legible.
10. Criterios para considerar terminado el proyecto
- [ ] El formulario se visualiza correctamente en computadora y
  celular.
- [ ] Todos los campos muestran su etiqueta.
- [ ] Se detectan los campos vacíos.
- [ ] Se valida el formato del correo.
- [ ] Se comprueba que ambos correos coincidan.
- [ ] Los mensajes de error son claros.
- [ ] Un registro válido permite acceder a la página de bienvenida.
- [ ] El botón de regreso vuelve al formulario.
- [ ] No se guardan contraseñas ni datos sensibles en localStorage.
