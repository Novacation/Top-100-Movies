import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SignInUserValidator from 'App/Validators/SignInUserValidator'
import SignUpUserValidator from 'App/Validators/SignUpUserValidator'

export default class AuthenticationController {
  public async signIn({ request, response, auth }: HttpContextContract) {
    const signInValidator = new SignInUserValidator(request.ctx!)
    const payload = await request.validate({
      schema: signInValidator.schema,
      messages: signInValidator.messages,
    })

    try {
      const user = await auth.use('api').verifyCredentials(payload.username, payload.password)
      const token = await auth.use('api').generate(user)

      return response.status(200).json({ token })
    } catch (error) {
      return response.status(401).json({ error: 'Invalid credentials' })
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
      const token = await auth.use('api').generate(user, { expiresIn: '1days' })

      return response.status(200).json({ token })
    } catch (e) {
      return response.status(401).json({ error: 'Something gone wrong! Try again later.' })
    }
  }
}
