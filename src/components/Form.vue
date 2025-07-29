<template>
  <form @submit.prevent="handleSubmit">
    <div class="box-outer-form">
      <h1 class="main-title">Dados do Pedido</h1>
      <!-- Dados Pessoais -->
      <div class="personal-data-section">
        <div class="input-row">
          <input 
          id="nameField"
          class="input-field"
          v-model="uploadStore.data.name" 
          placeholder="Digite seu nome completo"
          />
          <input 
          id="phoneField"
          class="input-field"
          v-model="uploadStore.data.phone" 
          placeholder="(00)00000-0000" 
          v-imask="maskPhone"
          />
          <!-- <input
          v-model="uploadStore.data.cep"
          type="text"
          placeholder="CEP"
          v-imask="maskCep"
          @blur="uploadStore.cepFetch(uploadStore.data.cep)"
          class="input-field"
          /> -->
        </div>
        </div>
        <!-- <div class="personal-data-section">
          <div class="input-row"> 
            <input
            v-model="uploadStore.data.street"
            type="text"
            placeholder="Rua"
            class="input-field"
            />
            <input
            v-model="uploadStore.data.neighborhood"
            type="text"
            placeholder="Bairro"
            class="input-field"
            />
            <input
            v-model="uploadStore.data.city"
            type="text"
            placeholder="Cidade"
            class="input-field"
            />
          </div>
          <div class="input-row">
            <input
            v-model="uploadStore.data.state"
            type="text"
            placeholder="Estado"
            class="input-field"
            />
            <input
            v-model="uploadStore.data.number"
            type="text"
            placeholder="Número"
            class="input-field"
            />
            <input
            v-model="uploadStore.data.complement"
            type="text"
            placeholder="Complemento"
            class="input-field"
            />
          </div>
        </div> -->
        
        <!-- Upload de Imagens -->
        <div class="upload-section">
          <ImageUpload type="bike" title="Fotos da sua Moto:" />
          <ImageUpload type="kit" title="Fotos do Kit Gráfico escolhido:" />
          <ImageUpload type="sponsorship" title="Suas marcas de patrocínio:" />
        </div>
        
        <!-- Seleção de Fontes -->
        <div class="font-section">
          <FontSelect type="name" title="Nome" />
          <FontSelect type="number" title="Número" />
        </div>
        
        <!-- Textareas -->
        <div class="textarea-section">
          <p class="section-title">Informe a posição de cada patrocínio:</p>
          <textarea 
          class="text-field"
          v-model="uploadStore.data.textSponsorship" 
          placeholder="Informações adicionais"
          ></textarea>
          
          <p class="section-title">Adicione observações e alterações desejadas no modelo do gráfico:</p>
          <textarea 
          class="text-field"
          v-model="uploadStore.data.textDescription" 
          placeholder="Observações"
          ></textarea>
        </div>
        
        <!-- Botão de Envio -->
        <button 
        class="submit-btn"
        :class="{ 'loading': uploadStore.isLoading }"
        :disabled="uploadStore.isLoading || !uploadStore.data.name || !uploadStore.data.phone"
        @click="uploadStore.uploadData"
        >
        {{ uploadStore.isLoading ? 'Enviando...' : 'Enviar Pedido' }}
      </button>
      
      <transition name="fade">
        <div v-if="snackbarVisible" class="snackbar">
          {{ snackbarMessage }}
        </div>
      </transition>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useUploadStore } from '../stores/UploadStore';
import ImageUpload from './form/SelectImages.vue';
import FontSelect from './form/FontSelect.vue';

import { ref, watch } from 'vue';

const uploadStore = useUploadStore();
const snackbarVisible = ref(false);
const snackbarMessage = ref('');

watch(
  () => uploadStore.response,
  (newResponse) => {
    if(newResponse?.message) {
      snackbarMessage.value = newResponse.message;
      snackbarVisible.value = true;
      setTimeout(() => (snackbarVisible.value = false), 3000);
    }
  }
)

const handleSubmit = async () => {
  await uploadStore.uploadData();
}

const maskPhone = {
  mask: '(00) 00000-0000',
};

// const maskCep = {
//   mask: '00000-000',
// };

</script>

<style scoped>

.snackbar {
  position: fixed;
  top: 1rem; /* distância do topo */
  left: 50%;
  transform: translateX(-50%);
  /* background: #333; */
  background: #4caf50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* garante que fique acima do conteúdo */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.personal-data-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.box-outer-form {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.main-title {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

.input-row {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.input-field {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
  color: #1a1a1a;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #4a90e2;
}

.upload-section,
.font-section,
.textarea-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.section-title {
  font-weight: 600;
  color: #444;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.text-field {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  background: #fff;
  color: #1a1a1a;
  transition: border-color 0.3s;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #2c7be5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(.loading) {
  background-color: #1a68d1;
}

.submit-btn.loading {
  background-color: #6c757d;
  cursor: not-allowed;
}

.submit-btn:disabled {
  background-color: #6c757d; /* cinza */
  cursor: not-allowed;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .input-row {
    flex-direction: column;
    gap: 10px;
  }
  
  .box-outer-form {
    padding: 15px;
    margin: 10px;
  }
  
  .upload-section,
  .font-section,
  .textarea-section {
    padding: 15px;
  }
}
</style>