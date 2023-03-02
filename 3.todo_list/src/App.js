import React from 'react';
import {useState} from 'react';
import './App.css';

function Header() {
  return (
    <header>
      <p>Date</p>
      <h2><a href='/'>Todo List</a></h2>
    </header>
  );
}

function Create(props) {
  return (
    <form className='create' onSubmit={event=> {
      event.preventDefault();
      const todo = event.target.todo.value;
      props.onCreate(todo);
      event.target.todo.value = "";
    }}>
      <input type="text" name='todo' placeholder='Todo input' />
      <input type="submit" value="Create"></input>
    </form>
  );
}

function List(props) {
  const [isClickedRead, setIsClickedRead] = useState(null);
  const [isClickedUpdate, setIsClickedUpdate] = useState(null);

  // Update 컴포넌트에서 onUpdate 함수 호출시 실행 되는 함수
  const handleUpdate = (id, todo, detail) => {
    const newTopics = props.topics.map(topic => {
      if(topic.id === id) {
        return {...topic, todo, detail};
      } else {
        return  topic;
      }
    });
    props.onUpdate(newTopics);
    setIsClickedUpdate(null);
  }

  // DELETE 관련 함수
  const handleDelete = (id) => {
    const newTopics = props.topics.filter(topic => topic.id !== id);
    props.onDelete(newTopics);
  }
  
  // List
  const lis = props.topics.map((t) => (
    <li key={t.id}>
      <input type="checkbox" />
      <a href="/" onClick={(event) => {
        event.preventDefault();
        setIsClickedRead(prev => prev === t.id ? null : t.id) // 수정
      }}>{t.todo}</a>
      <input type="checkbox" value="⭐️" />
      <input type="button" value="modify(Update)" onClick={() => setIsClickedUpdate(prev => prev === t.id ? null : t.id)}/>
      <input type="button" value="Delete" onClick={()=> handleDelete(t.id)}/>
      {isClickedRead === t.id && (
        <p><input type="text" value={t.detail} /></p>
      )}
      {isClickedUpdate === t.id && (
        <Update todo={t.todo} detail={t.detail} 
          onUpdate={(todo, detail) => handleUpdate(t.id, todo, detail)}
          setIsClickedUpdate={setIsClickedUpdate}
        ></Update>
      )}
    </li>
  ));
  return <ul>{lis}</ul>;
}
// UPDATE 관련 함수
function Update(props) {
  const [todo, setTodo] = useState(props.todo);
  const [detail, setDetail] = useState(props.detail);
  return <>
    <form onSubmit={event=>{
      event.preventDefault();
      const todo = event.target.todo.value;
      const detail = event.target.detail.value;
      props.onUpdate(todo, detail);
      setTodo(props.todo);
      setDetail(props.detail);
      props.setIsClickedUpdate(null);
    }}>
      <p><input type="text" name='todo' value={todo} onChange={event=> {
        setTodo(event.target.value);
      }}/></p>
      <p><input type="text" name='detail' value={detail} onChange={event=> {
        setDetail(event.target.value);
      }}/></p>
      <input type="submit" value="저장"></input>
    </form>
  </>
}

function App() {
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, todo: '할일1', detail: '자세한 내용1', isDone: true, isImport: true},
    {id:2, todo: '할일2', detail: '자세한 내용2', isDone: true, isImport: false},
    {id:3, todo: '할일3', detail: '자세한 내용3', isDone: false, isImport: false}
  ]);
  return (
    <div className="list-wrap">
      <div className="list">
        <Header></Header>
        <Create onCreate={todo => {
          const newTopic = {id: nextId, todo: todo};
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setId(nextId);
          setNextId(nextId+1);
        }}></Create>
        <List 
          topics={topics} 
          onDelete={(newTopics) => setTopics(newTopics)} 
          onUpdate={(newTopics) => setTopics(newTopics)}
        ></List>
      </div>
    </div>
  );
}

export default App;
