const QRCode = require('qrcode')
const fs = require('fs')

exports.create = async ({ link }) => {
  try {
    const qrCodeOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1
    }

    const qrCodeDataURL = await QRCode.toDataURL(link, qrCodeOptions)
    const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64')

    // Save the QR code image to a file (optional)
    const filePath = './qr_code.png'
    fs.writeFileSync(filePath, qrCodeBuffer)

    return qrCodeDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    return error
  }
}
