

const { Response, FailResponse } = require("../../models/response")
const Room = require('../../models/room.model');
const Mistake = require('../../models/mistake.model');

class Test {
    addRoom = async (req,res) =>{
        const{name} = req.body;
        if(name){
            const room = await (new Room({name: name})).save();
            return res.json(new Response({data: room}));
        }else{
            return res.json(new FailResponse({message: 'Vui lòng nhập tên phòng'}));
        }       
    };
    addMistake = async (req,res) =>{
        const{from, description} = req.body;
        if(from){
            const misTake = await (new Mistake({from: from, description: description})).save();
            return res.json(new Response({ data: misTake}));
        }else{
            return res.json(new FailResponse({message: 'Vui lòng nhập nguyên nhân '}));
        }
    };
    addTypeReport = async (req, res) => {
        const { name, time_handle } = req.body;
        const result = await new Type({ name, time_handle }).save();
        return res.json(new Response({ data: result }));
      };
}

module.exports = new Test();