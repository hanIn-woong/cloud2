import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import api from './api'
import './App.css'
import './Board.css'

// Mock Data (To be replaced in Step 4)
const initialPosts = [
  { id: 1, title: '첫 번째 게시글', author: '관리자', createdAt: '2024-05-20T10:00:00', content: '안녕하세요. 첫 번째 게시글입니다.' },
  { id: 2, title: 'React + Spring Boot 연동', author: '개발자', createdAt: '2024-05-21T14:30:00', content: '연동이 아주 잘 되네요!' },
]

function PostList() {
  const [posts, setPosts] = useState(initialPosts)
  const [connectionStatus, setConnectionStatus] = useState('Checking backend...')
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/test')
      .then(res => {
        setConnectionStatus(res.data.message)
      })
      .catch(err => {
        setConnectionStatus('Backend connection failed')
        console.error('Connection error:', err)
      })
  }, [])

  return (
    <div className="board-container">
      <div className="board-header">
        <div>
          <h1>게시판 목록</h1>
          <p style={{ color: connectionStatus === 'Backend connection is working!' ? 'green' : 'red', fontSize: '0.8rem' }}>
            {connectionStatus}
          </p>
        </div>
        <Link to="/write" className="btn btn-primary">글쓰기</Link>
      </div>
      <table className="board-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = initialPosts.find(p => p.id === parseInt(id))

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>

  return (
    <div className="board-container">
      <div className="post-detail">
        <h1>{post.title}</h1>
        <div className="post-meta">
          작성자: {post.author} | 작성일: {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="post-content">{post.content}</div>
        <div className="actions">
          <button onClick={() => navigate('/')} className="btn btn-secondary">목록으로</button>
          <button onClick={() => navigate(`/edit/${id}`)} className="btn btn-primary">수정</button>
          <button className="btn btn-danger">삭제</button>
        </div>
      </div>
    </div>
  )
}

function PostForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    password: ''
  })

  useEffect(() => {
    if (isEdit) {
      const post = initialPosts.find(p => p.id === parseInt(id))
      if (post) {
        setFormData({
          title: post.title,
          author: post.author,
          content: post.content,
          password: ''
        })
      }
    }
  }, [id, isEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(isEdit ? '수정되었습니다. (Mock)' : '저장되었습니다. (Mock)')
    navigate('/')
  }

  return (
    <div className="board-container">
      <h1>{isEdit ? '게시글 수정' : '게시글 작성'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input 
            type="text" 
            className="form-control" 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required 
          />
        </div>
        <div className="form-group">
          <label>작성자</label>
          <input 
            type="text" 
            className="form-control" 
            value={formData.author}
            onChange={e => setFormData({...formData, author: e.target.value})}
            disabled={isEdit}
            required 
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea 
            className="form-control" 
            rows="10"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input 
            type="password" 
            className="form-control" 
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            placeholder="수정/삭제 시 필요합니다"
            required 
          />
        </div>
        <div className="actions">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">취소</button>
          <button type="submit" className="btn btn-primary">{isEdit ? '수정완료' : '저장하기'}</button>
        </div>
      </form>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '20px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
          <Link to="/" style={{ color: 'var(--accent)', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem' }}>
            My Board
          </Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/write" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
