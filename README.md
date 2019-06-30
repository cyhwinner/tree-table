## 基于element-ui树表格
|接收参数|类型|说明|默认值|
|:----:|:----|----:|----:|
|treeData|Array|树结构数组|
|columns|Array|数组对象中label的值对应table-column的prop，value对应显示的值|
|showCheckbox|Boolean|是否可选|

## 内部的事件
|事件名|接收参数|说明|默认值|
|:----:|:----|----:|----:|
|getNode|id|返回对应data|
|removeNode|id|删除对应的id|
|appendNode|(id, children)|增加节点的子元素


## 抛出的事件
|事件名|抛出参数|说明|默认值|
|:----:|:----|----:|----:|
|check|list|返回选中的节点数组|

