<!--
 * @Author: bujunjie
 * @Date: 2021-12-29 16:37:33
 * @LastEditors: bujunjie
 * @LastEditTime: 2022-01-11 16:39:33
 * @Description: 文件上传
-->
<template>
  <div class="">
    <el-upload v-if="!disabled" class="" :action="action" :headers="{ Authorization: token }" :on-success="uploadSuccess" :on-remove="handleRemove" :file-list="myFileList">
      <el-button>点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{tipText}}</div>
    </el-upload>
    <div v-else>
      <div v-for="item in myFileList" :key="item.url">
        <span class="link-span" @click="downLoadFile(item.name, item.url)">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
import { download } from '@/utils/download'
export default {
  name: 'UploadFile',
  model: {
    prop: 'fileListJson',
    event: 'fileListChange'
  },
  props: {
    fileListJson: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: '' // 在此修改默认的上传地址
    },
    tipText: {
      type: String,
      default: '支持扩展名：.doc .docx .pdf .jpg...'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      myFileList: [],
      token: util.cookies.get('token')
    }
  },
  created () {},
  watch: {
    fileListJson: {
      immediate: true,
      handler: function (newVal) {
        if (newVal) {
          this.myFileList = JSON.parse(newVal)
        } else {
          this.myFileList = []
        }
      }
    }
  },
  methods: {
    uploadSuccess (response, file, fileList) {
      this.myFileList.push(file.response.result)
      this.$emit('fileListChange', JSON.stringify(this.myFileList))
    },
    handleRemove (file, fileList) {
      if (!file.status) return
      const index = this.myFileList.findIndex(item => {
        return item.name === file.name && item.url === file.url
      })
      this.myFileList.splice(index, 1)
      this.$emit('fileListChange', JSON.stringify(this.myFileList))
    },
    downLoadFile (name, url) {
      const fileUrl =
        'http://app.changxinghuiyuan.com/bksppt/api/File/DownloadFile?fileName=' +
        name +
        '&fullPath=' +
        url
      download(fileUrl, name)
    }
  }
}
</script>

<style scoped lang="scss">
.link-span {
  cursor: pointer;
  color: #1890ff;
}
</style>
