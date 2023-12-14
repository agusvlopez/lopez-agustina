<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import ChatInput from '../components/ChatInput.vue';
import { getTrainingIds, getTrainings, trainingsSaveTraining, trainingsEditTraining, buscarYEliminarDocumento, editTrainingPhoto, getDocumentId, deleteTrainingPhoto } from '../services/trainings';
import Loader from '../components/Loader.vue';

export default {
    name: 'PanelTraining',
    components: { BaseLabel, ChatInput, BaseButton, BaseInput, BaseTextarea, Loader },
    data() {
        return {
            editLoading: false,
            trainingsLoading: true,
            deletedTraining: false,
            documentId: null,
            trainings: [],
            editTraining: false,
            valorDeEliminacion: '',
            alert: false,
            editForm: false,
            showingTrainingForm: false,
            photoData: {
                file: null,
                preview: null,
            },
            training: {
                name: '',
                img: '',
                description: '',
                coach: '',
                price: 0,
                difficulty: '',
            },
            editedTraining: {
                name: '',
                img: '',
                description: '',
                coach: '',
                price: 0,
                difficulty: '',
            },
            newTraining: {
                name: '',
                img: '',
                description: '',
                coach: '',
                price: 0,
                difficulty: '',
            },
            
        };
    },
    methods: {
        handlePhotoFileChange(event) {
        console.log("evento: ", event);
        this.photoData.file = event.target.files[0];
            console.log(this.photoData.file);
            console.log(this.training.img);
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            this.training.img = reader.result;
            console.log(reader.result);
        });

        reader.readAsDataURL(this.photoData.file);
        
        },
        async saveTraining() {
        try {
            this.trainingsLoading = true;
            // Guarda el nuevo entrenamiento y obtén su ID
            const newTrainingRef = await trainingsSaveTraining({
            name: this.training.name,
            img: '', // Deja esto en blanco por ahora
            description: this.training.description,
            coach: this.training.coach,
            price: this.training.price,
            difficulty: this.training.difficulty,
            });

            // Obtiene el ID del nuevo entrenamiento
            const newTrainingId = newTrainingRef.id;

            // Sube la imagen al Storage utilizando el ID del entrenamiento
            const imageUrl = await editTrainingPhoto(this.photoData.file, newTrainingId);

            // Actualiza el campo 'img' del entrenamiento con la URL de la imagen
            await trainingsEditTraining(newTrainingId, { img: imageUrl });

            // Actualiza la lista de entrenamientos después de agregar uno nuevo
            const allTrainings = await getTrainings();
            this.trainings = allTrainings;

            // Restablece los campos del formulario
            
            this.training.name = '';
            this.training.description = '';
            this.training.coach = '';
            this.training.price = 0;
            this.training.difficulty = '';
            this.trainingsLoading = false;
            this.showingTrainingForm = false;
        } catch (error) {
            console.error('Error al guardar el entrenamiento:', error);
        }
        },
        async deleteTraining(valor) {
            try {
                this.deletedTraining = true;

                // Obtén el documento a eliminar
                const trainingToDelete = await buscarYEliminarDocumento(valor);

                if (!trainingToDelete) {
                console.log('No se encontró el documento a eliminar.');
                return;
                }

                // Verifica si hay una URL de imagen asociada al entrenamiento
                if (trainingToDelete.img) {
                    deleteTrainingPhoto(trainingToDelete)
                }

                // Actualiza la lista de entrenamientos después de eliminar uno
                const trainingsDocs = await getTrainings();
                this.trainings = trainingsDocs;

                // Restablece los estados
                this.alert = false;
                this.trainingsLoading = false;
                this.deletedTraining = false;
                this.valorDeEliminacion = '';
            } catch (error) {
                console.error('Error al eliminar el entrenamiento:', error);
            }
        },
        openEdit(document){
            this.editedTraining = { ...document };
            this.editForm = true;
            console.log('Edited Training:', this.editedTraining);
            this.documentId = document.id;
            console.log(this.documentId);
        },
        async edit() {
            this.editLoading = true;

            try {
                let imageUrl = this.editedTraining.img;

                // Check if a new file has been selected
                if (this.photoData.file) {
                    // Sube la nueva imagen y obtén la URL
                    imageUrl = await editTrainingPhoto(this.photoData.file, this.documentId);
                }

                // Luego, actualiza el entrenamiento en la base de datos con la nueva URL
                await trainingsEditTraining(this.documentId, {
                    name: this.editedTraining.name,
                    img: imageUrl,
                    description: this.editedTraining.description,
                    coach: this.editedTraining.coach,
                    price: this.editedTraining.price,
                    difficulty: this.editedTraining.difficulty,
                });

                console.log('Entrenamiento actualizado con éxito');

                // Llama a getTrainings nuevamente para obtener la lista actualizada
                const trainingsAll = await getTrainings();
                this.trainings = trainingsAll;
            } catch (error) {
                console.error('Error al actualizar el entrenamiento:', error);
            } finally {
                this.editLoading = false;
                this.editForm = false;
            }
        },
        editTrue() {
            this.editTraining = true;
        },
        editFalse() {
            this.rolLoading = false;
            this.editTraining = false;
        },
        openAlert(event) {
            this.valorDeEliminacion = '';
            this.alert = true;
            this.valorDeEliminacion = event;
        },
        closeEdit(){
            this.editForm = false;
        },
        closeAlert(){
            this.alert = false;
        },
        showTrainingForm () {
            this.showingTrainingForm = true;
        },
        cancelTrainingForm () {
            this.showingTrainingForm = false;
        }
    },
    async mounted() {
        this.trainingsLoading = true;

        try {
        // Llama a la función getTrainings directamente
        const trainingsAll = await getTrainings();
        this.trainings = trainingsAll;
        } catch (error) {
        console.error('Error al obtener entrenamientos:', error);
        } finally {
        this.trainingsLoading = false;
        }
    },
    beforeDestroy() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
    },
}
</script>

