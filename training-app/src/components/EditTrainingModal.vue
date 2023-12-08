<!-- <script>
import BaseButton from './BaseButton.vue'; // Asegúrate de importar tus componentes necesarios
import BaseInput from './BaseInput.vue';
import BaseLabel from './BaseLabel.vue';
import BaseTextarea from './BaseTextarea.vue';

export default {
  props: {
    originalTraining: Object, // El objeto original antes de la edición
    originalTrainingId: String,
  },
  data() {
    return {
      editedTraining: this.originalTraining ? { ...this.originalTraining } : {}, // Usamos un objeto vacío si originalTraining es undefined
    };
  },
  methods: {
    editTraining() {
      // Emitir un evento para manejar la edición en el componente padre
      this.$emit('edit-training', {
        editedTraining: this.editedTraining,
        originalTrainingId: this.originalTrainingId,
      });
      this.closeModal();
    },
    closeModal() {
      this.$emit('close-modal');
    },
  },
  components: {
    BaseButton,
    BaseInput,
    BaseLabel,
    BaseTextarea
},
};
</script>

<template>
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div class="bg-white p-8 shadow-md rounded-lg max-w-md">
        <p class="text-xl font-semibold mb-4">Editar Entrenamiento</p>
        <form @submit.prevent="editTraining">
        <section class="flex flex-wrap">
            <div class="m-3 flex-auto w-64">
            <BaseLabel for="name" class="text-sm">Nombre: </BaseLabel>
                <div class="mt-2">
                <BaseInput
                    id="name"
                    v-model="editedTraining.name"
                    class="shadow"
                    :placeholder="originalTraining ? originalTraining.name : ''"
                    required
                ></BaseInput>
                </div>
            </div>        
        <div class="m-3 flex-auto w-64">
            <BaseLabel for="img" class="text-sm">URL de la imagen: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="img" 
                v-model="editedTraining.img"
                class="shadow"
                :placeholder="originalTraining ? originalTraining.img : ''"
                required
                ></BaseInput> 
            </div>
        </div>
    </section>
        <div class="m-3">
            <BaseLabel for="description" class="text-sm">Descripción: </BaseLabel>
            <div class="mt-2">
                <BaseTextarea
                id="description" 
                v-model="editedTraining.description"
                class="shadow"
                rows="4"
                :placeholder="originalTraining ? originalTraining.description : ''"
                required
                ></BaseTextarea> 
            </div>
        </div>
    
    <section class="flex flex-wrap">
        <div class="m-3 flex-auto">
            <BaseLabel for="coach" class="text-sm">Coach: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="coach" 
                v-model="editedTraining.coach"
                class="shadow"
                :placeholder="originalTraining ? originalTraining.coach : ''"
                required
                ></BaseInput>           
            </div>
        </div>
        <div class="m-3 flex-auto">
            <BaseLabel for="price" class="text-sm">Precio: $</BaseLabel>
            <div class="mt-2">
                <BaseInput
                type="number"
                id="price" 
                v-model="editedTraining.price"
                class="shadow"
                :placeholder="originalTraining ? originalTraining.price : ''"
                required
                ></BaseInput>            
            </div>
        </div>
        <div class="m-3 flex-auto">
            <BaseLabel for="difficulty" class="text-sm">Dificultad: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="difficulty" 
                v-model="editedTraining.difficulty"
                class="shadow"
                :placeholder="originalTraining ? originalTraining.difficulty : ''"
                required
                ></BaseInput>             
            </div>
        </div>
    </section>
  
          <div class="mt-4 gap-4 flex justify-end"> 
            <BaseButton class="bg-white text-indigo-800 border border-indigo-800 hover:text-white" @click="closeModal">Cancelar</BaseButton>
            <BaseButton type="submit">Guardar Cambios</BaseButton>
          </div>
        </form>
      </div>
    </div>
</template> -->

