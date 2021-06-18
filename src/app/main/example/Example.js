import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Echo from 'laravel-echo';
import Pusher, { Channel } from 'pusher-js';
import axios from 'axios';

import { ComponentToPrint } from './ComponentToPrint';

const Example = () => {
  axios.defaults.withCredentials = true;
  const baseURl = 'http://localhost:8000';
//const options = 

  //authEndpoint is your apiUrl + /broadcasting/auth
  // authEndpoint: 'http://localhost:8000/broadcasting/auth', 
  // // As I'm using JWT tokens, I need to manually set up the headers.
  // auth: {
  //   headers: {
  //     //Authorization: `Bearer ${token}`,
  //     Accept: 'application/json',
      
  //     withCredentials : true,
      
  //   },
    
  // },
 
//};

const echo  =  new Echo({
  broadcaster: 'pusher',
  key: 'b711517b3faed74cffe2',
  cluster: "ap2",
  forceTLS: true  ,
  encrypted : true,
  withCredentials : true,
//authEndpoint: 'http://localhost:8000/broadcasting/auth',
  authorizer: (channel,options) =>{
    return {
      authorize: (socketId,callback) => {
        axios.post('http://localhost:8000/api/broadcasting/auth', {
          socket_id: socketId
          , channel_name: channel.name
        })
        .then(res =>{
          callback(false,res.data);
        })
        .catch(err => {
          callback(true,err);
        })
      }
    }
  }
  });


echo.private('App.Models.User.2').notification((data) => {
    console.log(data);
});





  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default Example;