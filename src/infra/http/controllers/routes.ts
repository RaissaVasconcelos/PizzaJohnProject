import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { OAuthEfi } from "./efi-pay/pix";
import {
  CreateCustomerController,
  AuthenticateController
} from "./customer";

import {
  CreateProductController,
  FindByIdProductController,
  FindManyProductController,
  UpdateProductController,
  DeleteProductController
} from './product'

import {
  CreateCategoryController,
  DeleteCategoryController,
  FindByIdCategoryController,
  FindManyCategoryController,
  UpdateCategoryController } from './category'
  
import {
  CreateOrderController,
  FindByIdOrderController, 
  FindManyOrderController,
  UpdateOrderController
} from './order'

import {
  CreateNeighborhoodController,
  FindManyNeighborhoodController,
} from './neighborhood'

import {
  CreateAddressController,
  FindManyAddressController,
} from './address'


export const Routes = async (app: FastifyInstance) => {

  /* Routes Customer */
  app.post('/sessions', AuthenticateController)
  app.post('/customer', CreateCustomerController)

  /* Routes Product */
  app.get('/product/:id', FindByIdProductController)
  app.get('/product', FindManyProductController)
  app.post('/product', CreateProductController)
  app.put('/product', UpdateProductController)
  app.delete('/product/:id', DeleteProductController)

  /* Routes Category */
 app.get('/category/:id', FindByIdCategoryController)
 app.get('/category', FindManyCategoryController)
 app.post('/category', CreateCategoryController)
 app.put('/category', UpdateCategoryController)
 app.delete('/category/:id', DeleteCategoryController)

 /** Route pix */
 app.post('/pix', OAuthEfi)

 /** Route Order */
 app.post('/order', CreateOrderController)
 app.get('/order/:id', FindByIdOrderController)
 app.get('/order', FindManyOrderController)
 app.put('/order', UpdateOrderController)

// Routes Neighborhood
app.get('/neighborhood', FindManyNeighborhoodController)
app.post('/neighborhood', CreateNeighborhoodController)

// Routes Address
app.post('/address', { onRequest: [verifyJWT] }, CreateAddressController)
app.get('/address', {onRequest: [verifyJWT]}, FindManyAddressController)  
}
