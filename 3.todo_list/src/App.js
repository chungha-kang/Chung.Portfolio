import './App.css';
import {useState} from 'react';

function Header(props) {
  return <header>
    <p>{Date}(Date)</p>
    <h2><a href='/'>{props.title}</a></h2>
  </header>
}

// TODO LIST CREATE(할일 추가)
function Create(props) {
  return <form onSubmit={event=>{
    console.log(props);
    const todo = event.target.todo.value;

  }}>
  </form>
}
function Input() {
  return <>
    <input type="text" value="할 일을 입력하세요" />
    <input type="button" value="+" />
  </>
}

// TODO LIST(할일 리스트)
function List(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<>
      <li key={t.id}>
        <input type="checkbox" />
        <a id={t.id} href="/" onClick={(event)=> {
          event.preventDefault();
          props.onChangeMode(Number(event.target.id));
        }}>{t.todo}</a>
        <input type="checkbox" value="⭐️" />
        <input type="button" value="-" />
      </li>
      <li key={t.detail}>
        {props.content}
      </li>
    </>)
  }
  return <ul>
    {lis}
  </ul>
}
function Todo(props) {
  return <article>
    <h2>{props.todo}</h2>
    {props.detail}
  </article>
}

function App() {
  const [mode, setMode] = useState('NON');
  const [id, setId] = useState(null);
  // const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, todo: '할일1', detail: '자세한 내용1', check: 'true', import: 'true'},
    {id:2, todo: '할일2', detail: '자세한 내용2', check: 'true', import: 'false'},
    {id:3, todo: '할일3', detail: '자세한 내용3', check: 'false', import: 'false'},
  ]);
  // TodoList READ (할일 자세히 보기)
  let content = null;
  if (mode === 'NON') {
  // } else if(mode === 'DETAIL') {
  } else if(mode === 'DETAIL' && id !== null) {
    let todo, detail = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        todo = topics[i].todo;
        detail = topics[i].detail;
      }
    }
    content = <Todo todo={todo} detail={detail}></Todo>
  }
  // TodoList CREATE (할일 추가)
  return (
    <div className="list-wrap">
      <div className="list">
        <Header title="TODO LIST"></Header>
        <Input></Input>
        {/* text-decoration-line: line-through 만들기 */}
        <List topics={topics} content={content} onChangeMode={(clickedId)=> {
          if (mode === 'NON' || id != clickedId) {
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
