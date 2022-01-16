/* import axios from 'axios'
import $ from 'jquery'
import { has } from 'lodash'

const sendForm = document.getElementById('signinForm')
const sendBtn = document.getElementById('sendBtn')

sendBtn.addEventListener('click', async function sendForm() {
  const usernameInput = $('#username')
  const passwordInput = $('#password')

  deleteErrors()

  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3333/auth/signin',
      data: {
        username: usernameInput.val(),
        password: passwordInput.val(),
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (has(result, 'data.error')) {
      const credentialsError = $('<p class="absolute text-rose-600 adonisError"></p>')
      credentialsError.text(result.data.error)
      passwordInput.after(credentialsError)
    } else {
      localStorage.setItem('userToken', result.data.token.token)
      window.location.replace('http://127.0.0.1:3333/dashboard')
    }
  } catch (error) {
    if (has(error, 'response.data.errors')) {
      const errorsArray = error.response.data.errors

      errorsArray.forEach((errorObj) => {
        if (errorObj.field === 'username') {
          const usernameError = $('<p class="absolute text-rose-600 adonisError"></p>')
          usernameError.text(errorObj.message)
          usernameInput.after(usernameError)
        } else if (errorObj.field === 'password') {
          const passwordError = $('<p class="absolute text-rose-600 adonisError"></p>')
          passwordError.text(errorObj.message)
          passwordInput.after(passwordError)
        }
      })
    }
  }
})

function deleteErrors() {
  const errors = $('.adonisError')

  if (errors.length) {
    for (let index = 0; index < errors.length; index++) {
      errors[index].remove()
    }
  }
}

document.getElementById('username').addEventListener('focusin', () => {
  deleteErrors()
})

document.getElementById('password').addEventListener('focusin', () => {
  deleteErrors()
})

sendForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
})
 */