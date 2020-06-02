const router = require('express').Router();
const routes = require('../constants/routes.constants');
const Post = require('../model/post');
const multer = require('multer'); // for extracting the image data
const MIME_TYPE_MAP ={
  'image/png': '.png',
  'image/jpg': '.jpg'
};
const storage = multer.diskStorage({
  destination: (request,file,callback) =>  {
    callback(null, './postUploads');
  },
  filename: (request,file,callback) =>  {
    console.log(file);

    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name);
  }
});


router.get(routes.GET_ALL_POSTS, async (_request, response) => {
  let posts = await Post.find({});
  response.status(200).json(posts);
});

router.post(routes.CREATE_POST, multer({storage: storage}).single('image'), (request, response) => {
  console.log(request.name);
  return;
  const currentUser = JSON.parse(JSON.stringify(request.body.user));
  delete currentUser.friendRequests;
  delete currentUser.friendRequestsPending;
  delete currentUser.token;
  delete currentUser.message;
  const post = new Post({
    text: request.body.text,
    user: currentUser,
    attachment: request.protocol + '://'+ request.get('host') + '/postUploads/' + request.file.filename
  });
  post.save().then(
    posts => response.status(200).json(posts)
  )
    .catch(
      error => {
        console.log(error);

      }
    );
});

module.exports = router;
