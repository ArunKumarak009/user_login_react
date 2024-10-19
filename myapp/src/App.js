import React, { Component } from 'react';

class App extends Component {
  state = {
    usersList: [],
    email: "",
    name: ""
  };

 

  nameValue = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  emailValue = (event) => {
    this.setState({
      email: event.target.value
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;

    
    try {
      const response = await fetch('http://localhost:5000/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }), // Convert input value to JSON
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Parse the JSON response
     
    } catch (error) {
      console.error('Error:', error);
    }



    try {
      const response = await fetch('http://localhost:5000/myusers', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Parse the JSON response
      this.setState({usersList:data}) 
      

    } catch (error) {
      console.error('Error:', error);
    }

   
   



  };

  render() {
    const { email, name , usersList} = this.state;
    console.log(usersList)


    return (
      <>
      <form onSubmit={this.submitForm}> {/* Change onClick to onSubmit */}
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          onChange={this.nameValue}
          value={name}
          required // Make input required
        />
        <br />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          onChange={this.emailValue}
          value={email}
          required // Make input required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>

      <div>
      <h2>Users who bought more than 5 products</h2>
      <ul>
        {usersList.map((user) => (
          <li key={user._id}>
            <strong>{user.name}</strong> - {user.email} 
          </li>
        ))}
      </ul>
    </div>
      </>


    );
  }
}

export default App;
