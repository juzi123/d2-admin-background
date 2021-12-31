<!--
 * @Author: bujunjie
 * @Date: 2021-12-29 16:37:33
 * @LastEditors: bujunjie
 * @LastEditTime: 2021-12-30 10:20:52
 * @Description: 文件上传
-->
<template>
  <div class="">
    <el-upload class="" :action="action" :headers="{ Authorization: token }" :on-success="uploadSuccess" :on-remove="handleRemove" :file-list="myFileList">
      <el-button>点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{tipText}}</div>
    </el-upload>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'UploadFile',
  props: {
    action: {
      type: String,
      default: '' // 在此修改默认的上传地址
    },
    tipText: {
      type: String,
      default: '支持扩展名：.doc .docx .pdf .jpg...'
    }
  },
  data () {
    return {
      myFileList: [],
      token: util.cookies.get('token')
    }
  },
  methods: {
    uploadSuccess (response, file, fileList) {
      this.myFileList.push({
        name: file.name,
        url: file.response.Result
      })
    },
    handleRemove (file, fileList) {
      console.log(file)
      // this.myFileList = []
      // fileList.forEach(item => {
      //   this.myFileList.push({
      //     name: item.name,
      //     url: item.response.Result
      //   })
      // })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
