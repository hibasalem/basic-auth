'use strict';

const server = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server.app);
const base64 = require('base-64');

describe('signin and siginup', () => {
  it('sign up and create a new user correctly', async () => {
    const test = {
      username: 'hiba',
      password: '12345',
    };
    const response = await mockRequest.post(`/auth/v1/signup`).send(test);
    expect(response.status).toBe(201);
    expect(response.body.username).toBe('hiba');
  });
  it('cant sign up with  existing user name ', async () => {
    const test = {
      username: 'hiba',
      password: '12345',
    };
    const response = await mockRequest.post(`/auth/v1/signup`).send(test);
    expect(response.status).toBe(403);
  });

  it('sign in with correct data', async () => {
    // const test = {
    //   username: 'hiba',
    //   password: '12345',
    // };
    let test = base64.encode('hiba:12345');

    const response = await mockRequest
      .post(`/auth/v1/signin`)
      .set('Authorization', `Basic ${test}`);
    //   .auth(test);
    expect(response.body.username).toBe('hiba');
    expect(response.status).toBe(200);
  });
  it('dont sign in with uncorrect data', async () => {
    // const test = {
    //   username: 'hiba',
    //   password: '12345',
    // };
    let test = base64.encode('hiba000:12340005');

    const response = await mockRequest
      .post(`/auth/v1/signin`)
      .set('Authorization', `Basic ${test}`);
    //   .auth(test);
    expect(response.status).toBe(403);
    expect(response.body.username).toBe(undefined);
  });
});

describe('geniral', () => {
  it('response with 404 on a bad request', async () => {
    const response = await mockRequest.get('/foo');
    expect(response.status).toEqual(404);
  });
  it('response with 200 on a correct request', async () => {
    const response = await mockRequest.get('/');
    expect(response.status).toEqual(200);
  });
  it('response with 404 on a bad method', async () => {
    const response = await mockRequest.put('/');
    expect(response.status).toEqual(404);
  });
  it('response with 500 on a bad route', async () => {
    const response = await mockRequest.get('/bad');
    expect(response.status).toEqual(500);
  });
});
