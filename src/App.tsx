import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Results from './pages/Results';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import CourseDetail from './pages/CourseDetail';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCourses from './pages/admin/Courses';
import AdminLessons from './pages/admin/Lessons';
import AdminResults from './pages/admin/Results';
import AdminTestimonials from './pages/admin/Testimonials';
import AdminEnquiries from './pages/admin/Enquiries';
import AdminSettings from './pages/admin/Settings';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/results" element={<Results />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      <Route path="/admin/lessons" element={<AdminLessons />} />
      <Route path="/admin/results" element={<AdminResults />} />
      <Route path="/admin/testimonials" element={<AdminTestimonials />} />
      <Route path="/admin/enquiries" element={<AdminEnquiries />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  );
}

export default App;
