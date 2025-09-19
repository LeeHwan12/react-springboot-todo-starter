const BASE = process.env.REACT_APP_API_BASE_URL || ""; // 배포 시 전환용

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${txt}`);
  }
  // DELETE/PATCH void 대응
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text().catch(() => "");
}

export const api = {
  hello: () => request("/api/hello"),
  listTodos: () => request("/api/todos"),
  createTodo: (title) =>
    request("/api/todos", { method: "POST", body: JSON.stringify({ title }) }),
  toggleTodo: (id) => request(`/api/todos/${id}/toggle`, { method: "PATCH" }),
  deleteTodo: (id) => request(`/api/todos/${id}`, { method: "DELETE" }),
};
