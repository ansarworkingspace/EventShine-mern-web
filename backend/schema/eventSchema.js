import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema({
 
 eventName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  youtubeLink: {
    type: String,
  },
  scheduleDate: {
    type: Date,
    required: true,
  },
  scheduleTime: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
}
,
  {
    timestamps: true
  }
);

const Events = mongoose.model('Events', eventSchema);

export default Events;


