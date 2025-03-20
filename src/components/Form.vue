<template>
  <div class="box-outer-form">
    <h1>Form</h1>

    <div class="box-inner-form container">
      <div >
        <input class="input-form" v-model="uploadStore.data.name" placeholder="Nome" />
        <input class="input-form" v-model="uploadStore.data.cpf" placeholder="000.000.000-00" v-mask="'###.###.###-##'" />
      </div>
      <div>
        <input class="input-form" v-model="uploadStore.data.email" placeholder="exemplo@exemplo.com" />
        <span v-if="uploadStore.data.email && !isValidEmail" class="error-input-email">
          Email inválido
        </span>
        <input class="input-form" v-model="uploadStore.data.phone" placeholder="(00)00000-0000" v-mask="'(##)#####-####'" />
      </div>
    </div>
    
    <hr />
    
    <div>
      <p class="section-title">Fotos da Moto / Modelo Carenagem:</p>
      <div>
        <input ref="file" multiple type="file" accept="image/*" @change="handleFilesBike"/>
      </div>
      <div v-if="filesBike.length > 0">
        <div v-for="(file, index) in filesBike" :key="index" class="image-preview">
          <img :src="getImagePreviewBike(file)" alt="Preview"/>
          <button class="remove-button" @click="removeImageBike(index)">Remover</button>
        </div>
        <button class="clear-button" @click="clearImagesBike">Limpar imagens</button>
      </div>
      <p v-else>Nenhuma imagem selecionada</p>
    </div>
    
    <hr />

    <div>
      <p class="section-title">Fotos do Modelo do Kit grafico escolhido:</p>
      <div>
        <input ref="file" multiple type="file" accept="image/*" @change="handleFilesKit"/>
      </div>
      <div v-if="filesKit.length > 0">
        <div v-for="(file, index) in filesKit" :key="index" class="image-preview">
          <img :src="getImagePreviewKit(file)" alt="Preview"/>
          <button class="remove-button" @click="removeImageKit(index)">Remover</button>
        </div>
        <button class="clear-button" @click="clearImagesKit">Limpar imagens</button>
      </div>
      <p v-else>Nenhuma imagem selecionada</p>
    </div>

    <hr />

    <div>
      <p class="section-title">Marca / Patrocinios:</p>
      <div>
        <input ref="file" multiple type="file" accept="image/*" @change="handleFilesSponsorship"/>
      </div>
      <div v-if="filesSponsorship.length > 0">
        <div v-for="(file, index) in filesSponsorship" :key="index" class="image-preview">
          <img :src="getImagePreviewSponsorship(file)" alt="Preview"/>
          <button class="remove-button" @click="removeImageSponsorship(index)">Remover</button>
        </div>
        <button class="clear-button" @click="clearImagesSponsorship">Limpar imagens</button>
      </div>
      <p v-else>Nenhuma imagem selecionada</p>

    </div>

    <hr />

    <div>
      <p class="section-title">Fonte - Número | Fonte tipo: {{ uploadStore.data.fontNumberType }}</p>
      <div>
        <input type="radio" id="type_1" value="1" v-model="uploadStore.data.fontNumberType"/>
        <label for="type_1">
          Fonte 1
        </label>
      </div>
      <div>
        <input type="radio" id="type_2" value="2" v-model="uploadStore.data.fontNumberType"/>
        <label for="type_2">
          Fonte 2
        </label>
      </div>
      <div>
        <input type="radio" id="type_3" value="3" v-model="uploadStore.data.fontNumberType"/>
        <label for="type_3">
          Fonte 3
        </label>
      </div>
      <div>
        <input type="radio" id="type_4" value="4" v-model="uploadStore.data.fontNumberType"/>
        <label for="type_4">
          Fonte 4
        </label>
      </div>
    </div>

    <hr />

    <div>
      <p class="section-title">Fonte - Nome | Fonte tipo: {{ uploadStore.data.fontNameType }}</p>
      <div>
        <input type="radio" id="type_1" value="1" v-model="uploadStore.data.fontNameType"/>
        <label for="type_1">
          Fonte 1
        </label>
      </div>
      <div>
        <input type="radio" id="type_2" value="2" v-model="uploadStore.data.fontNameType"/>
        <label for="type_2">
          Fonte 2
        </label>
      </div>
      <div>
        <input type="radio" id="type_3" value="3" v-model="uploadStore.data.fontNameType"/>
        <label for="type_3">
          Fonte 3
        </label>
      </div>
      <div>
        <input type="radio" id="type_4" value="4" v-model="uploadStore.data.fontNameType"/>
        <label for="type_4">
          Fonte 4
        </label>
      </div>
    </div>

    <hr />

    <div>
      <p class="section-title">Informe a posição de cada patrocinio:</p>
      <textarea class="textarea-form" v-model="uploadStore.data.textSponsorship" placeholder="Informações adicionais"></textarea>
    </div>

    <hr />

    <div>
      <p class="section-title">Adicione observações e alterações desejadas no modelo do gráfico:</p>
      <label>
        <textarea class="textarea-form" v-model="uploadStore.data.textDescription" placeholder="Observações"></textarea>
      </label>
    </div>

    <hr />

    <button type="submit" class="submit-button" :disabled="uploadStore.isLoading" @click="uploadStore.uploadData">
      {{ uploadStore.isLoading ? 'Enviando...' : 'Enviar' }}
    </button>  
    
    <hr />
    {{ uploadStore.response }}
  </div>
