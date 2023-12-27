import mongoose, { Document, Schema } from 'mongoose';

interface Brend extends Document {
  namebrend: string;
  location: string;
  phone: string;
  nameGerent: string;
  idOffice: string;
  description: string;
}

const brendSchema = new Schema<Brend>({
  namebrend: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  nameGerent: { type: String, required: true },
  idOffice: { type: String, required: true },
  description: { type: String, required: true },
});

const BrendModel = mongoose.model<Brend>('Brend', brendSchema);

export default BrendModel;
