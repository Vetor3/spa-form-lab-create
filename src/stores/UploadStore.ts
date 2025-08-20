import { defineStore } from 'pinia';
import environment from '../config/env';
import cep from 'cep-promise';

type FileCategory = 'bike' | 'kit' | 'sponsorship';
type FormData = {
  name: string;
  phone: string;
  textSponsorship: string;
  textDescription: string;
  fontNumberType: string;
  fontNameType: string;

  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
};

export const useUploadStore = defineStore('upload', {
  state: () => ({
    bikePhotos: [] as File[],
    kitPhotos: [] as File[],
    sponsorshipPhotos: [] as File[],
    
    data: {
      name: '',
      phone: '',
      textSponsorship: '',
      textDescription: '',
      fontNumberType: '0',
      fontNameType: '0',

      zipCode: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      complement: '',
      state: ''
    } as FormData,

    isLoading: false,
    response: null as any,

    snackbarMessage: '',
    snackbarVisible: false
  }),

  actions: {
    newName(name: string) {
      this.data.name = name.replace(/^\s+/g, '');
    },

    newPhone(phone: string) {
      this.data.phone = phone;
    },

    clearDataForm() {
      this.bikePhotos = [];
      this.kitPhotos = [];
      this.sponsorshipPhotos = [];
      this.data.name = '';
      this.data.phone = '';
      this.data.textSponsorship = '';
      this.data.textDescription = '';
      this.data.fontNumberType = '0';
      this.data.fontNameType = '0';

      this.data.zipCode = '';
      this.data.street = '';
      this.data.number = '';
      this.data.neighborhood = '';
      this.data.city = '';
      this.data.complement = '';
      this.data.state = '';
    },

    addFiles(category: FileCategory, files: File[]) {
      const property = `${category}Photos` as 'bikePhotos' | 'kitPhotos' | 'sponsorshipPhotos';
      this[property] = [...this[property], ...files];
    },

    removeFile(category: FileCategory, index: number) {
      const property = `${category}Photos` as 'bikePhotos' | 'kitPhotos' | 'sponsorshipPhotos';
      this[property].splice(index, 1);
    },

    clearFiles(category: FileCategory) {
      const property = `${category}Photos` as 'bikePhotos' | 'kitPhotos' | 'sponsorshipPhotos';
      this[property] = [];
    },

    // Métodos específicos mantidos para compatibilidade (opcional)
    setFilesKit(files: File[]) {
      this.addFiles('kit', files);
    },
    
    setFilesBike(files: File[]) {
      this.addFiles('bike', files);
    },
    
    setFilesSponsorship(files: File[]) {
      this.addFiles('sponsorship', files);
    },
    
    removeFileKit(index: number) {
      this.removeFile('kit', index);
    },
    
    removeFileBike(index: number) {
      this.removeFile('bike', index);
    },
    
    removeFileSponsorship(index: number) {
      this.removeFile('sponsorship', index);
    },
    
    clearFilesKit() {
      this.clearFiles('kit');
    },
    
    clearFilesBike() {
      this.clearFiles('bike');
    },
    
    clearFilesSponsorship() {
      this.clearFiles('sponsorship');
    },

    // Métodos existentes
    updateDataField(field: keyof FormData, value: string) {
      this.data[field] = value;
    },

    setData(data: FormData) {
      this.data = data;
    },

    async uploadData() {
      const formData = new FormData();

      Object.entries(this.data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const appendPhotos = (category: FileCategory) => {
        const photos = this[`${category}Photos` as 'bikePhotos' | 'kitPhotos' | 'sponsorshipPhotos'];
        if (photos.length) {
          photos.forEach((photo, index) => {
            formData.append(`${category}Photos[${index}]`, photo);
          });
        }
      };

      appendPhotos('bike');
      appendPhotos('kit');
      appendPhotos('sponsorship');

      this.isLoading = true;
      console.log(JSON.stringify(formData));
      
      try {
        const response = await fetch(`${environment.apiBaseURL}/v1/upload`, {
          method: 'POST',
          body: formData
        });
        this.response = await response.json();

        if (response.ok) {
          this.snackbarMessage = this.response?.message;
          this.snackbarVisible = true;
        }

        console.log(this.response);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
        this.clearDataForm();
        this.clearFiles('bike');
        this.clearFiles('kit');
        this.clearFiles('sponsorship');
      }
    },

    async cepFetch(userCep: string) {
      try {
        const result = await cep(userCep);
        this.data.street = result.street;
        this.data.neighborhood = result.neighborhood;
        this.data.city = result.city;
        this.data.state = result.state;
      } catch (error) {
        console.error(error);
      }
    }
  },

  getters: {
    cleanedName: (state) => state.data.name.trim(),

    isValidName: (state): boolean => state.data.name.trim().length > 0 && !/^\s+$/.test(state.data.name),

    showBikePhotos(): File[] {
      return this.bikePhotos;
    },

    showKitPhotos(): File[] {
      return this.kitPhotos;
    },

    showSponsorshipPhotos(): File[] {
      return this.sponsorshipPhotos;
    },
  }
});