import { ref, reactive, computed } from 'vue'

export function useForm(initialData, validations) {
  const formData = reactive({ ...initialData })
  const formErrors = reactive({})
  const isDirty = ref(false)

  const validateField = (field) => {
    delete formErrors[field]
    const rules = validations[field]
    if (!rules) return

    for (const rule of rules) {
      const isValid = rule.validate(formData[field], formData)
      if (!isValid) {
        formErrors[field] = rule.error
        break
      }
    }
  }

  const validateForm = () => {
    Object.keys(formData).forEach(validateField)
    return Object.keys(formErrors).length === 0
  }

  const handleChange = (field, value) => {
    formData[field] = value
    isDirty.value = true
    validateField(field)
  }

  const resetForm = () => {
    Object.keys(initialData).forEach(key => {
      formData[key] = initialData[key]
    })
    Object.keys(formErrors).forEach(key => {
      delete formErrors[key]
    })
    isDirty.value = false
  }

  const hasErrors = computed(() => Object.keys(formErrors).length > 0)
  const isFormValid = computed(() => !hasErrors.value && isDirty.value)

  return {
    formData,
    formErrors,
    hasErrors,
    isFormValid,
    handleChange,
    validateForm,
    resetForm,
  }
}