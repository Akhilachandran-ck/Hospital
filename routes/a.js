const express=require("express");
const router=express.Router();
//router.use(express.json());
//router.use(express.urlencoded({extended:true}));



const fs=require("fs");


const loaddata=()=>{
try {
    const databuffer=fs.readFileSync('hospital.json');
    const dataJSON=databuffer.toString();

    return JSON.parse(dataJSON);
} catch (error) {
    console.log(error);
    return [];
}
}
const savedata=(data1)=>
    {
try {

    const dataJSON=JSON.stringify(data1,null,2)
    fs.writeFileSync('hospital.json',dataJSON);


    
} catch (error) {
       console.log(error);
 
}
    }


router.get('/',(req,res)=>{
    const data1=loaddata();

res.send(data1);
})





router.post('/',(req,res)=>{


try{
    const data1=loaddata();
    const new1={

        id:data1.length +1,
        hospital_name:req.body.hospital_name,
        patient_count:req.body.patient_count,
        hospital_location:req.body.hospital_location
    }
    
    data1.push(new1) 
    savedata(data1)
    res.status(201).send(new1);
}catch(error){
    res.status(400).send(error)
}
})


router.patch('/:id',(req,res)=>{
    try {
        

        const data1=loaddata()
        const data2=data1.find(i=>i.id === parseInt(req.params.id))
if(!data2){
    return res.status(404).send({error:'data not found'})
}
data2.hospital_name=req.body.hospital_name || data2.hospital_name
data2.patient_count=req.body.patient_count || data2.patient_count

data2.hospital_location=req.body.hospital_location || data2.hospital_location


savedata(data1)
 res.status(200).send(data2)

    } catch (error) {
        res.status(400).send(error)
    }
})



router.delete('/:id',(req,res)=>{
    try {
        let data1 =loaddata()
        const  index = data1.findIndex(i=>i.id === parseInt(req.params.id))
        if(index ===-1){
            return res.status(404).send({error:'data not found'})
        }
        data1.splice(index,1)
        savedata(data1)
        res.send({message:'Data  deleted'})
    } catch (error) {
        res.status(400).send(error)

    }
})

module.exports=router;