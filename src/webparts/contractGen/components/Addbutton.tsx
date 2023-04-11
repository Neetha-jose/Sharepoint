import { useCallback, useContext } from 'react';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from './types';
import Nav from './Nav';
import AppContext from './AppContext';

const Addbutton = () => {
  const { addUser,setSelectedFile } = useContext(AppContext)
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setUser((prevState) => ({ ...prevState, [name]: value }));
    },
    [],
  );

  const handledataSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      addUser(user)
      console.log(user);
      navigate("/card")
    },
    [user],
  )
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    
    <div className='main'>
      <Nav />
      <h1>ADD DETAILS</h1>
      <form onSubmit={handledataSubmit} >
        <label>Name:</label>
        <input name="name" placeholder='Name' onChange={onChange} />
        <label>Email:</label>
        <input name="email" placeholder='Email' onChange={onChange} />
        <label>Phone No:</label>
        <input name="phone" placeholder='Phone no' onChange={onChange} />
        <label>Address:</label>
        <input name="address" placeholder='Address' onChange={onChange} />
        <label>Add an Image:</label>
        <input type="file" onChange={handleFileInputChange} />
        <div className='btn'>
          <button className='buttn' type='submit'>Submit</button>
          <button className='buttn'
            onClick={() => navigate("/")}
          >Back</button>
        </div>
      </form>
    </div>
  
  )
}

export default Addbutton;



