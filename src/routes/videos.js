const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Rota para adicionar um novo vídeo
router.post('/videos', async (req, res) => {
    try {
        const { title, description, category, thumbnail, url } = req.body;
        const newVideo = new Video({ title, description, category, thumbnail, url });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para obter todos os vídeos
router.get('/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter vídeos por categoria
router.get('/videos/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const videos = await Video.find({ category });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;