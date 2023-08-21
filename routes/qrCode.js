const express = require('express')

const auth = require('../middleware/auth')
const qrCodeController = require('../controllers/qrCode')

const router = express.Router()

router.get('/create', async (req, res, next) => {
  try {
    const qrCodeDataURL = await qrCodeController.create({
      link: req.query.link
    })
    const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64')

    // Set the appropriate headers for serving the file as an attachment
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Content-Disposition', 'attachment; filename="qr_code.png"')

    // Send the QR code buffer as the response
    res.send(qrCodeBuffer)
  } catch (error) {
    console.error('Error generating QR code:', error)
    res.status(500).send('Error generating QR code')
  }
})

module.exports = router
