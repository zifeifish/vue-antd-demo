<template>
  <div>
    <a-card title="动态表单测试">
      <a slot="extra" href="#">more</a>
      <a-row>
        <!-- 动态表单 -->
        <hu-dynamic-form
          ref="dynamicForm"
          formLayout="horizontal"
          :form="form"
          :fields="showFields"
          :model="formModel"
        ></hu-dynamic-form>
      </a-row>
      <a-row>
        <a-col :span="10" :offset="4" style="text-align: center;">
          <a-button type="primary" @click="onSubmit()">提交</a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import HuDynamicForm from "@/components/DynamicForm/DynamicForm.vue";
export default {
  name: "DynamicForm",
  components: {
    HuDynamicForm,
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        onValuesChange: (props, values) => {
          console.log(11111111111, props, values);
        },
      }),
      showFields: [
        {
          key: "email",
          type: "input",
          templateOptions: {
            labelCol: { span: 4, offset: 0 },
            wrapperCol: { span: 10, offset: 0 },
            label: "接收邮箱",
            placeholder: "请输入",
            required: true,
            rules: [
              {
                required: false,
              },
            ],
          },
        },
        {
          key: "username",
          type: "input",
          templateOptions: {
            labelCol: { span: 4, offset: 0 },
            wrapperCol: { span: 10, offset: 0 },
            label: "接收人姓名",
            placeholder: "请输入",
            required: true,
            rules: [
              {
                required: true,
                message: "必填项,不能为空",
              },
            ],
          },
        },
        {
          key: "sendTime",
          type: "date-range",
          templateOptions: {
            labelCol: { span: 4, offset: 0 },
            wrapperCol: { span: 10, offset: 0 },
            label: "发送时间",
            required: true,
            showTime: true,
            format: "YYYY-MM-DD HH:mm:ss",
            rules: [
              {
                required: false,
              },
            ],
          },
        },
        {
          key: "sendResult",
          type: "select",
          templateOptions: {
            labelCol: { span: 4, offset: 0 },
            wrapperCol: { span: 10, offset: 0 },
            label: "发送结果",
            placeholder: "请选择",
            required: true,
            options: [
              { label: "成功", value: 1 },
              { label: "失败", value: 0 },
            ],
            rules: [
              {
                required: false,
              },
            ],
          },
        },
      ],
      formModel: {},
    };
  },
  created() {},
  methods: {
    onSubmit() {
      console.log("提交了.......", this.$refs.dynamicForm);
      const { form } = this.$refs.dynamicForm;
      form.validateFields((err, values) => {
        console.log(777, err, values);
        // 提交表单逻辑
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
