import express from 'express';

const app = express();
const profileRoute = require('./routes/profile');



// ...existing code...

app.use('/api/profile', profileRoute);

// ...existing code...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
