const express = require('express');
const cors = require('cors');
const connection = require('./db');
const app = express();
app.use(express.json());
app.use(cors());

const port = 8000;

//get tasks
app.get('/tasks',(req,res)=>{
    const query= 'SELECT * FROM tasks';
    connection.query(query,(err,rows)=>{
        if(err){
            return res.status(500).json({
                success:false,
                message:err.sqlMessage,
                data:[]
            });
        }
        res.status(200).json({
            success:true,
            message:'Tasks fetched success',
            data:rows
        });
    });
});

//add tasks
app.post('/tasks',(req,res)=>{
    const {task , description} = req.body;
    if(!task || task.trim()===''){
        return res.status(400).json({
            success:false,
            message:'task cannot be empty',
            data:[]
        });
    }
    const query= 'INSERT INTO  tasks (tittle,description) VALUES (?,?)';
    connection.query(query,[task, description || null],(err,result)=>{
    if(err){
        return res.status(500).json({
         success:false,
         message:err.sqlMessage,
         data:[]
        });
    }
    res.status(201).json({
        success:true,
        message:'task added success',
        data:result.insertId
    });
 });
   
});

//update task
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { task, description } = req.body;

    if (!task || task.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'task cannot be empty',
            data: []
        });
    }
    const query = 'UPDATE tasks SET tittle = ?, description = ? WHERE id = ?';

    connection.query(
        query,
        [task, description || null, id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: err.sqlMessage,
                    data: []
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'task not found',
                    data: []
                });
            }

            res.status(200).json({
                success: true,
                message: 'task updated successfully',
                data: result.affectedRows
            });
        }
    );
});



//delete task
app.delete('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const query= 'DELETE FROM tasks WHERE id= ?';
    connection.query(query,[id],(err,result)=>{
        if(err){
            return res.status(500).json({
                success:false,
                message:err.sqlMessage,
                data:[]
            });
        }
        if(result.affectedRows === 0){
            return res.status(404).json({
                success:false,
                message:'task not found',
                data:[]
            });
        }
        res.status(200).json({
            success:true,
            message:'task deleted success',
            data:result.affectedRows
        });
    });
});



app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})