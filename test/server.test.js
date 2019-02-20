const axios = require('axios');



describe('Server should provide the correct endpoints', ()=>{
    let server ;
    beforeEach(()=>{
        server = require('../server');
    });

    // afterEach(()=>{
    //     server.close();
    // })


    test('Should send back correct data for the used endpoints', async()=>{
        expect.assertions(1);
        await axios.get('http://localhost:8080/categories/10')
             .then((data)=>{
                console.log(data.data.video_id);
                 expect(data.data.video_id).toEqual(10);
             })

    })
})