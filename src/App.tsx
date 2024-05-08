import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [updateState, setUpdateState] = useState('')

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  const handleChangeTodo = (e: string) => {
    setUpdateState(e)
  }

  function updateTodo(id: string) {
    const update = {
      id: id,
      content: updateState
    }
    client.models.Todo.update(update)
  }
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
        
    <Authenticator>
      {({ signOut }) => (
        <main>
          <h1>My todos: Dev branch</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input onChange={(e) => handleChangeTodo(e.target.value)} defaultValue={todo.content || ""}/>
                <button onClick={() => deleteTodo(todo.id)}>Remove</button>
                <button onClick={() => updateTodo(todo.id)}>Update</button>
              </li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://next-release-dev.d1ywzrxfkb9wgg.amplifyapp.com/react/start/quickstart/vite-react-app/#step-2-add-delete-to-do-functionality">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
