import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'

import RegisterForm from '@/views/RegisterFormView.vue'

describe('RegisterForm.vue', () => {
  test('should render the form with empty fields when the component is mounted', () => {
    const wrapper = mount(RegisterForm)

    const username = wrapper.find('#username')
    const email = wrapper.find('#email')
    const password = wrapper.find('#password')
    const confirm = wrapper.find('#confirm')

    expect(username.exists()).toBe(true)
    expect(email.exists()).toBe(true)
    expect(password.exists()).toBe(true)
    expect(confirm.exists()).toBe(true)

    expect(username.element.value).toBe('')
    expect(email.element.value).toBe('')
    expect(password.element.value).toBe('')
    expect(confirm.element.value).toBe('')
  })
})
