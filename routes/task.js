const { Router } = require("express");
const Dop = require("../../../../Desktop/projet-rest/models/Do");
const Did = require("../../../../Desktop/projet-rest/models/Did");
const Done = require("../../../../Desktop/projet-rest/models/Done");
const checkAuth = require("../../../../Desktop/projet-rest/middlewares/checkAuth");
const router = new Router();

router.use(checkAuth());

router.get("/tasks", async (req, res, next)=>{
    const dop = await Dop.findAll();
    const did = await Did.findAll();
    const done = await Done.findAll();
      res.json(({"do": dop,"did": did,"done": done}));
});
router.post("/tasks", async (req, res, next)=>{

    res.status(201).json(await Dop.create(req.body));
});

router.put("/tasks/:model/:id", async (req, res, next)=>{
    let task;
    const {model,id} = req.params;
    const {category} = req.body;
    try{
    if(model == category){
        return res.status(404).json({"error":"Same category"});
    }
    if (model.includes(["do","did","done"])) return res.status(404);
    if(model == "do"){
         task = await Dop.findByPk(id);
         await Dop.destroy({where: {id: task.id}});

    }
    if(model == "did"){
         task = await Did.findByPk(id);
         await Did.destroy({where: {id: task.id}});
    }
    if(model == "done"){
         task = await done.findByPk(id);
         await Done.destroy({where: {id: task.id}});
    }
    if(!task)return res.status(404).json({"error":"task not found"});
    console.log(task);
    if(category == "do"){
      await Dop.create({"task":task.id,"title":task.title,"description":task.description});
   }
   if(category == "did"){
    await Did.create({"task":task.id,"title":task.title,"description":task.description});
}
   if(category == "done"){
    await Done.create({"task":task.id,"title":task.title,"description":task.description});
}}catch(e){
   
}

});
module.exports = router;