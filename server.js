const Datastore = require('nedb');
const express = require('express');
const fetch = require('node-fetch');
const nedbPromise = require('nedb-promise')
const cors = require('cors');


require('dotenv').config(); 

const app = express(); 
const port = process.env.PORT || 5000;
const server = app.listen(port);
const io = require('socket.io').listen(server);

app.use(cors());
//app.listen(port, ()=> console.log(`server initiated on port ${port}`));
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit:'10mb'}));

app.get('/', function(req, res){
    res.sendFile('login.html', { root: __dirname + "/public" } );
});

const database = new Datastore({filename: 'chat-database.db',autoload: true });
const db=nedbPromise.fromInstance(database);

//const messagesdb = new Datastore({filename: 'message-db',autoload:true});
var users = {};

io.on('connect',(socket)=>{

    console.log(`socket connected to ${port}`);
    socket.on('userConnected',(data)=>{
        let userId=data.email;
        users[userId]=socket.id;
        console.log(users);
    });
    console.log(users);
    socket.on('pm_message',(data)=>{
        let userId = data.email;
        let userSocket = users[userId]||null;
        console.log(userSocket,data.message,userId);
        if (userSocket){
            io.to(userSocket).emit('my_message',data);
        }else{
            console.log("user no existo");
        }
    });
});

app.post('/reg', (request,response)=>{
    const data = request.body;
    const time=Date.now();
    data.time = time;
    database.insert(data);
    response.json({
        status: "success",
        time:time,
    })
});

app.get('/reg', (request,response)=>{
    database.find({}, (err,data)=>{
        response.json(data);
    });  
});

app.post('/setup',(request,response)=>{
    const data = request.body;
    try{
    database.remove({_id: data._id},{},(err,data)=>{
        response.json({
            status: "success",
            data
        });
    });
    database.persistence.compactDatafile()
    }
    catch(error){
        console.log(error);
    }
    
});