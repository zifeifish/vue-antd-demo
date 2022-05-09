<template>
  <div>
      <a-row :gutter="10">
        <a-col :span="20">
            <!-- 动态表单 -->
            <hu-dynamic-form :form="form" :fields="showFields" :model="model"></hu-dynamic-form>
        </a-col>
        <a-col :span="4">
          <div>
            <a-button type="primary" @click="onSearch()">查询</a-button>
            <a-button type="default" style="margin: 0 5px" @click="onRest()"
              >重置</a-button
            >
            <a v-if="fields.length > defaultShowFields" href="javaScript: void(0)" @click="isExpand = !isExpand">
              {{ isExpand ? "收起" : "展开" }}
              <a-icon :type="isExpand ? 'up-circle' : 'down-circle'" />
            </a>
          </div>
        </a-col>
      </a-row>
  </div>
</template>

<script>
import HuDynamicForm from "@/components/DynamicForm/DynamicForm.vue";
export default {
  name: "HuSearchForm",
  components: {
    HuDynamicForm,
  },
  data() {
    return {
      // 展开/收起
      isExpand: false,
      // 默认展示前3项
      defaultShowFields: 3
    };
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    form: {
            required: true,
        },
    model: {
      type: Object,
      required: true,
    },
  },
  computed: {
    showFields: function() {
      return this.isExpand ? this.$props.fields : this.$props.fields.slice(0,this.defaultShowFields)
    }
  },
  watch: {},
  created() {
    console.log(777, this.$props);
  },
  methods: {
    /**
     * 查询
     */
    onSearch() {
      this.$emit("onSearch", this.$props.model);
    },

    /**
     * 重置
     */
    onRest() {
      this.$emit("onRest", this.$props.model);
    },
  },
};
</script>

<style lang="less" scoped></style>
