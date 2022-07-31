<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        v-for="field in fields"
        :key="field.key"
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
            style="width: 100%"
          >
          </a-range-picker>
        </template>
      </a-form-item>
    </a-form>
    <!-- <a-row>
      <a-col :span="10" :offset="4" style="text-align: center">
        <a-button type="primary" @click="onSubmit()">提交7777</a-button>
      </a-col>
    </a-row> -->
  </div>
</template>

<script>
import { deepClone } from "@/utils/index.js";
export default {
  name: "HuDynamicForm",
  components: {},
  props: {
    // 表单布局	'horizontal'|'vertical'|'inline'
    formLayout: {
      type: String,
      required: true,
      default: "horizontal",
    },
    // FormlyFieldConfig[]
    fields: {
      type: Array,
      required: true,
      default: () => [],
    },
    // form: {
    //   required: true,
    // },
    model: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {},
  watch: {
    fields: {
      handler(fields) {
        console.log(999, fields);
        this.showFields = deepClone(fields);
        // this.fields.forEach(c => {
        //   for (const key in this.model) {
        //     if (c.key === key) {
        //       c.value = this.model[key];
        //     }
        //   }
        // });
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
      showFields: [],
    };
  },
  created() {},
  mounted() {
    console.log(666, this.$props);
  },
  methods: {
    onSubmit() {
      console.log("提交了.......", this.form);
      this.form.validateFields((err, values) => {
        console.log(777, err, values);
        // 提交表单逻辑
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
