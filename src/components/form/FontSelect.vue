<template>
  <div class="font-selector-container">
    <h3 class="section-title">Fonte - {{ title }} | {{ currentValue }}</h3>
    
    <div class="font-options-vertical">
      <label 
        v-for="option in displayedOptions" 
        :key="option.value" 
        class="font-option-item"
        :class="{ 'selected': selectedValue === option.value }"
      >
        <div class="selection-box">
          <input
            type="radio"
            :value="option.value"
            v-model="selectedValue"
            class="font-radio"
          />
          <span class="custom-radio"></span>
        </div>
        
        <div class="image-container">
          <img 
            :src="getImageUrl(option.value)" 
            :alt="`Fonte ${option.value}`"
            class="font-image"
            loading="lazy"
            @error="handleImageError"
          />
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useUploadStore } from '../../stores/UploadStore';

export default defineComponent({
  name: 'FontSelector',
  props: {
    type: {
      type: String as () => 'number' | 'name',
      required: true,
      validator: (value: string) => ['number', 'name'].includes(value)
    }
  },
  setup(props) {
    const store = useUploadStore();

    const config = computed(() => ({
      title: props.type === 'number' ? 'Número' : 'Nome',
      maxOptions: props.type === 'number' ? 5 : 6,
      imageType: props.type === 'number' ? 'number' : 'name'
    }));

    const displayedOptions = computed(() => 
      Array.from({ length: config.value.maxOptions }, (_, i) => ({
        value: (i + 1).toString()
      }))
    );

    const selectedValue = computed({
      get: () => props.type === 'number'
        ? store.data.fontNumberType 
        : store.data.fontNameType,
      set: (value) => store.updateDataField(
        props.type === 'number' ? 'fontNumberType' : 'fontNameType', 
        value
      )
    });

    const currentValue = computed(() => {
      if (!selectedValue.value || selectedValue.value === '0') return 'Nenhuma Fonte selecionada';
      
      return selectedValue.value;
    });

    const getImageUrl = (value: string) => 
      `/fonts/font-${config.value.imageType}-${value}.png`;

    const handleImageError = (e: Event) => {
      (e.target as HTMLImageElement).style.display = 'none';
    };

    return {
      title: config.value.title,
      currentValue,
      displayedOptions,
      selectedValue,
      getImageUrl,
      handleImageError
    };
  }
});
</script>

<style>
.font-selector-container {
  margin-bottom: 2rem;
  max-width: 800px;
}

.section-title {
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.font-options-vertical {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.font-option-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s ease;
  background-color: #f9f9f9;
}

.selection-box {
  position: relative;
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.font-radio {
  position: absolute;
  opacity: 0;
}

.custom-radio {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #aaa;
  border-radius: 50%;
  background-color: white;
  position: relative;
}

.font-radio:checked + .custom-radio {
  border-color: #0066cc;
  background-color: #0066cc;
}

.font-radio:checked + .custom-radio::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image-container {
  flex-grow: 1;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: white; */
  border-radius: 4px;
  overflow: hidden;
  /* border: 1px solid #ddd; */
}

.font-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  padding: 5px;
}

/* Estilo quando selecionado */
.font-option-item.selected {
  border-color: #0066cc;
  background-color: #f0f7ff;
}

.font-option-item.selected .image-container {
  border-color: #0066cc;
}

/* Efeitos de hover */
.font-option-item:hover {
  border-color: #aaa;
}

/* Responsividade */
@media (max-width: 600px) {
  .font-option-item {
    padding: 0.8rem;
  }
  
  .selection-box {
    margin-right: 1rem;
  }
  
  .image-container {
    height: 70px;
  }
}
</style>