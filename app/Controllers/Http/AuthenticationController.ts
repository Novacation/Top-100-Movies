import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignInUserValidator from 'App/Validators/SignInUserValidator'
import SignUpUserValidator from 'App/Validators/SignUpUserValidator'

export default class AuthenticationController {
  public async signIn({ request, response, auth, session }: HttpContextContract) {
    const signInValidator = new SignInUserValidator(request.ctx!)
    const payload = await request.validate({
      schema: signInValidator.schema,
      messages: signInValidator.messages,
    })
    console.log(payload)

    try {
      const result = await auth.use('web').attempt(payload.username, payload.password)

      console.log('result')
      console.log(result)

      return response.redirect('/dashboard')
    } catch (error) {
      console.log(error)

      session.flash('invalidCredentials', 'Invalid credentials.')

      return response.redirect().back()
    }
  }

  public async signUp({ request, response, auth }: HttpContextContract) {
    const signUpValidator = new SignUpUserValidator(request.ctx!)
    const payload = await request.validate({
      schema: signUpValidator.schema,
      messages: signUpValidator.messages,
    })

    try {
      const user = await User.create(payload)
    } catch (e) {
      return response.json({ error: 'Something gone wrong! Try again later.' })
    }
  }
}
