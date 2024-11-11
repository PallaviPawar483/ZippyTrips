const express = require('express');
const bodyParser = require('body-parser');
const { Trip } = require('./models');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

// validation middleware post and put methods fields should not be empty
const validateFields = (req, res, next) => {
  const { name, location, price } = req.body;
  if (!name || !location || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  next();
}


// CREATE a new trip
app.post('/trips',validateFields, async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ all trips
app.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ a single trip by ID
app.get('/trips/:id', async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a trip by ID
app.put('/trips/:id',validateFields, async (req, res) => { // Updated the route to use PUT method
  try {
    const [updated] = await Trip.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTrip = await Trip.findByPk(req.params.id);
      res.status(200).json(updatedTrip);
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a trip by ID
app.delete('/trips/:id', async (req, res) => { // Updated the route to use DELETE method
  try {
    const deleted = await Trip.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Trip not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
