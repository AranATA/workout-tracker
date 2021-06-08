const mongoose = require("mongoose");

// Mongoose Schema
const Schema = mongoose.Schema;

// Create new workout schema
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  exercises: [
    {
      name : {
        type : String,
        trim : true,
        required : "Enter Exercise Name"
      },
      type : {
        type: String,
        trim : true,
        required : "Enter Exercise Type"
      },
      distance : {
        type : Number
      },
      duration : {
        type : Number,
        required : "Enter Exercise Duration"
      },
      weight: {
        type : Number
      },
      sets: {
        type : Number
      },
      reps: {
        type : Number
      }
    }
  ]
});

// Mongoose virtual property, "totalDuration" which will not be stored in MongoDB.

WorkoutSchema.virtual("totalDuration").get(function() {
  let totalDuration = 0;
  this.exercises.forEach(exercise => {
    totalDuration += exercise.duration;
  });
  return totalDuration;
});

// Since virtuals are not included by default when passing a document to Express' res.json() function, the toJSON schema option needs to be set to { virtuals: true }.

// https://mongoosejs.com/docs/tutorials/virtuals.html

WorkoutSchema.set('toJSON', { virtuals: true });

// Create mongoose model 'workout' and apply workout schema to that model
const Workout = mongoose.model("workout", WorkoutSchema);

// Export workout model
module.exports = Workout;