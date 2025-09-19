<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { computed, ref } from 'vue'
import Card from '@/components/Card.vue'
import ContactCard from '@/components/ContactCard.vue'
import InformationItem from '@/components/InformationItem.vue'

const userData = {
  id: 1,
  firstName: 'Terry',
  lastName: 'Medhurst',
  maidenName: 'Smitham',
  age: 50,
  gender: 'male',
  email: 'atuny0@sohu.com',
  phone: '+63 791 675 8914',
  username: 'atuny0',
  password: '9uQFF1Lh',
  birthDate: '2000-12-25',
  image: 'https://robohash.org/hicveldicta.png?size=150x150&set=set1',
  bloodGroup: 'A+',
  height: 189,
  weight: 75.4,
  eyeColor: 'Green',
  hair: {
    color: 'Black',
    type: 'Strands',
  },
  domain: 'slashdot.org',
  ip: '117.29.86.254',
  address: {
    address: '1745 T Street Southeast',
    city: 'Washington',
    coordinates: {
      lat: 38.867033,
      lng: -76.979235,
    },
    postalCode: '20020',
    state: 'DC',
  },
  macAddress: '13:69:BA:56:A3:74',
  university: 'Capitol University',
  bank: {
    cardExpire: '06/22',
    cardNumber: '50380955204220685',
    cardType: 'maestro',
    currency: 'Peso',
    iban: 'NO17 0695 2754 967',
  },
  company: {
    address: {
      address: '629 Debbie Drive',
      city: 'Nashville',
      coordinates: {
        lat: 36.208114,
        lng: -86.58621199999999,
      },
      postalCode: '37076',
      state: 'TN',
    },
    department: 'Marketing',
    name: "Blanda-O'Keefe",
    title: 'Help Desk Operator',
  },
  ein: '20-9487066',
  ssn: '661-64-2976',
}

const companyAddress = computed(() => 
  `${userData.company.address.address}, ${userData.company.address.city}, ${userData.company.address.state}, ${userData.company.address.postalCode}`
)

const personalAddress = computed(() => 
  `${userData.address.address}, ${userData.address.city}, ${userData.address.state}, ${userData.address.postalCode}`
)

const fullName = computed(() => 
  `${userData.firstName} ${userData.lastName} (${userData.maidenName})`
)

const hairInfo = computed(() => 
  `${userData.hair.color}, ${userData.hair.type}`
)

const coordinates = computed(() => 
  `${userData.address.coordinates.lat}, ${userData.address.coordinates.lng}`
)

const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <MainLayout>
    <div class="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-200">
        <h1 class="text-3xl font-bold text-indigo-600">Información de Usuario</h1>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Profile Card -->
           <Card title="Perfil de Usuario">
            <div class="flex flex-col items-center">
              <img :src="userData.image" alt="Profile" class="w-32 h-32 rounded-full border-4 border-indigo-100 object-cover mb-4">
              <h2 class="text-2xl font-bold text-gray-800">{{ userData.firstName }} {{ userData.lastName }}</h2>
              <p class="text-gray-500 mt-1">{{ userData.company.title }}</p>
              
              <div class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mt-3 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                {{ userData.company.department }}
              </div>
            </div>
            
            <div class="mt-6 space-y-4">
              <ContactCard
                label="Email"
                :data="userData.email"
              >
                <template #icon>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </template>
              </ContactCard>

              <ContactCard
                label="Teléfono"
                :data="userData.phone"
              >
                <template #icon>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </template>
              </ContactCard>

              <ContactCard
                label="Dirección"
                :data="personalAddress"
              >
                <template #icon>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                </template>
              </ContactCard>
              
              <ContactCard
                label="Dominio"
                :data="userData.domain"
              >
                <template #icon>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                  </svg>
                </template>
              </ContactCard>
            </div>
           </Card>
          
          <!-- Bank Information -->
          <Card title="Información Bancaria">
            <div class="space-y-4">
              <InformationItem
                label="Tipo de Tarjeta"
                :data="userData.bank.cardType"
              />
              <InformationItem
                label="Número de Tarjeta"
                :data="userData.bank.cardNumber"
              />
              <InformationItem
                label="Expira"
                :data="userData.bank.cardExpire"
              />
              <InformationItem
                label="IBAN"
                :data="userData.bank.iban"
              />
              <InformationItem
                label="Moneda"
                :data="userData.bank.currency"
              />
            </div>
          </Card>
        </div>
        
        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Information -->
          <Card title="Información Personal">
            <h2 class="text-xl font-semibold text-gray-800 mb-5 pb-4 border-b border-gray-100">Información Personal</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InformationItem
                label="Nombre Completo"
                :data="fullName"
              />

              <InformationItem
                label="Edad"
                :data="`${userData.age} años`"
              />
              
              <InformationItem
                label="Género"
                :data="userData.gender"
              />
                            
              <InformationItem
                label="Fecha de Nacimiento"
                :data="userData.birthDate"
              />

              <InformationItem
                label="Altura"
                :data="`${userData.height} cm`"
              />
              
              <InformationItem
                label="Peso"
                :data="`${userData.weight} kg`"
              />
              
              <InformationItem
                label="Grupo Sanguíneo"
                :data="userData.bloodGroup"
              />

              <InformationItem
                label="Color de Ojos"
                :data="userData.eyeColor"
              />

              <InformationItem
                label="Color de Ojos"
                :data="hairInfo"
              />
            </div>
          </Card>
          
          <!-- Work Information -->
          <Card title="Información">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InformationItem
                label="Compañía"
                :data="userData.company.name"
              />

              <InformationItem
                label="Cargo"
                :data="userData.company.title"
              />

              <InformationItem
                label="Departamento"
                :data="userData.company.department"
              />

              <InformationItem
                label="Dirección de la compañía"
                :data="companyAddress"
              />
            </div>
          </Card>

          <!-- Academic Information -->
          <Card title="Información Académica">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InformationItem
                label="Universidad"
                :data="userData.university"
              />
            </div>
          </Card>
          
          <!-- Security Information -->
          <Card title="Información de Seguridad">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InformationItem
                label="Nombre de ususrio"
                :data="userData.username"
              />
              
              <div>
                <p class="text-xs text-gray-500">Contraseña</p>
                <div class="flex items-center">
                  <p class="text-sm font-medium text-gray-900 mr-2">
                    {{ showPassword ? userData.password : '••••••••' }}
                  </p>
                  <button 
                    @click="togglePasswordVisibility" 
                    class="text-gray-500 hover:text-indigo-600 focus:outline-none"
                    :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                  >
                    <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <InformationItem
                label="EIN"
                :data="userData.ein"
              />

              <InformationItem
                label="SSN"
                :data="userData.ssn"
              />

              <InformationItem
                label="MAC Address"
                :data="userData.macAddress"
              />

              <InformationItem
                label="IP"
                :data="userData.ip"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
