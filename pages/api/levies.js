import levies from '../../data/levies.json';
export default (req, res) => {
  res.status(200).json(levies);
};
