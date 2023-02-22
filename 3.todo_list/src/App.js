import './App.css';
import {useState} from 'react';

function Header(props) {
  console.log('props', props)
  return <header>
    <p>Date</p>
    <h2>TODO LIST</h2>
  </header>
}
function Input() {
  return <>
    <input type="text" value="할 일을 입력하세요" />
    <input type="button" value="+" />
  </>
}
function List() {
  return <ul>
    <li><input type="checkbox" /><span>할일1</span><input type="checkbox" value="⭐️"/><input type="button" value="-"></input></li>
    <li><input type="checkbox" /><span>할일2</span><input type="checkbox" value="⭐️"/><input type="button" value="-"></input></li>
    <li><input type="checkbox" /><span>할일3</span><input type="checkbox" value="⭐️"/><input type="button" value="-"></input></li>
  </ul>
}
function Create() {
  return <form onSubmit={event=>{
    const todo = event.target.todo.value;

  }}>

  </form>
}

function App() {
  const [mode, setMode] = useState('CREATE');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, todo: '할일1', import: 'Y'},
    {id:2, todo: '할일2', import: 'N'},
    {id:3, todo: '할일3', import: 'N'},
  ]);
  
  let content = null;

  // TodoList(할일)추가 (CREATE)
  if (mode === 'CREATE') {
    content = <Create onCreate={(_todo, _import)=>{

    }}></Create>
  }
  return (
    <div className="list-wrap">
      <div className="list">
        <Header value="d"></Header>
        <Input></Input>
        <List></List>
      </div>
    </div>
  );
}

export default App;
