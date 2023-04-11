import { useState, useEffect, useCallback } from 'react';
import * as React from 'react';
import AppContext from './AppContext';
import { IUser } from './types';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from '../../../spauth';
import { useNavigate } from 'react-router-dom';
import "@pnp/sp/folders";



const AppProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  useEffect(() => {
    sp.web.lists.getByTitle("Users").items().then(setUsersData)
  }, []);

  console.log("=>", usersData);


  const addUser = useCallback(async (newUser: IUser) => {
    debugger
    setUsersData((ls) => [...ls, newUser]);
    const response = await sp.web.lists.getByTitle("Users").items.add({
      PhoneNo: Number(newUser.phone),
      Email: newUser.email,
      Address: newUser.address,
      name: newUser.name
    });
    
    const folderName = response.data.ID;
    const documentLibraryName = "UserDetails";
    const newFolderName = `${folderName}`;
    const documentLibrary = await sp.web.lists.getByTitle(documentLibraryName);
    await documentLibrary.rootFolder.folders.addUsingPath(newFolderName)
      .then(async(res) => {

      // const fileNamePath = encodeURI(selectedFile.name);
  
      let result: any;
      console.log(selectedFile);
      console.log(res?.data?.ServerRelativeUrl);
      result = await sp.web.getFolderByServerRelativePath(res?.data?.ServerRelativeUrl).files.addUsingPath(selectedFile.name, selectedFile, { Overwrite: true });
      
      console.log(`Result of file upload: ${JSON.stringify(result)}`);
    
        console.log(`Folder '${newFolderName}' created successfully.`);
      })
      .catch((error) => {
        console.error(`Error creating folder: ${error}`);
      });
   
  },

    [usersData]);



  const deleteUser = useCallback(async (id: number) => {
    setUsersData((prevState) => prevState.filter((item) => item.ID !== id));
    await sp.web.lists.getByTitle("Users").items.getById(id).recycle();
  }, [usersData]);

  const updateUser = useCallback(async (item: IUser) => {
    setSelectedUser(item);
    navigate("/updatebutton")
  },
    [selectedUser]);



  return (
    <AppContext.Provider value={{
      usersData,
      addUser, deleteUser, selectedUser, updateUser,setSelectedFile,selectedFile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;