import express from 'express' ;
import { createPlan, getAllPlans , getPlanById , deleteAllPlans , deletePlanById , editPlanById , markAsDone} from '../controllers/plans.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router() ;

router.post('/createPlan' , verifyJWT , upload.array("images",5) , createPlan) ;
router.get('/getAllPlans' , verifyJWT , getAllPlans) ;
router.delete('/deleteAllPlans' , verifyJWT , deleteAllPlans) ;
router.delete('/deletePlan/:id' , verifyJWT , deletePlanById) ;
router.put('/editPlan/:id' , verifyJWT , upload.array("images",5) ,editPlanById) ;
router.patch('/markAsDone/:id' , verifyJWT , markAsDone) ;
router.get('/getPlanById/:id' , verifyJWT , getPlanById) ;

export default router ;