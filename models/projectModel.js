const mongoose = require('mongoose');
const slugify = require('slugify');
const persianDate = require('persian-date');


const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
        },
        slug: String,
        description: String,
        imageCover: {
            type: String,
            required: [true, 'A tour must have a cover image'],
        },
        images: [String],
        videoHTML : String,
        videoPug : String,
        date: {
          type: String,
          default: new persianDate(),
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },

    }
);



projectSchema.pre('save', function (next) {
    // this -> current document that is being saved. so slug will be saved to the document!
    this.slug = slugify(this.name, { lower: true });
    next();
});




projectSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});




const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
