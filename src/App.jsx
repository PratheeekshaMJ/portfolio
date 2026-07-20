import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectCategoryPage from './pages/ProjectCategoryPage';
import IrisPage from './pages/IrisPage';
import CarsPage from './pages/CarsPage';
import SepsisPage from './pages/SepsisPage';
import SuperstorePage from './pages/SuperstorePage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/iris" element={<IrisPage />} />
        <Route path="/projects/cars" element={<CarsPage />} />
        <Route path="/projects/sepsis" element={<SepsisPage />} />
        <Route path="/projects/superstore" element={<SuperstorePage />} />
        <Route path="/projects/:categoryId" element={<ProjectCategoryPage />} />
        <Route path="/projects" element={<Navigate to="/projects/iris" replace />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
