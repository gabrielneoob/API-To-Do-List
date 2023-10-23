import { Schema, connection, model, Model } from 'mongoose';
import { TaskType } from '../types/task.type';

const schema = new Schema<TaskType>({
  task: {
    type: String,
    required: true
  },
  check: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

const modelName = 'Task'

export default (connection && connection.models[modelName]) ?
(connection.models[modelName] as Model<TaskType>) : model<TaskType>(modelName, schema)