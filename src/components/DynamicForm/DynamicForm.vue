<template>
    <div>
        <a-form layout="inline" :form="form">
            <a-row>
                <hu-dynamic-form-input v-for="field in fields" :key="field.key" :fieldConfig="field" :model="model">
                </hu-dynamic-form-input>
            </a-row>
        </a-form>
    </div>
</template>

<script>
import HuDynamicFormInput from './DynamicFormInput.vue'
// FormlyFieldConfig[]
export const field = [
    {
        key: 'email',
        type: 'input',
        templateOptions: {
            label: '邮箱',
            placeholder: '请输入',
            required: false,
        }
    }
]
export default {
    name: "HuDynamicForm",
    components: { HuDynamicFormInput },
    props: {
        // FormlyFieldConfig[]
        fields: {
            type: Array,
            required: true,
        },
        form: {
            required: true,
        },
        model: {
            type: Object,
            required: true,
        }
    },
    computed: {},
    watch: {},
    data() {
        return {};
    },
    created() {
        console.log(666, this.$props);
        
    },
    mounted() {
       this.$props.form.setFieldsValue(this.$props.model) 
    },
    methods: {},
};
</script>

<style lang="less" scoped>
</style>
