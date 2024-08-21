import { useState, useEffect } from 'react';
import { finderWork_backend } from 'declarations/finderWork_backend';

function App() {
  const [message, setMessage] = useState('');
  const [jobs, setJobs] = useState([]);

  // Handle user registration
  function handleRegister(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;

    const userPayload = {
      name,
      username,
      email,
      phone
    };

    finderWork_backend.registerUser(userPayload).then((result) => {
      if ('Ok' in result) {
        setMessage(`User registered successfully with username: ${result.Ok.username}`);
      } else {
        setMessage(`Error: ${Object.values(result.Err)[0]}`);
      }
    }).catch(error => {
      setMessage(`Error: ${error.message}`);
    });

    return false;
  }

  // Handle user login
  function handleLogin(event) {
    event.preventDefault();
    finderWork_backend.loginUser().then((result) => {
      if ('Ok' in result) {
        setMessage(result.Ok);
      } else {
        setMessage(`Error: ${Object.values(result.Err)[0]}`);
      }
    }).catch(error => {
      setMessage(`Error: ${error.message}`);
    });

    return false;
  }

  // Handle job posting
  function handlePostJob(event) {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;

    const jobPayload = {
      title,
      description
    };

    finderWork_backend.storeJob(jobPayload).then((result) => {
      if ('Ok' in result) {
        setMessage(`Job posted successfully with title: ${result.Ok.title}`);
      } else {
        setMessage(`Error: ${Object.values(result.Err)[0]}`);
      }
    }).catch(error => {
      setMessage(`Error: ${error.message}`);
    });

    return false;
  }

  // Fetch jobs
  useEffect(() => {
    finderWork_backend.indexJob().then((result) => {
      if ('Ok' in result) {
        setJobs(result.Ok);
      } else {
        setMessage(`Error: ${Object.values(result.Err)[0]}`);
      }
    }).catch(error => {
      setMessage(`Error: ${error.message}`);
    });
  }, []);

  return (
    <main>
      <h1>User Registration</h1>
      <form action="#" onSubmit={handleRegister}>
        <label htmlFor="name">Name: &nbsp;</label>
        <input id="name" type="text" required />
        <br />
        <label htmlFor="username">Username: &nbsp;</label>
        <input id="username" type="text" required />
        <br />
        <label htmlFor="email">Email: &nbsp;</label>
        <input id="email" type="email" required />
        <br />
        <label htmlFor="phone">Phone: &nbsp;</label>
        <input id="phone" type="tel" required />
        <br />
        <button type="submit">Register</button>
      </form>

      <h1>User Login</h1>
      <form action="#" onSubmit={handleLogin}>
        <button type="submit">Login</button>
      </form>

      <h1>Post a Job</h1>
      <form action="#" onSubmit={handlePostJob}>
        <label htmlFor="title">Job Title: &nbsp;</label>
        <input id="title" type="text" required />
        <br />
        <label htmlFor="description">Job Description: &nbsp;</label>
        <textarea id="description" required></textarea>
        <br />
        <button type="submit">Post Job</button>
      </form>
      
      <h1>Job Listings</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <strong>{job.title}</strong>: {job.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs available.</p>
      )}
      
      <section id="message">{message}</section>
    </main>
  );
}

export default App;