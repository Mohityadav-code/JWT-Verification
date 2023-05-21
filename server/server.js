const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require('./routes/authRoutes');
const verifyJWT = require("./utils/validator");


mongoose.connect('mongodb+srv://mohityadav3552:HqnaHCf_3E3Td3Q@cluster0.mfadw7s.mongodb.net/jwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const app = express();

app.use(express.json());

app.use('/api/auth', AuthRoutes);

app.get('/api/protected', verifyJWT, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
