import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import Contacts from './components/Contacts';
import { IContactsProps } from './components/IContactsProps';
import { spService } from '../../spauth';

export interface IContractGenWebPartProps {
  description: string;
}

export default class ContractGenWebPart extends BaseClientSideWebPart<IContractGenWebPartProps> {

  public render(): void {
    spService.setup(this.context);
    const element: React.ReactElement<IContactsProps> = React.createElement(
      Contacts,
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    spService.setup(this.context);
  }
}
