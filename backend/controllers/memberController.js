const TeamMember = require('../models/TeamMember');

exports.getMembers = async (req, res) => {
  const members = await TeamMember.find();
  res.json(members);
};

exports.addMember = async (req, res) => {
  const member = new TeamMember({ name: req.body.name });
  await member.save();
  res.status(201).json(member);
};

exports.deleteMember = async (req, res) => {
  await TeamMember.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
