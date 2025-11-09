
import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Home from './pages/Home';
import ExerciseCreate from './pages/ExerciseCreate';
import ExerciseList from './pages/ExerciseList';
import ExerciseDetails from './pages/ExerciseDetails';
import { Link } from 'react-router';
import AnsweredExercises from './pages/AnsweredExercises';

function App() {

  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/exercises" className="hover:underline">All Exercises</Link>
        <Link to="/create" className="hover:underline">Create Exercise</Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExerciseList />} />
          <Route path="/create" element={<ExerciseCreate />} />
          <Route path="/exercise/:id" element={<ExerciseDetails />} />
          <Route path="/answered-exercises/:exerciseId" element={<AnsweredExercises />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
