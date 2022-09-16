//config inicial
const express = require('express')
const app = express()

const mongoose = require('mongoose')

const Youtube = require('./models/Youtube')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//rotas
app.post('/youtube', async (req, res) => {
    const { title, time, user, seguidores } = req.body
    const youtube = {
        title, 
        time, 
        user, 
        seguidores
    }

    try {
        await Youtube.create(youtube)
        res.status(201).json({ message: 'Vídeo inserido' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.get('/youtube', async (req, res) => {
    try {
        const youtube = await Youtube.find()
        res.status(200).json(youtube)
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

app.get(`/youtube/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const youtube = await Youtube.findOne({ _id:id })

        if(!youtube) {
            res.status(422).json({ message: 'Vídeo não encontrado' })
            return
        }

        res.status(200).json(youtube)
        
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

app.patch(`/youtube/:id`, async (req, res) => {
    const id = req.params.id
    const { title, time, user, seguidores } = req.body

    const youtube = { 
        title, 
        time, 
        user, 
        seguidores 
    }

    try {
        const updatedYoutube = await Youtube.updateOne({_id:id}, youtube)
            if (updatedYoutube.matchedCount === 0) {
                res.status(422).json({message: 'Vídeo não encontrado'})
                return
            }
            res.status(200).json(youtube)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.delete(`/youtube/:id`, async (req, res) => {
    const id = req.params.id

    const youtube = await Youtube.findOne({_id:id})

    try {
        const youtube = await Youtube.deleteOne({ _id:id })

        if(!youtube) {
            res.status(422).json({ message: 'Vídeo não encontrado' })
            return
        }

        res.status(200).json({ message: 'Vídeo deletado' })

        
    } catch(error) {
        res.status(500).json({ error: error })
    }
})

mongoose.connect('mongodb+srv://may:may@cluster0.dh1eevr.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Conectou')
    app.listen(3000)
})
.catch((err) => console.log(err))