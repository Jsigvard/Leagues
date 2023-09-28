const express = require('express')
const cors = require('cors');
const { Pool } = require('pg');
const app = express()
const port = 8080

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});
    
app.use(cors({
    origin: '*'
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json());

//CREATE
app.get('/tasks', async (req, res) => {

    try {
        // try to send data to the database
        const query = `
        SELECT *  FROM "Tasks";
        `;
        const values = [];
        const result = await pool.query(query, values);

        res.status(201).send({ message: 'Getting Tasks', tasks: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('some error has occured');
    }
});

//CREATE
app.post('/tasks', async (req, res) => {

    // Validate the incoming JSON data
    const { taskText } = req.body;
    console.log(req.body);

    if (!taskText || taskText == "") {
        return res.status(400).send('Task text was empty or missing');
    }

    try {
        // try to send data to the database
        const query = `
        INSERT INTO "Tasks" (task)
        VALUES ($1)
        RETURNING task_id;
        `;
        const values = [taskText];

        const result = await pool.query(query, values);
        res.status(201).send({ message: 'New task created', taskId: result.rows[0].task_id });
    } catch (err) {
        console.error(err);
        res.status(500).send('some error has occured');
    }
});

//DELETE
app.delete('/tasks', async (req, res) => {

    // Validate the incoming JSON data
    const { taskId } = req.body;
    console.log(req.body);

    if (!taskId || taskId == "") {
        return res.status(400).send('Task ID was empty or missing');
    }

    try {
        // try to send data to the database
        const query = `
        DELETE FROM "Tasks"
        WHERE task_id = $1;
        `;
        const values = [taskId];
        const result = await pool.query(query, values);

        res.status(201).send({ message: 'Task deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('some error has occured');
    }
});

//UPDATE
app.patch('/tasks', async (req, res) => {

    // Validate the incoming JSON data
    const { taskId, taskText, completed } = req.body;
    console.log(req.body);

    if (!taskId || taskText == "") {
        return res.status(400).send('Task ID or text was empty or missing');
    }

    try {
        if(taskText){
            const query = `
            UPDATE "Tasks"
            SET task = $2, completed = $3
            WHERE task_id = $1;
            `;
            const values = [taskId, taskText, completed];
            const result = await pool.query(query, values);
        }
        else{
            const query = `
            UPDATE "Tasks"
            SET completed = $2
            WHERE task_id = $1;
            `;
            const values = [taskId, completed];
            const result = await pool.query(query, values);
        }

        res.status(201).send({ message: 'Task updated' });
    } catch (err) {
        console.error(err);
        res.status(500).send('some error has occured');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
