<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <hu-dynamic-form-input
        v-for="field in fields"
        :key="field.key"
        :model="model"
      >
        <a-form-item
          :label="field.templateOptions.label"
          :label-col="field.templateOptions.labelCol"
          :wrapper-col="field.templateOptions.wrapperCol"
        >
          <template v-if="field.type === 'input'">
            <a-input
              :placeholder="field.templateOptions.placeholder"
              v-decorator="[
                field.key,
                {
                  rules: [
                    {
                      required: field.templateOptions.required,
                      message: `${field.templateOptions.label}不能为空`,
                    },
                  ],
                  initialValue: field.initialValue,
                },
              ]"
            />
          </template>
          <template v-else-if="field.type === 'select'">
            <a-select
              :placeholder="field.templateOptions.placeholder"
              v-decorator="[
                field.key,
                {
                  rules: [
                    {
                      required: field.templateOptions.required,
                      message: `${field.templateOptions.label}不能为空`,
                    },
                  ],
                  initialValue: field.initialValue,
                },
              ]"
            >
              <a-select-option
                v-for="option in field.templateOptions.options"
                :key="option.value"
                :value="option.value"
                >{{ option.label }}</a-select-option
              >
            </a-select>
          </template>
          <template v-else-if="field.type === 'date-range'">
            <a-range-picker
              :showTime="field.templateOptions.showTime"
              :format="field.templateOptions.format"
              style="width: 100%"
            >
            </a-range-picker>
          </template>
        </a-form-item>
      </hu-dynamic-form-input>
    </a-form>
  </div>
</template>

<script>
export const field = {
  key: "email",
  type: "input",
  templateOptions: {
    label: "Email address",
    placeholder: "Enter email",
    required: true,
  },
};
export default {
  name: "HuDynamicFormInput",
  props: {
    // field配置
    field: {
      type: Object,
      required: true,
    },
    // 表单value
    model: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  watch: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped></style>
