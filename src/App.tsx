import './styles/form.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { BookingForm } from './components/BookingForm';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        {/* Skip link for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Theme toggle button */}
        <ThemeToggle />
        
        <main id="main-content" className="container">
          <BookingForm />
        </main>
        
        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Airline Ticket Booking. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
