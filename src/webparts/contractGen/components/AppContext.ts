import * as React from 'react';
import { IUser } from "./types";

export interface IAppContext {
    usersData: IUser[],
    addUser: (newUser: IUser) => void,
     deleteUser: (id:number)=>void,
     selectedUser:IUser,
     updateUser:(item:any)=>void
     setSelectedFile: React.Dispatch<React.SetStateAction<File>>
     selectedFile:File
    
}

const AppContext = React.createContext<IAppContext>({
    usersData: [],
    addUser: () => {},
    deleteUser: () =>{},
    selectedUser:undefined,
    updateUser:()=>{},
    setSelectedFile: undefined,
    selectedFile:undefined   
});

export default AppContext;