<template class="container mx-auto p-4">
   <section class="border-b-2">
        <h1>Panel de entrenamientos</h1>
        <h2>Todos los entrenamientos </h2>
        <div class="flex gap-4 mt-4 mb-4">
            <BaseButton
                @click="showTrainingForm"
                class="rounded-full "
            >Agregar entrenamiento +</BaseButton>
        </div>
        <div id="alertEliminar" role="alert"
            v-if="alert && !trainingsLoading  && !deletedTraining"
        >
            <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <div class="bg-white p-8 shadow-lg rounded-lg max-w-md border-2 border-red-400 text-red-700">    
                <p class="font-bold">¡Atención!</p>
                    <span class="block sm:inline">Estás a punto de eliminar <span class="font-bold">{{ this.valorDeEliminacion }}. </span>¿Estas seguro que queres eliminarlo?</span>
                    <form action="#" 
                        @submit.prevent="deleteTraining(this.valorDeEliminacion)"
                    >
                    <div class="flex gap-4 justify-between mt-4">
                        <BaseButton 
                        @click="closeAlert()"
                            class="mt-2"> Cancelar
                        </BaseButton>
                        <BaseButton 
                            class="bg-red-500 hover:bg-red-600 mt-2"
                            :loading="deletedTraining"
                            > Eliminar
                        </BaseButton>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="flex p-4 flex-wrap">    
            <template
            v-if="!trainingsLoading  && !deletedTraining && !editLoading" >
                <div class="mb-4 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4"
                    v-for="training in trainings"
                    :key="training.id"  
                >
                    <div class="flex justify-end align-middle mb-4">
                        <button @click="openEdit(training)" class="font-bold text-indigo-500 flex items-center"> Editar entrenamiento <span class="editIcon block ml-1"></span></button>
                    </div>
                    <form action=""
                    @submit.prevent="openAlert(training.name)">
                        <div>
                            <div>
                                <img class="h-24 w-full object-cover" :src="training.img" :alt="training.name">
                            </div>
                            <div class="p-4">
                                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Dificultad {{training.difficulty}}</div>
                                <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{training.name}}</a>
                                <p class="mt-1 text-gray-500">{{training.description}}</p>
                                <p class="mt-1 text-indigo-500 text-lg font-semibold text-end">${{training.price}}</p>

                                <BaseButton 
                                    class="bg-red-500 hover:bg-red-600 mt-4"
                                    :value="training.name"
                                    id="buttonAlert"
                                >Eliminar </BaseButton>
                            </div>
                        </div>
                    </form>
                </div>  
            </template>
            <template
            v-else>
                <Loader></Loader>
            </template>
        </div>
    </section>
        <template 
        v-if="!editForm">

            <div v-if="showingTrainingForm">
                <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div class="bg-white p-6 shadow-md rounded-lg max-w-xxl">
                        <h2 class="mt-4">Cargar un nuevo entrenamiento</h2>
                        <form 
                            action="#" 
                            @submit.prevent="saveTraining"
                        >
                        <div class="w-auto">
                            <section class="flex flex-wrap">
                                <div class="m-3 flex-auto w-64">
                                    <BaseLabel for="name" class="text-sm">Nombre: </BaseLabel>
                                    <div class="mt-2">
                                        <BaseInput
                                            id="name" 
                                            v-model="training.name"
                                            class="shadow"
                                            required
                                        ></BaseInput> 
                                    </div>
                                </div>
                                <div class="m-3 flex-auto w-64">
                                    <BaseLabel for="newPhoto">Imagen</BaseLabel>
                                    <input 
                                        class="w-full px-1.5 py-1 border border-gray-400 rounded disabled:bg-gray-100"
                                        type="file"
                                        id="newPhoto"
                                        :disabled="editLoading"
                                        @change="handlePhotoFileChange"
                                    />     
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
                                    required
                                    placeholder="Escribe la descripción del entrenamiento..."
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
                                            v-model="training.price"
                                            class="shadow"
                                            required
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
                                            required
                                        ></BaseInput>             
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="flex justify-between">
                            <button 
                                class="rounded-full shadow text-indigo-700 p-3 ml-2"
                                @click="cancelTrainingForm"
                            >Cancelar</button> 
                            <BaseButton 
                            class="rounded-full p-3 ml-2"
                            :loading="trainingsLoading"
                            ></BaseButton>  
                        </div> 
                    </form>   
                </div>
            </div>  
        </div>
    </template>
    <template v-if="editForm">
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div class="bg-white p-6 shadow-md rounded-lg max-w-xxl">
                <p class="text-xl font-semibold mb-4">Editar Entrenamiento</p>
                <form action="#" 
                    @submit.prevent="edit"
                >
                    <div class="flex flex-wrap">
                        <div class="p-2 w-full lg:w-1/2">
                            <BaseLabel for="name" class="text-sm">Nombre: </BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                id="name"
                                v-model="editedTraining.name"
                                class="shadow"
                                :placeholder="editedTraining.name"
                                required
                            ></BaseInput>
                            </div>
                        </div>
                        <div class="p-2 w-full lg:w-1/2">
                            <div class="flex">
                                <div
                                    v-if="editedTraining.img !== null"
                                >
                                    <img class="w-36 pr-2" :src="editedTraining.img" alt="">
                                </div>
                                <div>
                                    <BaseLabel for="newPhoto">Imagen de Perfil</BaseLabel>
                                    <input 
                                        class="w-full px-1.5 py-1 border border-gray-400 rounded disabled:bg-gray-100"
                                        type="file"
                                        id="newPhoto"
                                        :disabled="editLoading"
                                        @change="handlePhotoFileChange"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 w-full">
                        <BaseLabel for="description" class="text-sm">Descripción: </BaseLabel>
                        <div class="mt-2">
                            <BaseTextarea
                            id="description"
                            v-model="editedTraining.description"
                            class="shadow"
                            rows="4"
                            :placeholder="editedTraining.description"
                            required
                            ></BaseTextarea>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="p-2 w-full lg:w-1/3">
                            <BaseLabel for="coach" class="text-sm">Coach: </BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                id="coach"
                                v-model="editedTraining.coach"
                                class="shadow"
                                :placeholder="editedTraining.coach"
                                required
                            ></BaseInput>
                            </div>
                        </div>
                        <div class="p-2 w-full lg:w-1/3">
                            <BaseLabel for="price" class="text-sm">Precio: $</BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                type="number"
                                id="price"
                                v-model="editedTraining.price"
                                class="shadow"
                                :placeholder="editedTraining.price"
                                required
                            ></BaseInput>
                            </div>
                        </div>
                        <div class="p-2 w-full sm:w-1/3">
                            <BaseLabel for="difficulty" class="text-sm">Dificultad: </BaseLabel>
                            <div class="mt-2">
                            <BaseInput
                                id="difficulty"
                                v-model="editedTraining.difficulty"
                                class="shadow"
                                :placeholder="editedTraining.difficulty"
                                required
                            ></BaseInput>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-4 justify-end">
                        <button 
                        @click="closeEdit"
                        class="rounded-full shadow-lg text-indigo-700 p-3 ml-2"
                        >Cerrar</button>
                        <BaseButton 
                        class="rounded-full p-3 ml-2"
                        :loading="editLoading"
                        >Editar</BaseButton>
                    </div>
                </form>
            </div>
        </div>
    </template>
</template>