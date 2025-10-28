import './App.css'
import Teacher from './components/Teacher'
import TeacherDashboard from "./components/TeacherDashboard"
import Student from './components/Student'
import {Route,Routes} from "react-router-dom"
import StudentDashboard from './components/StudentDashboard'
import Results from './components/Results'

function App() {  
  return (
    <Routes>
      <Route path='/teacher' element={<Teacher/>}></Route>
      <Route path='/student' element={<Student/>}></Route>
      <Route path='/teacherDashboard' element={<TeacherDashboard/>}></Route>
      <Route path='/studentDashboard' element={<StudentDashboard/>}></Route>
      <Route path='/results' element={<Results/>}></Route>
      
      </Routes>
  
  )
}

export default App
