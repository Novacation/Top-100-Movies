import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignInUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.maxLength(18), rules.minLength(8)]),
    password: schema.string({ trim: true }, [rules.maxLength(18), rules.minLength(8)]),
  })

  public messages = {
    required: 'The {{ field }} is required',
    minLength: 'The {{ field }} must have at least {{ options.minLength }} characters',
    maxLength: "The {{ field }} can't have more than {{ options.maxLength }} characters",
  }
}
