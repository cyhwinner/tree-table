<style lang="scss">
  span.el-icon-caret-rotate {
    transform: rotate(90deg);
  }
  @keyframes treeTableShow {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .el-icon-width {
    width: 14px
  }
  .el-column-disapper{
    display: none;
  }
  .el-column-animate{
    animation: treeTableShow .5s
  }
</style>

<template>
  <el-table
    :data="tableData"
    :row-class-name="isShowRow"
    border>
    <!-- <el-table-column type="selection"></el-table-column> -->
    <el-table-column :label="columns[0].label">
      <template slot-scope="{row}">
        <div
          :style="{ 'padding-left': showSpace(row)}">
          <span
          @click.stop="toggleExpand(row)" 
          :class="[{'el-icon-caret-rotate': row.expand }, showCaret(row) ? 'el-icon-caret-right' : 'el-icon-width']"
          class="el-tree-node__expand-icon" ></span>
          <el-checkbox 
            v-model="row.checked" 
            @change="handleChangeCheck(row)" 
            :indeterminate="row.indeterminate"
            v-if="!showCheckbox">{{row[columns[0].value]}}</el-checkbox>
          <span v-else>{{row[columns[0].value]}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      v-for="item in columns.slice(1)" 
      :key="item.value" 
      :label="item.label" 
      :prop="item.value" 
      align="center"></el-table-column>
      <!--做一些操作之类的实现-->
    <slot></slot>
  </el-table>
</template>

<script>
import { diff, treeToArray } from './eval.js';
export default {
  props: {
    treeData: Array,
    columns: Array,
    showCheckbox: Boolean
  },
  data () {
    return {
      tableData: [],
      checkedList: []
    };
  },
  computed: {
  },
  watch: {
    treeData(cur, pre) {
      if (cur === pre) return;
      this.tableData = diff(cur, pre);
    }
  },
  created () {
    this.tableData = treeToArray(this.treeData);
  },

  methods: {
    isShowRow(row) {
      const rowData = row.row;
      const show = rowData.parent
        ? rowData.parent.expand && rowData.parent._show
        : true;
      rowData._show = show;
      return show ? 'el-column-animate' : 'el-column-disapper';
    },
    showSpace(row) {
      return (row.spaces * 10) + 'px';
    },
    showCaret(row) {
      return row.children && row.children.length
    },
    toggleExpand(row) {
      this.showCaret(row) && (row.expand = !row.expand)
    },
    getNode(id) {
      return this.tableData.filter((row) => row.id === id)[0];
    },
    removeNode(id) {
      const index = this.tableData.findIndex((row) => row.id === id);
      const node = this.tableData[index];
      if (node.parentId > 0) {
        const parentNode = this.getNode(node.parentId);
        parentNode.children.length -= 1;
      }
      return this.tableData.splice(index, 1);
    },
    appendNode(id, children) {
      const node = this.getNode(id);
      node.children.push(children);
    },
    handleChangeCheck(row) {
      if (row.checked) {
        row.indeterminate = false;
      }
      this.setChecked(row.children, row.checked);
      const parent = this.getNode(row.parentId);
      parent && this.setParentChecked(parent);
      this.countCheckedbox();
    },
    setChecked(node, state) {
      node.forEach((child) => {
        child.checked = state;
        if (child.children && child.children.length) {
          this.setChecked(child.children, state);
        }
      })
    },
    setParentChecked(row) {
      while(row) {
        row.children && (row.indeterminate = row.children.some((child) => child.checked));
        row.children && (row.checked = row.children.every((child) => child.checked)) && (row.indeterminate = false);
        row = this.getNode(row.parentId)
      }
    },
    countCheckedbox() {
      const arr = this.tableData.filter((data) => data.checked);
      this.$emit('check', arr);
    }
  }
}
</script>