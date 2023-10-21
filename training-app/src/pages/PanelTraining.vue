<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import ChatInput from '../components/ChatInput.vue';
import { trainingsSaveTraining } from '../services/trainings';

export default {
    name: 'PanelTraining',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea},
    data() {
        return {
            training: {
                id: 0,
                name: '',
                description: '',
                coach: '',
                price: 0,
                difficulty: '',
            },
        };
    },
    methods: {
        saveTraining() {
            // if(this.newMessageSaving) return;
            // this.newMessageSaving = true;
            trainingsSaveTraining({
                id: this.training.id,
                name: this.training.name,
                description: this.training.description,
                coach: this.training.coach,
                price: this.training.price,
                difficulty: this.training.difficulty,
            })
                .then(() => {
                this.training.id = 0;
                this.training.name = '';
                this.training.description = '';
                this.training.coach = '';
                this.training.price = 0;
                this.training.difficulty = '';
                // this.newMessageSaving = false;
            });
        }
    },
}
</script>

<template>
<div class="container mx-auto p-4">
    <section>
        <h1>Panel de entrenamientos</h1>
        
    <form 
        action="#" 
        @submit.prevent="saveTraining"
        >
    <div class="w-auto">
        <section class="flex flex-wrap">
        <div class="m-3 flex-auto w-64">
            <BaseLabel for="trainingId" class="text-sm">Número ID: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                type="number"
                id="trainingId" 
                v-model="training.id"
                class="shadow"
                ></BaseInput> 
            </div>
        </div>
        <div class="m-3 flex-auto w-64">
            <BaseLabel for="name" class="text-sm">Nombre: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="name" 
                v-model="training.name"
                class="shadow"
                ></BaseInput> 
            </div>
        </div>
    </section>
        <div class="m-3">
            <BaseLabel for="description" class="text-sm">Descripción: </BaseLabel>
            <div class="mt-2">
                <BaseTextarea
                id="description" 
                v-model="training.description"
                class="shadow"
                rows="4"
                ></BaseTextarea> 
            </div>
        </div>
    
    <section class="flex flex-wrap">
        <div class="m-3 flex-auto">
            <BaseLabel for="coach" class="text-sm">Coach: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="coach" 
                v-model="training.coach"
                class="shadow"
                ></BaseInput>           
            </div>
        </div>
        <div class="m-3 flex-auto">
            <BaseLabel for="price" class="text-sm">Precio: $</BaseLabel>
            <div class="mt-2">
                <BaseInput
                type="number"
                id="price" 
                v-model="training.price"
                class="shadow"
                ></BaseInput>            
            </div>
        </div>
        <div class="m-3 flex-auto">
            <BaseLabel for="difficulty" class="text-sm">Dificultad: </BaseLabel>
            <div class="mt-2">
                <BaseInput
                id="difficulty" 
                v-model="training.difficulty"
                class="shadow"
                ></BaseInput>             
            </div>
        </div>
    </section>
    </div>
        <BaseButton class="rounded-full p-3 ml-2"
        ></BaseButton>    
    </form>  
    </section>  

</div>

</template>