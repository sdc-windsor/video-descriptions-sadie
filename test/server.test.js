//const axios = require('axios');
const request = require('supertest');
const server = require('../server');

describe('Server should provide the correct endpoints', ()=>{

    test('Should response with correct categories for the selected videos',async(done)=>{
        expect.assertions(4);
        await request(server).get('/categories/10').then((response)=>{
            expect(response.body.categories).toEqual(["Education","Travel","Journalism","Animation"]);
            expect(response.body.video_id).toBe(10);
        })
        await request(server).get('/categories/1').then((response)=>{
            expect(response.body.categories).toEqual(["Journalism","Music"]);
            expect(response.body.video_id).toBe(1);
        })
        done();
    })

    test('Should response with correct data for the used videos',(done)=>{
        expect.assertions(2);
        request(server).get('/videosByCategory/food%2Ccomedy').then((response)=>{
            expect(response.body[0].categories).toEqual(["Comedy","Food","Education","Fashion"]);
            expect(response.body[0].video_id).toBe(5);
            done();
        })
    })

    test('Should accept multiple categories as an array of parameter',(done)=>{
        expect.assertions(2);
        request(server).get('/videosByCategory/food%2CTravel').then((response)=>{
            expect(response.body[0].categories).toEqual(["Documentary","Food","Animation","Travel","Art & Design"]);
            expect(response.body[0].video_id).toBe(4);
            done();
        })
    })
})