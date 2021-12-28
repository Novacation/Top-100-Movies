import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenticationController {
  public async authenticate({ response, auth }: HttpContextContract) {
    try {
      await auth.authenticate()
    } catch (error) {
      console.log(error)
    }
  }

  public async register() {}
}
