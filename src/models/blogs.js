const mongoose = require('mongoose')
const validator = require('validator')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    filePaths: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const blog = mongoose.model('Blog', blogSchema)

module.exports = blog