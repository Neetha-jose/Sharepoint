import * as React from 'react';
import App from './App';
import { IContactsProps } from './IContactsProps';

export default class Contacts extends React.Component<IContactsProps, {}> {
  public render(): React.ReactElement<IContactsProps> {

    return (
      <App />
    );
  }
}
