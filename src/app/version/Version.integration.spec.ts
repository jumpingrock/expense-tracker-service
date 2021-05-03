import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { ExpenseTrackerApp } from '../index';

chai.use(chaiHttp);

describe('VersionController', () => {
  const mockApp: express.Application = ExpenseTrackerApp.create();

  test('that /version returns the version of the application', () => {
    return chai
      .request(mockApp)
      .get('/version')
      .then((response) => {
        expect(response.body._appVersion).toEqual('0.0.1');
      });
  });
});
