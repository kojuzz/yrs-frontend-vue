<template>
    <van-nav-bar
        title="Register"
        :fixed="true"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="pt-[46px]"></div>
    <div class="p-3">
        <van-form @submit="onSubmit">
            <div class="bg-white rounded-lg">
                <div class="flex justify-center items-center py-3">
                    <img
                        src="@/assets/image/register.png"
                        alt="YRS"
                        class="w-5/12"
                    />
                </div>
                <van-cell-group inset class="mb-3 mx-0">
                    <van-field
                        v-model="name"
                        name="name"
                        label="Name"
                        placeholder="Enter your name"
                        :error-message="errors.name"
                    />
                    <van-field
                        v-model="email"
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        :error-message="errors.email"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        :error-message="errors.password"
                    />
                </van-cell-group>
            </div>
            <div class="my-4">
                <van-button
                    round
                    block
                    type="primary"
                    native-type="submit"
                    color="#1CBC9B"
                    :loading="loading"
                >
                    Register
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRegisterStore } from "@/stores/registerStore";

const registerStore = useRegisterStore();

const onClickLeft = () => history.back();

const name = ref("");
const email = ref("");
const password = ref("");
const errors = ref({
    name: "",
    email: "",
    password: "",
});
const loading = ref(false);

const onSubmit = async (values) => {
    loading.value = true;
    errors.value = {
        name: "",
        email: "",
        password: "",
    };
    await registerStore.store(values.name, values.email, values.password);
    console.log(registerStore.getResponse);
    console.log(registerStore.getError);
    
    if (registerStore.getErrorMessage) {
        if (registerStore.getErrors) {
            errors.value = {
                name: registerStore.getErrors.name
                    ? registerStore.getErrors.name.join(", ")
                    : "",
                email: registerStore.getErrors.email
                    ? registerStore.getErrors.email.join(", ")
                    : "",
                password: registerStore.getErrors.password
                    ? registerStore.getErrors.password.join(", ")
                    : "",
            };
        }
    } else {
        if (registerStore.getResponse?.is_verified) {
        } else {
        }
    }
    loading.value = false;
};
</script>

<style scoped></style>
