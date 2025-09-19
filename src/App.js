import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { api } from "./api";
function App() {

    const [hello, setHello] = useState("");
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [helloMsg, list] = await Promise.all([api.hello(), api.listTodos()]);
        setHello(typeof helloMsg === "string" ? helloMsg : (helloMsg.message ?? JSON.stringify(helloMsg)));
        setTodos(Array.isArray(list) ? list : []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
    }, []);
    const onAdd = async (e) => {
        e.preventDefault();
        if(!title.trim()) return;
        try{
            const created = await api.createTodo(title.trim());
            setTodos((prev) => [created, ...prev]);
            setTitle("");
        }
        catch(e){
            setErr(e.message);
        }
    }
   const onToggle = async (id) => {
     setTodos((prev) =>
       prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
     ); // ← ) 닫고 ; 추가

     try {
       await api.toggleTodo(id);
     } catch (e) {
       setErr(e.message);
       // 실패 시 되돌리기
       setTodos((prev) =>
         prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
       );
     }
   };
   const onDelete = async (id) => {
      const snapshot = todos;
      setTodos((prev) => prev.filter((t) => t.id !== id));

      try {
        await api.deleteTodo(id);
      } catch (e) {
        setErr(e.message);
        setTodos(snapshot); // 되돌리기
      }
    };


    return (
    <div style={{ maxWidth: 560, margin: "40px auto", padding: 16 }}>
         <h1>React ↔ Spring Boot</h1>
         <p style={{ color: "#666" }}>서버 인사말: {hello || "..."}</p>

         <form onSubmit={onAdd} style={{ display: "flex", gap: 8, margin: "16px 0" }}>
           <input
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder="할 일을 입력하세요"
             style={{ flex: 1, padding: 8 }}
           />
           <button type="submit">추가</button>
         </form>

         {err && (
           <div style={{ background: "#ffecec", color: "#b00", padding: 8, marginBottom: 12 }}>
             에러: {err}
           </div>
         )}

         {loading ? (
           <div>불러오는 중...</div>
         ) : todos.length === 0 ? (
           <div>할 일이 없습니다. 첫 항목을 추가해보세요!</div>
         ) : (
           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
             {todos.map((t) => (
               <li
                 key={t.id}
                 style={{
                   display: "flex",
                   alignItems: "center",
                   gap: 8,
                   padding: "8px 0",
                   borderBottom: "1px solid #eee",
                 }}
               >
                 <input
                   type="checkbox"
                   checked={!!t.completed}
                   onChange={() => onToggle(t.id)}
                 />
                 <span style={{ flex: 1, textDecoration: t.completed ? "line-through" : "none" }}>
                   {t.title}
                 </span>
                 <button onClick={() => onDelete(t.id)}>삭제</button>
               </li>
             ))}
           </ul>
         )}
       </div>
    );
}

export default App;
