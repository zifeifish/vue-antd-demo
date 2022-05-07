<template>
  <div>
    <template v-if="fieldConfig.type === 'input'">
      <a-col :md="8" :sm="24">
        <a-form-item :label="fieldConfig.templateOptions.label">
          <a-input
            :placeholder="fieldConfig.templateOptions.placeholder"
            v-model="model[fieldConfig.key]"
          />
        </a-form-item>
      </a-col>
    </template>
    <template v-else-if="fieldConfig.type === 'select'">
      <a-col :md="8" :sm="24">
        <a-form-item :label="fieldConfig.templateOptions.label">
          <a-select
            :placeholder="fieldConfig.templateOptions.placeholder"
            v-model="model[fieldConfig.key]"
          >
            <a-select-option
              v-for="option in fieldConfig.templateOptions.options"
              :key="option.value"
              :value="option.value"
              >{{ option.label }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-col>
    </template>
    <template v-else-if="fieldConfig.type === 'date-range'">
      <a-col :md="8" :sm="24">
        <a-form-item label="发送时间">
          <a-range-picker
            :showTime="fieldConfig.templateOptions.showTime"
            :format="fieldConfig.templateOptions.format"
            style="width: 100%"
            v-model="model[fieldConfig.key]"
          >
          </a-range-picker>
        </a-form-item>
      </a-col>
    </template>
  </div>
</template>

<script>
export const fieldConfig = {
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
    fieldConfig: {
      type: Object,
      required: true,
    },
    // 表单value
    model: {
      type: Object,
      required: true,
    },
  },
  computed: {
    data: {
      get: function() {
        console.log(777, this.$props);
        return this.$props.model[this.$props.fieldConfig.key];
      },
      set: function(val) {
        console.log(888, this.$props.model);
        this.$props.model[this.$props.fieldConfig.key] = val;
      },
    },
  },
  watch: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped></style>
