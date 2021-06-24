export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      visible(newVal) {
        if (newVal) this.form.resetFields()
      },
    },
    data() {
      return {
        formItemLayout: {
          labelCol: { span: 3 },
          wrapperCol: { span: 20 },
        },
        form: this.$form.createForm(this),
        confirmLoading: false,
      }
    },
    methods: {
      formCancel() {
        this.confirmLoading = false
        this.$emit('update:visible', false)
      },
    },
  }
  