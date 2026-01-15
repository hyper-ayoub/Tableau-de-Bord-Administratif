import React, { Component } from 'react';
import './authentification.css';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
      
    };
  }
  toggleForm = () => {
    this.setState({ isLogin: !this.state.isLogin });
  }; 
  render() {
    const { isLogin } = this.state;
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>{isLogin ? 'Sign In' : 'Sign Up'}</h3>
            
    {/* --- SIGN UP--- */}
            {!isLogin && (
      <div>
      <div className="mb-3">
        <label>First Name</label>
        <input 
          type="text" 
          name="firstName" 
          className="form-control" 
          placeholder="First name" 
        />
       </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input 
          type="text" 
          name="lastName" 
          className="form-control" 
          placeholder="Last name" 
        />
      </div>
    </div>
  )}
  
           {/* --- (Sign In & Sign Up) --- */}
            <div className="mb-3">
              <label>Email address</label>
              <input type="email" name="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" name="password" className="form-control" />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <p className="text-center mt-3" onClick={this.toggleForm} style={{cursor:'pointer', color:'blue'}}>
              {isLogin ? "Don't have an account? Sign Up" : "Already registered? Sign In"}
            </p>
          </form>
        </div>
      </div>
    );
  }
}