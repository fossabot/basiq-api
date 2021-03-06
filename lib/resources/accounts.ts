import * as debug from 'debug';

import { Client } from '../client';
import { BasiqPromise } from '../interfaces';
import { Resource } from './resource';

const log = debug('basiq-api:resource:account');

const fetch = (client: Client, connectionId: string, accountId: string = ''): BasiqPromise => {
  return client
    .get(`connections/${connectionId}/accounts/${accountId}`)
    .then(res => client.formatResponse(res))
    ;
};

class Account extends Resource {

  constructor(client: Client) {
    super(client);
  }

  retrieve(connectionId: string, accountId: string): BasiqPromise {
    if (!connectionId) {
      return this.error('Connection ID is a required parameter');
    }

    if (!accountId) {
      return this.error('Account ID is a required parameter');
    }

    return fetch(this.client, connectionId, accountId);
  }

  list(connectionId: string): BasiqPromise {
    if (!connectionId) {
      return this.error('Connection ID is a required parameter');
    }

    return fetch(this.client, connectionId);
  }

}

export { Account };
