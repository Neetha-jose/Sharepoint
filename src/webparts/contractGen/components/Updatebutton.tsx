import { useCallback, useEffect } from 'react';
import * as React from 'react';
// import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
// import { IUser } from './types';
import Nav from './Nav';
import AppContext from './AppContext';
import { useContext } from 'react';
import { IUser } from './types';
import { sp } from '../../../spauth';
// import { Item } from '@pnp/sp/items';
// import { sp } from '../../../spauth';

//const navigate=useNavigate();
const Updatebutton = () => {
  
  const { selectedUser } = useContext(AppContext);
  console.log("selectedUser",selectedUser);
  
  const [user, setUser] = React.useState<IUser>({
    name: "",
    address: "",
    email: "",
    phone: ""
  });
console.log(user);

useEffect(() => {
  setUser(selectedUser)
}, [selectedUser])


  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setUser((prevState) => ({ ...prevState, [name]: value }));
    },
    [],
  );

  const handledataSubmit = useCallback(
    async(e: any) => {
      e.preventDefault();
      // updateUser(selectedUser)
      debugger
      await sp.web.lists.getByTitle("Users").items.getById(selectedUser?.ID).update(user);
      //navigate("/card")
    },
    [selectedUser,user],
  )

  if(!user) return <span>loading...</span>

  return (
    <div>
      <Nav />
      <h1>UPDATE DETAILS</h1>
      <form onSubmit={handledataSubmit} >
        <label>Name:</label>
        <input name="name" placeholder='Name' onChange={onChange} value={user.name} />
        <label>Email:</label>
        <input name="email" placeholder='Email' onChange={onChange} value={user.email} />
        <label>Phone No:</label>
        <input name="phone" placeholder='Phone no' onChange={onChange} value={user.phone} />
        <label>Address:</label>
        <input name="address" placeholder='Address' onChange={onChange} value={user.address} />
        <div className='btn'>
          <button className='buttn' type='submit'>Update</button>
        </div>
      </form>
    </div>
  )
}

export default Updatebutton;
