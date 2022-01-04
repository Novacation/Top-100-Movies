import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignUpUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.maxLength(60),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    username: schema.string({ trim: true }, [
      rules.maxLength(18),
      rules.minLength(8),
      rules.unique({ table: 'users', column: 'username' }),
      rules.required(),
    ]),
    password: schema.string({ trim: true }, [rules.maxLength(18), rules.minLength(8)]),
    nickname: schema.string({ trim: true }, [
      rules.maxLength(13),
      rules.minLength(3),
      rules.unique({ table: 'users', column: 'nickname' }),
    ]),
  })

  public messages = {
    'required': 'The {{ field }} is required to create a new account',
    'email.unique': 'E-mail already in use',
    'email': 'Type a valid e-mail',
    'username.unique': 'Username already in use',
    'nickname.unique': 'Nickname already in use',
    'minLength': 'The {{ field }} must have at least {{ options.minLength }} characters',
    'maxLength': "The {{ field }} can't have more than {{ options.maxLength }} characters",
  }
}
