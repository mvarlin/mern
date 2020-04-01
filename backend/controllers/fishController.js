import Fish from '../models/fishModel';

export const addFish = (req, res) => {
  let fish = new Fish(req.body);
  fish.save((err, savedFish) => {
    if (err) {
      res.send(err);
    }
    res.json(savedFish);
  });
};

export const allFish = async (req, res) => {
  const fish = await Fish.find();
  res.json(fish);
};
