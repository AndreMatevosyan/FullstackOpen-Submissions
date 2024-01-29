const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb://andre12231205:${password}@ac-9a3hvp3-shard-00-00.o8fyaco.mongodb.net:27017,ac-9a3hvp3-shard-00-01.o8fyaco.mongodb.net:27017,ac-9a3hvp3-shard-00-02.o8fyaco.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-fdk6if-shard-0&authSource=admin&retryWrites=true&w=majority`
 
mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'HTML is Easy',
//     important: true,
// })

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})