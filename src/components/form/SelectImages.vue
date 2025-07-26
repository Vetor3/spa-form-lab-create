<template>
  <div class="image-uploader-container">
    <p class="section-title">{{ title }}</p>
    
    <div class="file-input-container">
      <input
        ref="fileInput"
        multiple
        type="file"
        accept="image/*"
        @change="handleFiles"
        :disabled="isMaxFilesReached"
        class="file-input"
      />
      <p v-if="isMaxFilesReached" class="max-files-message">
        Máximo de {{ maxFiles }} imagens atingido para {{ title.toLowerCase() }}.
      </p>
      <p v-else class="files-remaining">
        Você pode adicionar mais {{ remainingSlots }} imagem(ns).
      </p>
    </div>
    
    <div v-if="files.length > 0" class="preview-container">
      <div v-for="(file, index) in files" :key="index" class="image-preview">
        <img :src="getImagePreview(file)" alt="Preview" class="preview-image"/>
        <button @click="removeImage(index)" class="remove-button">
          Remover
        </button>
      </div>
      <button @click="clearImages" class="clear-button">
        Limpar todas as imagens
      </button>
    </div>
    
    <p v-else class="no-images-message">Nenhuma imagem selecionada</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useUploadStore } from '../../stores/UploadStore';

export default defineComponent({
  name: 'ImageUploader',
  props: {
    type: {
      type: String as () => 'bike' | 'kit' | 'sponsorship',
      required: true,
      validator: (value: string) => ['bike', 'kit', 'sponsorship'].includes(value)
    }
  },
  setup(props) {
    const store = useUploadStore();
    const fileInput = ref<HTMLInputElement | null>(null);

    // Configurações específicas por tipo
    const typeConfig = computed(() => {
      const config = {
        bike: { title: 'Fotos da sua Moto:', maxFiles: 10 },
        kit: { title: 'Fotos do Kit Gráfico escolhido:', maxFiles: 2 },
        sponsorship: { title: 'Suas marcas de patrocínio:', maxFiles: 10 }
      };
      return config[props.type];
    });

    const title = computed(() => typeConfig.value.title);
    const maxFiles = computed(() => typeConfig.value.maxFiles);

    // Acessa os arquivos do store
    const files = computed(() => {
      return store[`${props.type}Photos` as 'bikePhotos' | 'kitPhotos' | 'sponsorshipPhotos'];
    });

    const isMaxFilesReached = computed(() => files.value.length >= maxFiles.value);
    const remainingSlots = computed(() => maxFiles.value - files.value.length);

    const handleFiles = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!input.files || input.files.length === 0) return;
      
      const filesArray = Array.from(input.files);
      const availableSlots = maxFiles.value - files.value.length;
      
      if (filesArray.length > availableSlots) {
        const slicedFiles = filesArray.slice(0, availableSlots);
        store.addFiles(props.type, slicedFiles);
        alert(`Apenas ${availableSlots} imagem(ns) foram adicionadas para respeitar o limite máximo.`);
      } else {
        store.addFiles(props.type, filesArray);
      }

      // Limpa o input para permitir nova seleção
      if (fileInput.value) fileInput.value.value = '';
    };

    const getImagePreview = (file: File) => {
      return URL.createObjectURL(file);
    };

    const removeImage = (index: number) => {
      store.removeFile(props.type, index);
    };

    const clearImages = () => {
      store.clearFiles(props.type);
      if (fileInput.value) fileInput.value.value = '';
    };

    return {
      fileInput,
      title,
      files,
      maxFiles,
      isMaxFilesReached,
      remainingSlots,
      handleFiles,
      getImagePreview,
      removeImage,
      clearImages
    };
  }
});
</script>

<style>
.image-uploader-container {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.section-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.file-input-container {
  margin-bottom: 1rem;
}

.file-input {
  display: block;
  margin-bottom: 0.5rem;
}

.max-files-message {
  color: #e53935;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.files-remaining {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.preview-container {
  margin-top: 1rem;
}

.image-preview {
  position: relative;
  display: inline-block;
  margin: 0 1rem 1rem 0;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 4px;
}

.preview-image {
  display: block;
  max-width: 150px;
  max-height: 150px;
  margin-bottom: 0.5rem;
}

.remove-button {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.remove-button:hover {
  background-color: #cc0000;
}

.clear-button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.clear-button:hover {
  background-color: #f57c00;
}

.no-images-message {
  color: #999;
  font-style: italic;
}
</style>