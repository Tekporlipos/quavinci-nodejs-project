import mongoose  from 'mongoose';


const MONGODB_URI = "mongodb+srv://dzikunujohn36:U2NBu35cUB3VCNxy@test-one.falgawc.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

export { mongoose };
