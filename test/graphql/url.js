const mocha = require('mocha');
const chai = require('chai');
const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user');
const Url = require('../../models/url');
const mongoose = require('mongoose');
const senstive = require('../../sensitive');

const supertest = require('supertest');


const {
    expect
} = require('chai');

const user = {
    email: 'email@mail.com',
    password: 'password'
}

const url = "https://www.google.com/";

let token;

describe('Test the graphql url', () => {
    before((done) => {
        const query = `
        getLogin(email:${user.email}, password:${user.password}){
            token
            success
        }
        `;
        request(app)
            .post('/graphql')
            .send({
                query: query
            })
            .end((err, res) => {
                if (err) {
                    console.log(err);
                }
                token = res.body.data.getLogin.token;
                done();
            });
    });
    it('should create a url and return a success message', (done) => {
        const query = `
        createUrl(longUrl:${url}, userId:${token.userId}){
            longUrl
            shortUrl
            expirationDate
        }
        `;
    })
});