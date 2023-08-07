import React, { useState, useEffect } from 'react';
import './App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]); //할 일
  const [newTodo, setNewTodo] = useState(''); //추가할 할 일
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 열닫 여부
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //사이드바 열닫 여부
  const [completedTodos, setCompletedTodos] = useState([]); //완료 여부(투명도조절)
  const [showWarning, setShowWarning] = useState(false); //할 일 개수 제한 경고
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false); //제한 버튼 비활성화
  const [editIndex, setEditIndex] = useState(null); // 수정할 할 일
  const [editTodo, setEditTodo] = useState(''); // 수정할 할 일 내용

  useEffect(() => {
    setShowWarning(todos.length > 5);
    setIsAddButtonDisabled(todos.length >= 6); //할 일 개수 제한 경고, 버튼 비활성화
  }, [todos]);
  const handleInputChange = (event) => {
    if (editIndex !== null) {
      setEditTodo(event.target.value); //할 일 수정
    } else {
      setNewTodo(event.target.value); //할 일 추가
    }
  };
  const handleFormSubmit = (event) => {
    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) => { //할 일 수정 후 추가
        if (index === editIndex) {
          return editTodo;
        }
        return todo;
      });
      setTodos(updatedTodos); //수정된 부분 반영
      setEditIndex(null);
      setEditTodo('');
      setIsModalOpen(false);
    } else if (newTodo.trim()) { //수정하면 업데이트 아니면 그대로 초기화하고 반환 후 모달 닫음
      setTodos([...todos, newTodo]);
      setNewTodo('');
      setIsModalOpen(false);
    }
  };
  const handleModalOpen = () => { //모달 열닫
    setIsModalOpen(true);
    setEditIndex(null);
    setEditTodo('');
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditIndex(null);
    setEditTodo('');
  };
  const handleTodoDelete = (index) => { //할 일 필터로 삭제
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setCompletedTodos(completedTodos.filter((todoIndex) => todoIndex !== index));
  };
  const handleTodoToggle = (index) => { //새로운 할 일 추가
    if (completedTodos.includes(index)) {
      setCompletedTodos(completedTodos.filter((todoIndex) => todoIndex !== index));
    } else {
      setCompletedTodos([...completedTodos, index]);
    }
  };
  const handleTodoEdit = (index) => { //수정 할 일 찾고 모달열기
    setEditIndex(index);
    setEditTodo(todos[index]);
    setIsModalOpen(true);
  };
  const handleSidebarToggle = () => { //사이드바 열닫
    setIsSidebarOpen(true);
  };
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='tong'>
      <div className='phone'>
        <header>
          <div className='one'>프사</div>
          <div className='two'>오늘의 할 일</div>
          <div className='mode' onClick={handleModalOpen}>+</div>
          <div className='mode' onClick={handleSidebarToggle}>=</div>
        </header>
        {isModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <form onSubmit={handleFormSubmit}>
                <div className='top'>{editIndex !== null ? '할 일 수정' : '오늘의 할 일 추가'}</div>
                <input
                  type="text"
                  value={editIndex !== null ? editTodo : newTodo}
                  onChange={handleInputChange}
                  placeholder="오늘의 할 일을 적으세요"
                />
                <button type="submit" disabled={isAddButtonDisabled}>{editIndex !== null ? '수정' : '추가'}</button>
                <button onClick={handleModalClose}>닫기</button>
                <div className='wt'>무언가 채워진 곳</div>
              </form>
            </div>
          </div>
        )}
        <ul>
          {todos.map((todo, index) => (
            <li key={index} className={completedTodos.includes(index) ? 'completed' : ''}>
              <input type='checkbox' onChange={() => handleTodoToggle(index)} />
              {todo}
              <button onClick={() => handleTodoEdit(index)}>수정</button>
              <button onClick={() => handleTodoDelete(index)}>삭제</button>
            </li>
          ))}
        </ul>
        {showWarning && <div className="warning">자리가 없습니다!</div>}
        </div>
      {isSidebarOpen && (
        <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <div>목록</div>
          <div className='ekerl mode' onClick={handleSidebarClose}></div>
        </div>
      )}
    </div>
  );
}

export default TodoApp;