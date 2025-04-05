import committee from '../../data/committee.json';

const committeeHandler = (req, res) => {
  res.status(200).json(committee);
};

export default committeeHandler;
