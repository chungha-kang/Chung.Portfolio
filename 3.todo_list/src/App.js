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
    <form onSubmit={event=> {
      event.preventDefault();
      const todo = event.target.todo.value;
      props.onCreate(todo);
    }}>
      <input type="text" name="todo" placeholder="할 일을 입력하세요" />
      <a href="/create" onClick={event=> {
        // setMode('CREATE');
        }}>
        <input type="submit" value="+" />
      </a>
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
    const isClicked = t.click == 'true';

    return (
      <li key={t.id}>
      <input type="checkbox" />
        <a href="/" isClicked={isClicked} onClick={(event) => handleClick(event, t.id)}>{t.todo}</a>
        <input type="checkbox" value="⭐️" />
        <input type="button" value="-" />
        {t.id === selectedItemId && 
          <p><input type="text" value={t.detail} /></p>
        }
      </li>
    )
  })
  return <ul>{lis}</ul>;
}

function App() {
  const [mode, setMode] = useState('NON');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, todo: '할일1', detail: '자세한 내용1', check: 'true', import: 'true'},
    {id:2, todo: '할일2', detail: '자세한 내용2', check: 'true', import: 'false'},
    {id:3, todo: '할일3', detail: '자세한 내용3', check: 'false', import: 'false'},
  ]);
  // TodoList READ (할일 자세히 보기)
  let content = null;
  if (mode === 'DETAIL' && id !== null) {
    let todo, detail = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        todo = topics[i].todo;
        detail = topics[i].detail;
      }
    }
    content = <article>{detail}</article>
    // TodoList CREATE (할일 추가)
  } else if(mode === 'CREATE') {
    content = <Create onCreate={(_todo)=> {
      const newTopic = {id: nextId, todo: _todo}
      topics.push(newTopic);
      setTopics(topics);
    }}></Create>
  }
  

  return (
    <div className="list-wrap">
      <div className="list">
        <Header title="TODO LIST"></Header>
        <Create></Create>
        {/* text-decoration-line: line-through 만들기 */}
        {/* READ */}
        <List topics={topics} content={content} onChangeMode={(clickedId)=> {
          if (mode === 'NON' || id != clickedId) {
            setMode('DETAIL');
            setId(clickedId);
          } else {
            setMode('NON');
            setId(null);
          }
        }}></List>
        {/* //READ */}
        {content}
      </div>
    </div>
  );
}

export default App;