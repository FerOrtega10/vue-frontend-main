<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref } from 'vue'
import { useForm } from '../composables/useForm'
/*
  Nombre                Requerido | Máximo 64 letras
  Email                 Requerido | Formato Email
  Contraseña            Requerido | 8 caracteres alfanuméricos, un número y un caracter especial
  Repetir Contraseña    Requerido | Misma contraseña que la anterior
*/

const initialData = {
  username: '',
  email: '',
  password: '',
  confirm: ''
}

const validations = {
  username: [
    { validate: value => !!value, error: 'El nombre es un campo requerido.' },
    { validate: value => value.length <= 64, error: 'El nombre debe tener un máximo de 64 letras.' }
  ],
  email: [
    { validate: value => !!value, error: 'El email es un campo requerido.' },
    { validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), error: 'El formato del email no es válido.' }
  ],
  password: [
    { validate: value => !!value, error: 'La contraseña es un campo requerido.' },
    { validate: value => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/.test(value), error: 'La contraseña debe tener 8 caracteres alfanuméricos, un número y un caracter especial.' }
  ],
  confirm: [
    { validate: value => !!value, error: 'El campo de confirmar contraseña es requerido.' },
    { validate: (value, form) => value === form.password, error: 'Las contraseñas no coinciden.' }
  ]
}

const {
  formData,
  formErrors,
  isFormValid,
  handleChange,
  validateForm,
  resetForm
} = useForm(initialData, validations)

const isSubmitted = ref(false)

const submit = () => {
  if (validateForm()) {
    console.log('Formulario válido:', formData)
    isSubmitted.value = true
    resetForm()
  } else {
    console.log('Formulario con errores:', formErrors)
  }
}
</script>

<template>
  <MainLayout>
    <form
      class="bg-white p-10 rounded-lg shadow-lg min-w-full"
      @submit.prevent="submit"
      data-testid="registration-form"
    >
      <div>
        <label
          class="font-semibold block my-3 text-md"
          for="username"
        >
          Username
        </label>
        <input
          id="username"
          class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
          type="text"
          name="username"
          placeholder="username"
          :value="formData.username"
          @input="handleChange('username', $event.target.value)"
          data-testid="username-input"
        >
         <p v-if="formErrors.username" class="text-red-500 text-sm mt-1" data-testid="username-error">{{ formErrors.username }}</p>
      </div>
      <div>
        <label
          class="font-semibold block my-3 text-md"
          for="email"
        >
          Email
        </label>
        <input
          id="email"
          class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
          type="email"
          name="email"
          placeholder="@email"
          :value="formData.email"
          @input="handleChange('email', $event.target.value)"
          data-testid="email-input"
        >
       <p v-if="formErrors.email" class="text-red-500 text-sm mt-1" data-testid="email-error">{{ formErrors.email }}</p>
      </div>
      <div>
        <label
          class="font-semibold block my-3 text-md"
          for="password"
        >
          Password
        </label>
        <input
          id="password"
          class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
          type="text"
          name="password"
          placeholder="password"
          :value="formData.password"
          @input="handleChange('password', $event.target.value)"
          data-testid="password-input"
        >
        <p v-if="formErrors.password" class="text-red-500 text-sm mt-1" data-testid="password-error">{{ formErrors.password }}</p>
      </div>
      <div>
        <label
          class="font-semibold block my-3 text-md"
          for="confirm"
        >
          Confirm password
        </label>
        <input
          id="confirm"
          class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
          type="text"
          name="confirm"
          placeholder="confirm password"
          :value="formData.confirm"
          @input="handleChange('confirm', $event.target.value)"
          data-testid="confirm-input"
        >
        <p v-if="formErrors.confirm" class="text-red-500 text-sm mt-1" data-testid="confirm-error">{{ formErrors.confirm }}</p>
      </div>
      <button
        type="submit"
        class="w-full mt-6 rounded-lg px-4 py-2 text-lg text-white font-semibold font-sans bg-primary"
        :class="{'opacity-60 cursor-not-allowed':!isFormValid}"
        :disabled="!isFormValid"
        data-testid="submit-button"
      >
        Register
      </button>
    </form>

    <div v-if="isSubmitted" class="text-green-500 font-bold mt-4" data-testid="success-message">
      ¡Registro exitoso!
    </div>
  </MainLayout>
</template>

<style>

</style>