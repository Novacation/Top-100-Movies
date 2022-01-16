import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/signin', 'AuthenticationController.signIn').as('signIn')
  Route.post('/signup', 'AuthenticationController.signUp').as('signUp')
}).prefix('auth')

//Render

Route.get('/', async ({ view }: HttpContextContract) => {
  return await view.render('index')
}).as('index')

Route.get('/dashboard', async ({ view }: HttpContextContract) => {
  return await view.render('users/dashboard')
}).as('dashboard')

Route.group(() => {
  Route.get('/signin', async ({ view, auth }: HttpContextContract) => {
    try {
      await auth.use('web').authenticate()
      return await view.render('dashboard')
    } catch (error) {
      return await view.render('auth/signIn')  
    }
    
  }).as('formSignIn')

  Route.get('/signup', async ({ view }: HttpContextContract) => {
    return await view.render('auth/signUp')
  }).as('formSignUp')
}).prefix('form')
