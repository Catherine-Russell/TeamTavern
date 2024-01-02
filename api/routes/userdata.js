const express = require("express");
const router = express.Router();

const UserdataController = require("../controllers/userdata");

router.get("/", UserdataController.Index);
router.get("/:id", UserdataController.FindByID);
router.post("/addfriend", UserdataController.addFriend);



module.exports = router;
