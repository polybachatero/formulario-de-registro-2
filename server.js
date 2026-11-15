const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const port = Number(process.env.PORT) || 3000;
const maxRequestSize = 8192;
const staticFiles = {
  "/": { name: "index.html", type: "text/html; charset=utf-8" },
  "/index.html": { name: "index.html", type: "text/html; charset=utf-8" },
  "/bienvenida.html": { name: "bienvenida.html", type: "text/html; charset=utf-8" },
  "/style.css": { name: "style.css", type: "text/css; charset=utf-8" },
  "/script.js": { name: "script.js", type: "text/javascript; charset=utf-8" }
};

const sendJson = (response, statusCode, data) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(data));
};

const readJsonBody = async (request) => {
  const chunks = [];
  let totalSize = 0;

  for await (const chunk of request) {
    totalSize += chunk.length;

    if (totalSize > maxRequestSize) {
      const error = new Error("El cuerpo de la solicitud es demasiado grande.");
      error.statusCode = 413;
      throw error;
    }

    chunks.push(chunk);
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
};

const handleRegistration = async (request, response) => {
  const contentType = request.headers["content-type"] || "";

  if (!contentType.includes("application/json")) {
    sendJson(response, 415, { ok: false, message: "Se requiere contenido JSON." });
    return;
  }

  let data;

  try {
    data = await readJsonBody(request);
  } catch (error) {
    if (error.statusCode === 413) {
      sendJson(response, 413, { ok: false, message: error.message });
      return;
    }

    sendJson(response, 400, { ok: false, message: "El cuerpo JSON no es válido." });
    return;
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    sendJson(response, 400, { ok: false, message: "Se esperaba un objeto JSON." });
    return;
  }

  const emailRegistrado = typeof data.emailRegistrado === "string" ? data.emailRegistrado.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRegistrado)) {
    sendJson(response, 400, { ok: false, message: "El correo electrónico no es válido." });
    return;
  }

  sendJson(response, 201, { ok: true, message: "Registro recibido correctamente." });
};

const handleRequest = async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;

  if (pathname === "/api/registro") {
    if (request.method !== "POST") {
      response.setHeader("Allow", "POST");
      sendJson(response, 405, { ok: false, message: "Método no permitido." });
      return;
    }

    await handleRegistration(request, response);
    return;
  }

  if (request.method !== "GET") {
    sendJson(response, 405, { ok: false, message: "Método no permitido." });
    return;
  }

  const file = staticFiles[pathname];

  if (!file) {
    sendJson(response, 404, { ok: false, message: "Recurso no encontrado." });
    return;
  }

  try {
    const content = await fs.readFile(path.join(__dirname, file.name));
    response.writeHead(200, {
      "Content-Type": file.type,
      "X-Content-Type-Options": "nosniff"
    });
    response.end(content);
  } catch (error) {
    console.error("No se pudo servir el archivo solicitado.", error);
    sendJson(response, 500, { ok: false, message: "No se pudo servir el recurso." });
  }
};

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error("Error inesperado en el servidor.", error);

    if (!response.headersSent) {
      sendJson(response, 500, { ok: false, message: "Error interno del servidor." });
      return;
    }

    response.destroy(error);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Servidor disponible en http://127.0.0.1:${port}`);
});
