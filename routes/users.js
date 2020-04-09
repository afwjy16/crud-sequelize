var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

let {
  viewUser,
  viewAdd,
  actionCreate,
  viewEdit,
  actionUpdate,
  actionDelete,
  actionUpdateStatus,
} = require ("../controllers/userController");

router.get("/users", viewUser);
router.get("/users/add", viewAdd);
router.post("/users/create", actionCreate);
router.get("/users/edit/:id", viewEdit);
router.post("/users/update", actionUpdate);
router.get("/users/status/:id", actionUpdateStatus)
router.get("/users/delete/:id", actionDelete);

module.exports = router;
