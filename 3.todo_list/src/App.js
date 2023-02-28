import './App.css';
import {useState} from 'react';

function Header(props) {
  return <header>
    <p>(Date)</p>
    <h2><a href='/'>{props.title}</a></h2>
  </header>
}

// TODO LIST CREATE(할일 추가)
function Create(props) {
  return <>
   <form onSubmit={event=>{
      event.preventDefault();
      const todo = event.target.todo.value;
      props.onCreate(todo);
      event.target.todo.value = "";
    }}>
      <input type="text" name='todo' placeholder='할 일을 입력하세요' />
      <input type="submit" value="+"></input>
    </form>
  </>
}

// TODO LIST(할일 리스트)
function List(props) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  const handleClick = (event, itemId) => {
    event.preventDefault();
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  }

  const lis = props.topics.map((t) => {
    const isClicked = t.click === 'true';

    return (
      <li key={t.id}>
        <input type="checkbox" />
        <a href="/" isClicked={isClicked} onClick={(event) => handleClick(event, t.id)}>{t.todo}</a>
        <input type="checkbox" value="⭐️" />
        {/* 업데이트(수정) 기능 보류..) */}
        {/* <input type="button" value="수정" onClick={(event) => handleClick(event, t.id)} /> */}
        <input type="button" value="-" />
        {t.id === selectedItemId && <>
          <p><input type="text" value={t.detail} /></p>
          </>}
      </li>
    )
  })
  return <ul>{lis}</ul>;
}
/*
// 업데이트(수정) 기능 보류..
function Update(props) {
  const [todo, setTodo] = useState(props.todo);
  const [detail, setDetail] = useState(props.detail);
  return <>
  <h2>수정</h2>
   <form onSubmit={event=>{
      event.preventDefault();
      const todo = event.target.todo.value;
      const detail = event.target.detail.value;
      props.onUpdate(todo, detail);
    }}>
      <p><input type="text" name='todo' placeholder='할 일을 입력하세요' value={todo} onChange={event=> {
        setTodo(event.target.value);
      }}/></p>
      <p><input type="text" name='detail' placeholder='자세한 내용을 입력하세요' value={detail} onChange={event=> {
        setDetail(event.target.value);
      }}/></p>
      <input type="submit" value="저장"></input>
    </form>
  </>
}
*/

function App() {
  const [mode, setMode] = useState('UPDATE');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, todo: '할일1', detail: '자세한 내용1', isDone: true, isImport: true},
    {id:2, todo: '할일2', detail: '자세한 내용2', isDone: true, isImport: false},
    {id:3, todo: '할일3', detail: '자세한 내용3', isDone: false, isImport: false}
  ]);
  // TodoList READ (할일 자세히 보기)
  let content = null;
  let contextControl = null;
  if (mode === 'DETAIL' && id !== null) {
    let todo, detail = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        todo = topics[i].todo;
        detail = topics[i].detail;
      }
    }
    content = <article>{detail}</article>
    contextControl = <button onClick={event => {
      event.preventDefault();
      setMode('UPDATE');
    }}>수정</button>
    // <a href={'/update/'+id} onClick={event=> {
    //   event.preventDefault();
    //   setMode('UPDATE');
    // }}>Update</a>
    // TodoList CREATE (할일 추가)
  } else if(mode === 'CREATE') {  // CREATE 일 때
    content = <Create onCreate={(todo)=>{
      const newTopic = {id: nextId, todo: todo}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
    /* 
    // 업데이트(수정) 기능...보류
  } else if(mode === 'UPDATE') {
    let todo, detail = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        todo = topics[i].todo;
        detail = topics[i].detail;
      }
    }
    content = <Update todo={todo} detail={detail} onUpdate={(todo, detail)=> {
      const newTopics = [...topics]
      const updateTopic = {id: id, todo: todo, detail: detail}
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updateTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('DETAIL');
    }}></Update>
    */
  }
  
  return (
    <div className="list-wrap">
      <div className="list">
        <Header title="TODO LIST"></Header>
        <Create onCreate={(todo)=>{
          const newTopic = {id: nextId, todo: todo}
          const newTopics = [...topics]
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode('READ');
          setId(nextId);
          setNextId(nextId+1);
        }}></Create>
        {/* text-decoration-line: line-through 만들기 */}
        {/* READ */}
        <List topics={topics} content={content} onChangeMode={(clickedId)=> {
          if (mode === 'NON' || id !== clickedId) {
            setMode('DETAIL');
            setId(clickedId);
          } else {
            setMode('NON');
            setId(null);
          }
        }}></List>
        {content}
      </div>
    </div>
  );
}

export default App;