import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', ({ view }: HttpContextContract) => {
  return view.render('index')
}).as('index')

Route.get('/dashboard', ({ view }: HttpContextContract) => {
  view.render('dashboard')
}).as('dashboard')

Route.group(() => {
  Route.post('/signin', 'AuthenticationController.signIn').as('signIn')
  Route.post('/signup', 'AuthenticationController.signUp').as('signUp')
}).prefix('auth')

Route.group(() => {
  Route.get('/signin', async ({ view }: HttpContextContract) => {
    return await view.render('auth/signIn')
  }).as('formSignIn')

  Route.get('/signup', async ({ view }: HttpContextContract) => {
    return await view.render('auth/signUp')
  }).as('formSignUp')
}).prefix('form')
