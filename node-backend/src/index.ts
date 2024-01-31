import express from 'express';
import mysql from "mysql2/promise";
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todo",
  port: 3306,
  connectionLimit: 1,
})

app.get('/todo', async (_, res) => {
  try {
    const [todos] = await pool.query('SELECT * FROM todos')

    return res.status(200).json({ message: "fetch success", isSuccess: true, data: todos })
  } catch (e) {
    return res.status(500).json({ message: 'something went wrong at the server' })
  }
});

app.post('/todo', async (req, res) => {
  const payload = req.body
  console.log()
  if (payload?.title === undefined) {
    return res.status(400).json({ message: "expected body `title`", isSuccess: false })
  }
  

  try {
    await pool.query('INSERT INTO todos (title, completed) VALUES (?, ?)', ['true', false])

    return res.status(200).json({ message: "create todo successfully", isSuccess: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "cannot create todo", isSuccess: false })
  }
});

app.patch('/todo/:id', async (req, res) => {
  const id = req.params.id

  const payload = req.body
  if (!payload.title) {
    return res.status(400).json({ message: "expected body `title`", isSuccess: false })
  }

  if (payload?.completed === null || payload?.completed === undefined) {
    return res.status(400).json({ message: "value `completed` is invalid", isSuccess: false })
  }

  try {
    const result = await pool.query('SELECT COUNT(1) FROM todos WHERE id = ?', [id])
    if (result[0][0]["COUNT(1)"] === 0) {
      return res.status(400).json({ message: `todo id: ${id} not found`, isSuccess: false })
    }

    await pool.query('UPDATE todos SET title=?, completed=? WHERE id=?', [payload.title, Boolean(payload.completed), id])
    return res.status(200).json({ message: "update todo successfully", isSuccess: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "cannot create todo", isSuccess: false })
  }

})

app.delete('/todo/:id', async (req, res) => {
  const id = req.params.id

  try {
    const result = await pool.query('SELECT COUNT(1) FROM todos WHERE id = ?', [id])
    if (result[0][0]["COUNT(1)"] === 0) {
      return res.status(400).json({ message: `todo id: ${id} not found`, isSuccess: false })
    }

    await pool.query('DELETE FROM todos WHERE id = ?', [id])
    return res.status(200).json({ message: "delete todo successfully", isSuccess: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "cannot create todo", isSuccess: false })
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
