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
  const [selectedItem, setSelectedItem] = useState([]);

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
  const lis = props.topics.map((t) => {
    const isUpdateActive = isClickedUpdate === t.id;  // Update 버튼 표시 및 감출때 사용 (true => 표시 / false => 감추기) => 버튼 클릭시 수정 버튼이 수정 사항 있을 경우 수정, 없을 경우 뒤로돌아가기(취소)에 사용
    return (
      <li key={t.id}>
        <input type="checkbox" 
          checked={selectedItem.includes(t.id)}
          onChange={() => {
            setSelectedItem(prev => {
              if(prev.includes(t.id)) {
                return prev.filter(id => id !== t.id);
              } else {
                return [...prev, t.id];
              }
            })
          }}
        />
        <a href="/" 
        style={{
          textDecoration: selectedItem.includes(t.id) ? 'line-through' : 'none'
        }}
        onClick={(event) => {
          event.preventDefault();
          setIsClickedRead(prev => prev === t.id ? null : t.id) // 클릭 할때마다 상태 변경하기
          setIsClickedUpdate(null);
        }}>{t.todo}</a>
        <input type="checkbox" value="⭐️" />
        <input 
          type="button" value={isUpdateActive ? "취소" : "수정"}
          onClick={() => {
          setIsClickedUpdate(prev => prev === t.id ? null : t.id)
          setIsClickedRead(null);
        }} />
        <input type="button" value="Delete" onClick={()=> handleDelete(t.id)}/>
        {isClickedRead === t.id && (
          <p><input type="text" value={t.detail} /></p>
        )}
        {isUpdateActive && (
          <Update todo={t.todo} detail={t.detail} 
            onUpdate={(todo, detail) => handleUpdate(t.id, todo, detail)}
          ></Update>
        )}
      </li>
    );
  });
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
