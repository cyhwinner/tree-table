import Vue from 'vue';
export function treeToArray(arr, expand = false, parent = null, spaces = 0) {
  const results = arr.reduce((pre, cur) => {
    cur.spaces = spaces;
    Vue.set(cur, 'expand', expand);
    Vue.set(cur, 'parent', parent);
    Vue.set(cur, 'checked', false);
    Vue.set(cur, 'selectchecked', []);
    Vue.set(cur, 'indeterminate', false);
    pre.push(cur);
    if (cur.children && cur.children.length > 0) {
      const subArr = treeToArray(cur.children, expand, cur, spaces + 1);
      pre.push(...subArr)
    }
    return pre;
  }, []);
  return results;
}

export function flatTreeToMap(arr, map = {}, uniqueId = 'id', childrenKey = 'children') {
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    map[cur[uniqueId]] = cur;
    if (cur[childrenKey] && cur[childrenKey].length > 0) {
      return flatTreeToMap([...cur[childrenKey], ...arr.slice(i + 1)], map, uniqueId, childrenKey);
    }
  }
  return map;
}

export function diff (cur, pre) {
  console.log(cur)
  const results = treeToArray(cur);
  const map = flatTreeToMap(cur);
  const oldMap = pre && flatTreeToMap(pre);
  for (const key in map) {
    if (oldMap[key]) {
      map[key].expand = oldMap[key].expand;
    }
  }
  return results;
}

