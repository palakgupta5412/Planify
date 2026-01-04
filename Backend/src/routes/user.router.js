import express from 'express' ;
import {upload} from '../middlewares/multer.middleware.js'
import { register , login, logout , getCurrentUser } from '../controllers/user.controller.js' ;
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router() ;

router.post('/register' , upload.single("pfp") , register) ;
router .post('/login' , login) ;
router .post('/logout' , verifyJWT , logout) ;
router.get('/me' , verifyJWT , getCurrentUser) ;
export default router ;