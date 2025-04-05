import committee from '../../data/committee.json';
export default (req, res) => {
  res.status(200).json(committee);
};
