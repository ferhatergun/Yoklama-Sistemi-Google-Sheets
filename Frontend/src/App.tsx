import axios from 'axios'

function App() {

  const addTable = async () => {
    const data ={
      "studentNumber": 126,
    }
    const res = await axios.post(`http://localhost:5000/user/attendance`,data)
    console.log(res.data)
  }

  return (
    <div className=''>
      <button className='w-32 bg-red-300' onClick={addTable}>Ekle</button>
      zort
    </div>
  )
}

export default App