const mongoose = require('mongoose')


let documentSchema = mongoose.Schema(
    {
        documentType: { type: String, default: '' },
        documentFormat:{ type: String, default: '' },
        documentName: { type: String, default: '' },
        fileData: {
            data: { type: Buffer, default: '' },
            contentType: { type: String, default: '' },
            fileName: { type: String, default: '' }
        },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() }
    }
)

module.exports = mongoose.model('Documents', documentSchema);