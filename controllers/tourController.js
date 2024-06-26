const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  //   console.log(req.params);

  const id = req.params.id * 1; // converting string to number
  const tour = tours.find((el) => el.id === id);
  if (!tour) res.status(201).json({ status: 'fail', message: 'Invalid ID' });
  res.status(200).json({ status: 'success', data: { tour } });
};
exports.createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({ status: 'success', data: { newTour } });
    }
  );
};

exports.updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length)
    res.status(201).json({ status: 'fail', message: 'Invalid ID' });
  res.status(200).json({ status: 'success', data: '<UPDATED TOUR HERE...>' });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length)
    res.status(201).json({ status: 'fail', message: 'Invalid ID' });
  res.status(204).json({ status: 'success', data: null });
};
