<template>
  <div class="box-outer-form">
    <h1 class="main-title">Dados do Pedido</h1>
    
    <!-- Dados Pessoais -->
    <div class="form-section">
      <div class="input-row">
        <label for="nameField" class="input-label">Nome Completo</label>
        <div class="input-group">
          <input 
            id="nameField"
            class="input-field"
            v-model="uploadStore.data.name" 
            placeholder="Digite seu nome completo"
          />
        </div>
        
        <label for="phoneField" class="input-label">Telefone</label>
        <div class="input-group">
          <input 
            id="phoneField"
            class="input-field"
            v-model="uploadStore.data.phone" 
            placeholder="(00)00000-0000" 
            v-imask="maskPhone"
          />
        </div>
      </div>
    </div>

    <!-- Upload de Imagens -->
    <div class="upload-section">
      <ImageUpload type="bike" title="Bike" />
      <ImageUpload type="sponsorship" title="Patrocínio" />
      <ImageUpload type="kit" title="Kit gráfico" />
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
      :disabled="uploadStore.isLoading"
      @click="uploadStore.uploadData"
    >
      {{ uploadStore.isLoading ? 'Enviando...' : 'Enviar Pedido' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUploadStore } from '../stores/UploadStore';
import ImageUpload from './form/SelectImages.vue';
import FontSelect from './form/FontSelect.vue';

const maskPhone = {
  mask: '(00)00000-0000',
};

const uploadStore = useUploadStore();
</script>

<style scoped>
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