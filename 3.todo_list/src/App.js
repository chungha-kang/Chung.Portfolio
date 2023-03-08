import {useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import '@fortawesome/fontawesome-free/css/all.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons';
import {faTrashCan} from '@fortawesome/free-regular-svg-icons';
import './App.css';

function Header() {
  const date = new Date();
  
  function getShortMonthName(month) {
    const shorthMonths = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    return shorthMonths[month];
  }
  function getShortDayName(day) {
    const shorthDays = [
      "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"
    ];
    return shorthDays[day];
  }

  return (
    <header>
      <h2><a href='/'>Todo List</a></h2>
      <div className='date'>
        <div className='day'>
          <p>{date.getDate()}</p>
          <p>{getShortDayName(date.getDay())}</p>
        </div>
        <div className='year'>
          <p>{getShortMonthName(date.getMonth())}</p>
          <p>{date.getFullYear()}</p>
        </div>
      </div>
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
      <input className="inputUnderLine" type="text" name='todo' placeholder='할 일을 입력하세요' />
      <input className="inputBtn btn" type="submit" value="+"></input>
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
  
  const handleIsDoneClick = (t) => {
    const newTopics = props.topics.map((topic) => {
      if (topic.id === t.id){
        return {...topic, isDone: !topic.isDone};
      } else {
        return topic;
      }
    });
    props.onUpdate(newTopics);
  }

  const handleImportClick = (t) => {
    const newTopics = props.topics.map((topic) => {
      if (topic.id === t.id){
        return {...topic, isImport: !topic.isImport};
      } else {
        return topic;
      }
    });
    props.onUpdate(newTopics);
  };

  

  // List
  const lis = props.topics.map((t) => {
    const isUpdateActive = isClickedUpdate === t.id;  // Update 버튼 표시 및 감출때 사용 (true => 표시 / false => 감추기) => 버튼 클릭시 수정 버튼이 수정 사항 있을 경우 수정, 없을 경우 뒤로돌아가기(취소)에 사용
    return (
      <li key={t.id}>
        <input type="checkbox" className='inputCB'
          checked={t.isDone}
          onChange={() => handleIsDoneClick(t)}
        />
        <TextareaAutosize
          minRows={1}
          maxRows={10}
          defaultValue={'Textarea with auto height'} 
          style={{textDecoration: t.isDone ? 'line-through' : 'none'}}
          className="todoList" type="text" value={t.todo} 
          onClick={(event) => {
            event.preventDefault();
            setIsClickedRead(prev => prev === t.id ? null : t.id) // 클릭 할때마다 상태 변경하기
            setIsClickedUpdate(null);
          }}
        />
        <button type="checkbox" className="checkbox btn"
          onClick={() => handleImportClick(t)}>
          <FontAwesomeIcon icon={t.isImport ? solidStar : regularStar} />
        </button>
        <button type="button btn" className="liBtn btn" 
          onClick={() => {
          setIsClickedUpdate(prev => prev === t.id ? null : t.id)
          setIsClickedRead(null);}}>
            <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button type="button" className="liBtn btn" onClick={()=> handleDelete(t.id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        {isClickedRead === t.id && (
          <p><textarea className="read" type="text" value={t.detail} 
            style={{textDecoration: t.isDone ? 'line-through' : 'none'}}/>
          </p>
        )}
        {isUpdateActive && (
          <Update todo={t.todo} detail={t.detail} 
            onUpdate={(todo, detail) => handleUpdate(t.id, todo, detail)}
          ></Update>
        )}
        <hr/>
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
      <input className="editBtn btn" type="submit" value="수정"></input>
    </form>
  </>
}

function App() {
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, todo: '자바스크립트 공부하기', detail: 'Deep Dive 정독', isDone: true, isImport: true},
    {id:2, todo: '리액트 공부하기', detail: '자세한 내용2', isDone: true, isImport: false},
    {id:3, todo: '할일3', detail: '자세한 내용3', isDone: false, isImport: false}
  ]);
  return (
    <div className="list-wrap">
      <div className="list">
        <Header></Header>
        <Create onCreate={(todo) => {
          const newTopic = {id: nextId, todo: todo, detail: '수정 버튼을 눌러 내용을 입력할 수 있습니다'};
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
