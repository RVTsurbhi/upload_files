/******* Models *********/

/****** 3rd party modules *******/
const mime = require('mime-types');

/******** Helpers **********/
const responseHelper = require('../helpers/responses');
const responseMessages = require('../helpers/messages');

/********* Models *********/
const documentModel = require('../models/document')

/************************************/
/*********** Controllers ************/
/************************************/

//upload file api
module.exports.uploadFile = async(req, res, next) => {
    try {
        let fileData = req.file
        if (!fileData) throw Error(responseMessages.FILE_REQUIRED)
        let fileName = fileData.originalname
        //check valid mimetype
        const mimeType = mime.lookup(fileName);
        // console.log("mimeType***", mimeType)
        let fileMimeType= await fileFilter(fileName, mimeType);

        // let currentTimestamp = Math.floor(Date.now() / 1000);
        let fileTypeSplit = fileMimeType.split('/')
        let uploadFileData = {
            fileData: {
                data: fileData.buffer,
                contentType: fileMimeType,
                fileName: fileData.originalname
            },
            documentType: fileTypeSplit[0],
            documentFormat: fileTypeSplit[1],
            documentName: fileData.originalname
        }
        let document = await new documentModel(uploadFileData).save()
        let finalData = document.toJSON()
        delete finalData.fileData.data
        
        responseHelper.data(res, finalData, 200, responseMessages.FILE_UPLOADED);
    } catch (err) {
        next(err)
    }
}

//upload file api
module.exports.getUploadFile = async (req, res, next) => {
    try {
        let documentId = req.query.documentId
        let documentData = await documentModel.findOne({_id: documentId }).exec()
            if (documentData && documentData.fileData && documentData.fileData.data) {
                responseHelper.filedata(res, documentData.fileData, 200)
            }
            else {
                throw Error(responseMessages.FILE_NOT_FOUND)
            }
    } catch (error) {
        next(error)
    }
}

module.exports.getDocuments = async (req, res, next) => {
    try {
        let skip = parseInt(req.query.skip) || 0
        let limit = parseInt(req.query.limit) || 10
        let documentList = await documentModel.find({})
        .select('-fileData.data').skip(skip).limit(limit)
        let totalCount = await documentModel.countDocuments({})
        responseHelper.page(res, documentList, totalCount, skip, 200)
    } catch (error) {
        next(error)
    }
}


const fileFilter = async (filename, mimetype) =>{
    try {
        // PDF, docx, image files, json yaml, xml
        let allowedMimeTypes = ['application/pdf', 'text/csv', 'text/html', 'text/plain']
        if (allowedMimeTypes.includes(mimetype)) {
            return mimetype
        } else {
            return 'Invalid file type. Only pdf, Html, plain text files are allowed.';
        }   
    } catch (error) {
        return(error)
    }
};

// const mimeTypeChecks = (fileData, callback) => {
//     try {
//         const encryptedPdfBytes = fileData
//         // Assignment fails. Throws an `EncryptedPDFError`.
//         PDFDocument.load(encryptedPdfBytes)
//             .then((data) => {
//                 // console.log("pdfDoc****", data)
//                 callback(null, data)
//             }).catch((err) => {
//                 console.log("error-1", err)
//                 callback("cannot upload encrypted file")
//             })
//     } catch (error) {
//         console.log("error", error)
//         callback("cannot upload encrypted file")
//     }
// }
