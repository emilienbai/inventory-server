import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    avantage: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    restrictions: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
});

promoCodeSchema.statics.validate = (body: any) => {
    if (!body.name) {
        throw new Error("Title must be specified");
    }
    if (!body.avantage) {
        throw new Error("Avantage must be specified")
    }
    if (!body.restrictions) {
        throw new Error("Restrictions must be specified")
    }
}

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

export default PromoCode;