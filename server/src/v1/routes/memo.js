const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create,)

//ログインしているユーザーが投稿したメモをすべて取得
router.get("/", tokenHandler.verifyToken, memoController.getAll,)

//ログインしているユーザーが投稿したメモを1つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne,)

//ログインしているユーザーが投稿したメモを1つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.updata,)

module.exports = router;