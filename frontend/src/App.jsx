import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import api from './api'
import './App.css'
import './Board.css'

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await api.get('/posts')
      setPosts(res.data)
    } catch (err) {
      console.error('Failed to fetch posts:', err)
      alert('게시글 목록을 불러오는 데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>게시판 목록</h1>
        <Link to="/write" className="btn btn-primary">글쓰기</Link>
      </div>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
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
            {posts.length > 0 ? (
              posts.map(post => (
                <tr key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>게시글이 없습니다. 첫 글을 작성해보세요!</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`)
        setPost(res.data)
      } catch (err) {
        console.error('Failed to fetch post:', err)
        alert('게시글을 불러올 수 없습니다.')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id, navigate])

  const handleDelete = async () => {
    const password = prompt('삭제를 위해 비밀번호를 입력해주세요.')
    if (!password) return

    try {
      await api.delete(`/posts/${id}`, { params: { password } })
      alert('게시글이 삭제되었습니다.')
      navigate('/')
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert('비밀번호가 일치하지 않습니다.')
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    }
  }

  if (loading) return <div className="board-container">로딩 중...</div>
  if (!post) return <div className="board-container">게시글을 찾을 수 없습니다.</div>

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
          <button onClick={handleDelete} className="btn btn-danger">삭제</button>
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
      const fetchPost = async () => {
        try {
          const res = await api.get(`/posts/${id}`)
          setFormData({
            title: res.data.title,
            author: res.data.author,
            content: res.data.content,
            password: ''
          })
        } catch (err) {
          console.error('Failed to fetch post for edit:', err)
        }
      }
      fetchPost()
    }
  }, [id, isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await api.put(`/posts/${id}`, formData)
        alert('수정되었습니다.')
      } else {
        await api.post('/posts', formData)
        alert('저장되었습니다.')
      }
      navigate('/')
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert('비밀번호가 일치하지 않습니다.')
      } else {
        alert('처리 중 오류가 발생했습니다.')
      }
    }
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
