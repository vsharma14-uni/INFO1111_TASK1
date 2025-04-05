import levies from '../../data/levies.json';

const leviesHandler = (req, res) => {
  res.status(200).json(levies);
};

export default leviesHandler;
