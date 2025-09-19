import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactCard from '@/components/ContactCard.vue'

describe('ContactCard', () => {
  const defaultProps = {
    label: 'Test Label',
    data: 'Test Data'
  }

  it('renders with required props', () => {
    const wrapper = mount(ContactCard, {
      props: defaultProps
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Label')
    expect(wrapper.text()).toContain('Test Data')
  })

  it('displays the correct label and data', () => {
    const wrapper = mount(ContactCard, {
      props: {
        label: 'Email',
        data: 'ferortega@dominio.com'
      }
    })

    const labelElement = wrapper.find('[data-testid="contact-card-label"]')
    const dataElement = wrapper.find('[data-testid="contact-card-data"]')

    expect(labelElement.text()).toBe('Email')
    expect(dataElement.text()).toBe('ferortega@dominio.com')
  })

  it('renders icon slot content', () => {
    const wrapper = mount(ContactCard, {
      props: defaultProps,
      slots: {
        icon: '<span class="test-icon">...</span>'
      }
    })

    const iconSlot = wrapper.find('.flex-shrink-0')
    expect(iconSlot.exists()).toBe(true)
    expect(iconSlot.text()).toBe('...')
    expect(iconSlot.find('.test-icon').exists()).toBe(true)
  })
})