</template>

<script setup lang="ts">
import { useUploadStore } from '../stores/UploadStore';
import { computed } from 'vue';

const uploadStore = useUploadStore();

const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(uploadStore.data.email);
})

// passa a imagem para o store
const handleFilesBike = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  const files = target.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      uploadStore.addBikePhoto(files[i]);
    }
  }
}

const handleFilesKit = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  const files = target.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      uploadStore.addKitPhoto(files[i]);
    }
  }
}

const handleFilesSponsorship = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  const files = target.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      uploadStore.addSponsorshipPhoto(files[i]);
    }
  }
}

// cria url da imagem para preview
const getImagePreviewBike = (file: File) => {
  return URL.createObjectURL(file);
}

const getImagePreviewKit = (file: File) => {
  return URL.createObjectURL(file);
}

const getImagePreviewSponsorship = (file: File) => {
  return URL.createObjectURL(file);
}

const removeImageBike = (index: number) => {
  uploadStore.removeBikePhoto(index);
}

const clearImagesBike = () => {
  uploadStore.clearBikePhotos();
}

const removeImageKit = (index: number) => {
  uploadStore.removeKitPhoto(index);
}

const clearImagesKit = () => {
  uploadStore.clearKitPhotos();
}

const removeImageSponsorship = (index: number) => {
  uploadStore.removeSponsorshipPhoto(index);
}

const clearImagesSponsorship = () => {
  uploadStore.clearSponsorshipPhotos();
}

const filesBike = computed(() => uploadStore.bikePhotos);
const filesKit = computed(() => uploadStore.kitPhotos);
const filesSponsorship = computed(() => uploadStore.sponsorshipPhotos);

</script>

<style lang="css">

.textarea-form {
  width: 80%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  background-color: #ffffff;
  color: #1f1f1f;
}

.section-title {
  font-weight: bold;
  font-size: 0.85rem;
}

.image-preview {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
}

img {
  max-width: 100px;
  max-height: 100px;
  display: block;
  margin-bottom: 10px;
}

button {
  padding: 0.75rem;
  border: none;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.upload-button {
  background-color: #0d141b;
  color: white;
}
.upload-button:hover {
  background-color: #000000;
}

.submit-button {
  width: 100%;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
}
.submit-button:hover {
  background-color: #0056b3;
}

.remove-button {
  background-color: #dc3545;
  color: white;
}
.remove-button:hover {
  background-color: #c82333;
}

.clear-button {
  background-color: #007bff;
  color: white;
}
.clear-button:hover {
  background-color: #0056b3;
}

.error-input-email{
  color: red;
  font-weight: bold;
  font-size: 0.6rem;
  margin: 0.5rem;
  padding: 0.8rem;
}

.box-outer-form {
  margin: 1rem;
  padding: 1rem;
  border: black solid 1px;
  width: auto;
  height: auto;
}

.box-inner-form {
  flex: auto;
}

.input-form {
  margin: 0.5rem;
  padding: 0.8rem;
  color: #1f1f1f;
  background-color: #ffffff;
  border: 1px solid #1f1f1f;
  border-radius: 5px;
  font-size: 0.8rem;
  width: 90%;
}

.container {
  display: flex;
  flex-direction: line;
  justify-content: center;
  align-items: center;
  max-width: auto;
}

@media (max-width: 480px) {
  .box-inner-form {
    flex-direction: column;
    align-items: center;
  }

  .input-form {
    flex: 1 1 100%;
  }

  .input-file {
    flex: 2 2 100%;
  }
}

</style>