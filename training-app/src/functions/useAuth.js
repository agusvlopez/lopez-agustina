import { onMounted, onUnmounted, ref } from "vue";
import { subscribeToAuth } from "../services/auth";
import { getUserProfileById } from "../services/user";

export function useAuth() {
    const registerLoading = ref(false);

    const user = ref({
        id: null,
        email: null,
        rol: null,
    });
    let unsubscribeAuth;
    
    onMounted(async () => {
        unsubscribeAuth = subscribeToAuth(newUser => user.value = {...newUser});
        if(user.value.id) {
            registerLoading.value = true;
        }
        let result = await getUserProfileById(user.value.id);
        console.log(result);
        user.value.rol = result.rol;

        registerLoading.value = false;
    });

    onUnmounted(() => unsubscribeAuth());

    return {
        user,
        registerLoading,
    }
}