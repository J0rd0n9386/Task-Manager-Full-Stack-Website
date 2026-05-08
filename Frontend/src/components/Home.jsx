import React from 'react';
import '../App.css' 
import {useNavigate} from "react-router-dom";
import RegisterUser from './UserComponents/registerUser';

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="home-container">
      <div className="hero-card">
        <div className="badge">
          <span className="badge-dot"></span>
          Premium Productivity Suite
        </div>

        <h1 className="hero-heading">
          Welcome to <span className="gradient-text">TaskFlow Pro</span>
        </h1>

        <p className="hero-description">
          Organize your daily work with <strong>unmatched efficiency</strong> using TaskFlow Pro — 
          a <span className="highlight">modern productivity powerhouse</span> meticulously crafted to 
          help you <strong>create, track, update, and complete tasks</strong> with absolute ease.
          <br /><br />
          ✦ <strong>Smart priority management</strong> that adapts to your workflow<br />
          ✦ <strong>Deadline-aware scheduling</strong> with intelligent reminders<br />
          ✦ <strong>Real-time progress tracking</strong> across all your projects<br />
          ✦ <strong>Seamless collaboration</strong> for teams of any size<br /><br />
          All wrapped in a <span className="highlight">clean, distraction-free interface</span> that feels 
          like second nature. Stay focused, <strong>amplify your productivity</strong>, and never let 
          an important task slip through the cracks again.
        </p>

        <div className="feature-pills">
          <span className="feature-pill"><span className="pill-icon">📋</span> Smart Lists</span>
          <span className="feature-pill"><span className="pill-icon">⏰</span> Deadline Alerts</span>
          <span className="feature-pill"><span className="pill-icon">📊</span> Progress Analytics</span>
          <span className="feature-pill"><span className="pill-icon">👥</span> Team Sync</span>
          <span className="feature-pill"><span className="pill-icon">🔒</span> End-to-End Encrypted</span>
          <span className="feature-pill"><span className="pill-icon">🌙</span> Dark Mode Native</span>
        </div>

        <div className="cta-group">
          <button className="btn btn-primary" onClick={() => navigate('/registerUser')}>
            <span>🚀</span> Get Started Free
          </button>
          <button className="btn btn-secondary" onClick={() => alert('📺 Watch demo')}>
            <span>▶</span> Watch Demo
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-item"><div className="stat-value">50K+</div><div className="stat-label">Active Users</div></div>
          <div className="stat-item"><div className="stat-value">2M+</div><div className="stat-label">Tasks Completed</div></div>
          <div className="stat-item"><div className="stat-value">4.9 ★</div><div className="stat-label">User Rating</div></div>
          <div className="stat-item"><div className="stat-value">99.9%</div><div className="stat-label">Uptime SLA</div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;