import { defineStore } from 'pinia'

export const useUploadStore = defineStore('upload',{
  state: () => ({
    bikePhotos: Array<File>(),
    kitPhotos: Array<File>(),
    sponsorshipPhotos: Array<File>(),
    
    data: {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      textSponsorship: '',
      textDescription: '',
      fontNumberType: '',
      fontNameType: '',
    },
    
    name: '',
    cpf: '',
    email: '',
    phone: '',
    textSponsorship: '',
    textDescription: '',

    isLoading: false,
    response: null as any
  }),

  actions: {

    updateDataField(field: keyof typeof this.data, value: string) {
      this.data[field] = value
    },

    setName(name: string) {
      this.name = name
    },

    setData(data: any) {
      this.data = data
    },

    async uploadData() {
      const formData = new FormData();

      Object.entries(this.data).forEach(([key, value]) => {
        formData.append(key, value);
      })

      this.bikePhotos.forEach((photo, index) => {
        formData.append(`bikePhotos[${index}]`, photo);
      });

      this.kitPhotos.forEach((photo, index) => {        
        formData.append(`kitPhotos[${index}]`, photo);
      });

      this.sponsorshipPhotos.forEach((photo, index) => {        
        formData.append(`sponsorshipPhotos[${index}]`, photo);
      });

      this.isLoading = true
      console.log(formData)
      try {
        const response = await fetch('http://localhost:4567/v1/process_form', {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          body: formData
        })
        this.response = await response.json()
        console.log(this.response)
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    addBikePhoto(photo: File) {
      console.log(this.bikePhotos.length)
      if (this.bikePhotos.length >= 10) {
        this.bikePhotos.pop();
      }
      this.bikePhotos.push(photo)
    },
    
    addKitPhoto(photo: File) {
        if (this.kitPhotos.length >= 2) {
          this.kitPhotos.pop();
        }
        this.kitPhotos.push(photo)
    },
    
    addSponsorshipPhoto(photo: File) {
        if (this.sponsorshipPhotos.length >= 10) {
          this.sponsorshipPhotos.pop();
        }
        this.sponsorshipPhotos.push(photo)
    },

    removeBikePhoto(index: number) {
      this.bikePhotos.splice(index, 1)
    },

    clearBikePhotos() {
      this.bikePhotos = []
    },

    removeKitPhoto(index: number) {
      this.kitPhotos.splice(index, 1)
    },

    clearKitPhotos() {
      this.kitPhotos = []
    },

    removeSponsorshipPhoto(index: number) {
      this.sponsorshipPhotos.splice(index, 1)
    },

    clearSponsorshipPhotos() {
      this.sponsorshipPhotos = []
    }
  },

  getters: {
    showName(): string {
      return this.name
    },

    showBikePhotos(): Array<File> {
      return this.bikePhotos
    },

    showKitPhotos(): Array<File> {
      return this.kitPhotos
    },

    showSponsorshipPhotos(): Array<File> {
      return this.sponsorshipPhotos
    },

  }
})