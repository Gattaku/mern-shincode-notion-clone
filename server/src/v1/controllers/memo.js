const Memo = require("../models/memo");

exports.create = async (req, res) => {
    try {
        const memoCnt = await Memo.find().count();
        //メモ新規作成
        const memo = await Memo.create({
            user: req.user._id,
            position: memoCnt > 0 ? memoCnt : 0,
        });
        res.status(201).json(memo);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.getAll = async (req, res) => {
    try {
        const memos = await Memo.find({ user: req.user._id }).sort("-position")
        res.status(200).json(memos);
    } catch (err) {
        res.status(500).json(err);
    }
}