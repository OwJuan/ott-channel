const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/videos', upload.single('thumbnail'), async (req, res) => {
    try {
        const { title, description, category, url } = req.body;
        const thumbnail = req.file.path;
        const newVideo = new Video({ title, description, category, thumbnail, url });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});