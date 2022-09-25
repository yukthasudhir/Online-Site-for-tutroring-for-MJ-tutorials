import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Focus from './focus';

import {useParams} from 'react-router-dom';
import { render } from 'react-dom';


function Tutorauth()  {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  useEffect( () =>{
    // document.getElementById('submit').onclick = function() {console.log('submitted')}
    document.getElementById('submit').onclick = function() {
              var em = document.getElementById('email').value
              var pass = document.getElementById('password').value
            //   console.log(JSON.stringify(em))
            //   console.log(JSON.stringify(pass))
            console.log(JSON.stringify( {  // you will get user information from login form
        
                email: em,
                tloginpswd: pass,
      
              } ))
              console.log('tutor form submitted succesfully')
              fetch('http://localhost:3000/tutorlogin', {
                method: "POST",
                body: JSON.stringify( {  // you will get user information from login form
        
                    email: em,
                    tloginpswd: pass,
          
                  } ),
                headers : { 
                  'Content-Type': 'application/json',
                   'Accept': 'application/json'
                }
              })
              .then( res => res.json() )
              .then( (data) => {
                  if(data.mess === "blank")
                  {
                      alert('Please fill all the detaiils')
                  }
                  else if(data.mess === "incorrect")
                  {
                      alert('Incorrect login credentials. Please check email/password')
                  }
                  else
                  {
                    console.log(data);
        
                    let inMemoryToken = data.token;
                    console.log(inMemoryToken)
          
                    localStorage.setItem('tutor', JSON.stringify(data));
                    setFlag(true);
                  }
                  
        
                  
              })
              .catch((error) => {
                console.log(error.message);
              
              });
          }
  }, [])

      // http://localhost:3000/authentication


      if (isLoading){
        return(
          <div>Loading...</div>

        );

      }
      else if (error){
        return(
          <div>Error: {error.message }</div>

        );
      }
      else{
        if(flag === false)
        {return (
            <div>
                <div className="d-flex justify-content-center">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tutor Login</h5>
                                <form>
                                    <div class="form-inline">
                                        <label for="email">Email:</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email"/>
                                    </div>
                                    <div class="form-inline">
                                        <label for="password">Password:</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password"/>
                                    </div>
                                    <button type="button" id ="submit" className="btn btn-primary">Login</button>
                                </form>
                        </div>
                    </div>
                </div>
          </div> 
  
        );}
        else{
            //change to appointments===============================
            navigate(`/tutorappointments`)
            // navigate(`/`)
            // <div>Hello</div>
        }

      }
     
      
}

export default Tutorauth;
