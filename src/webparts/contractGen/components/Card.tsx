import { useContext } from 'react';
import * as React from 'react';
import AppContext from './AppContext';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const {usersData,deleteUser,updateUser,selectedFile} = useContext(AppContext);
  console.log("from card", usersData);
  const navigate=useNavigate();

//   const url = ` https://2mxff3.sharepoint.com/sites/Neetha/EmployeeLibrary/${emplyeeId}/profilepic.png`  
//    const list = sp.web.lists.getByTitle("Employees");
//   list.items.getById(emplyeeId).update({
//  Image_url:url
//  });

  return (
    <div className='main'>
      <Nav />
      <div className='addbutton'>
        <button className='addbutton1'
         onClick={() => navigate("/addbutton")}>ADD</button>
      </div>
    <div className='card1'>
       <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mail id</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Action</th>
            <th>Action</th>
            <th>Image</th>
          </tr>
        </thead>
          <tbody>
           {usersData?.map((item)=>(
           
           <tr key={item.name}>
            
            <td>{item.name}</td>
            <td>{item.email}</td>
            
            <td>{item.phone}</td>
            
            <td>{item.address}</td>
            <td><button className='btnnn' onClick={()=>deleteUser(item?.ID)}>Delete</button></td>
            <td><button className='btnnnn' onClick={()=>updateUser(item)}>Update</button></td>
             <td>{selectedFile && (
            <div>
            <p> {selectedFile.name}</p>
           <img src={URL.createObjectURL(selectedFile)} alt="Selected file preview" width="50" height="50" />
           </div>
             )}</td>
           </tr>
           ))} 
          
          </tbody>
       </table>
    </div>
    </div>
  )
}

export default Card;