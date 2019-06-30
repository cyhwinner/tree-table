<style lang="stylus">

</style>

<template>
  <div>
    <tree-table :treeData="actualTree" :columns="columns"></tree-table>
  </div>
</template>

<script>
import TreeTable from './TreeTable';

export default {
  data () {
    return {
      treeData: Object.freeze([
        { id: 1, name: 'firstParent'},
        { id: 9, parentId: 1, name: '子节点1'},
        { id: 3, parentId: 1, name: '子节点2'},
        { id: 4, parentId: 1, name: '子节点3'},
        { id: 5, parentId: 1, name: '子节点4'},
        { id: 6, parentId: 1, name: '子节点5'},
        { id: 7, parentId: 1, name: '子节点6'},
        { id: 8, parentId: 1, name: '子节点7'},
        { id: 2, name: 'secondParent'},
        { id: 21, parentId: 2, name: '子节点8'},
        { id: 22, parentId: 2, name: '子节点9'},
        { id: 23, parentId: 2, name: '子节点20'},
        { id: 24, parentId: 2, name: '子节点22'},
        { id: 25, parentId: 2, name: '子节点22'},
        { id: 26, parentId: 2, name: '子节点23'},
        { id: 27, parentId: 2, name: '子节点14'},
        { id: 28, parentId: 27, name: '孙节点1'},
        { id: 29, parentId: 27, name: '孙节点2'},
      ]),
      defaultProp: {
        label: 'name'
      },
      id: [],
      columns: [
        { label: 'id', value: 'id'},
        { label: '名称', value: 'name'},
      ]
    };
  },
  computed: {
    actualTree() {
      const map = {};
      const tree = [];
      this.treeData.forEach((ele) => {
        map[ele.id] = Object.assign(ele, {children: []});
      })
      this.treeData.forEach((ele) => {
        if (ele.parentId === undefined) {
          tree.push(ele);
        } else {
          map[ele.parentId].children.push(ele);
        }
      })
      return tree;
    },
  },
  components: {
    TreeTable
  },

  created () {

  },

  methods: {

  }
}
</script>