### Replace-Loader

一个简单的webpack字符串替换loader，完全基于String.prototype.replace

#### Options:

- search: [String / RegExp] 需要被替换的字符串文本或正则；
- replace: [String / Function] 替换成的字符串；

> 如果是正则替换，则会自动添加全局替换flag：g，以防遗忘