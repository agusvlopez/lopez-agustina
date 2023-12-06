import { onMounted, ref } from "vue";
import { getUserProfileById } from "../services/user";

export const useUserProfile = (id) => {
    const userLoading = ref(true);
    const users = ref([]);
    const user = ref({
        id: null, 
        email: null,
        rol: null,
        displayName: null,
        trainings: null,
        photoURL: null,
    });
    
    onMounted(async () => {
        userLoading.value = true;
        user.value = await getUserProfileById(id);
        console.log(user.value);
        userLoading.value = false;
    });

    return {
        user,
        userLoading
    }

}