<!--  -->
<template>
    <el-dialog
        :title.sync="title"
        :visible.sync="centerDialogVisible"
        width="40%"
        center>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
            <el-form-item label="标题:" prop="titles">
                <el-input type="text" v-model="ruleForm.titles" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="E-mail:" prop="email">
                <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容:" prop="content">
                <!-- <el-input v-model.number="ruleForm.age" height="300px"></el-input> -->
                <el-input type="textarea" v-model="ruleForm.content" name="content" id="content" cols="30" rows="5" width="100%"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
                <el-button @click="resetForm('ruleForm')">重填</el-button>
            </el-form-item>
        </el-form>
            <el-button :plain="true" @click="open2" style="display:none">成功</el-button>
            <el-button :plain="true" @click="open4" style="display:none">错误</el-button>
    </el-dialog>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
  data () {
      var checkTitles = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error('标题不能为空'));
        }else {
          callback();
        }
            
      };
      var checkEmail = (rule, value, callback) => {
          let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确邮箱'));
        }
      };
      var checkContent = (rule, value, callback) => {
        if (!value.trim()) {
          callback(new Error('内容不能为空'));
        } else {
          callback();
        }
      };
    return {
        centerDialogVisible: false,
        ruleForm: {
          titles: '',
          email: '',
          content: ''
        },
        rules: {
          titles: [
            { validator: checkTitles, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          content: [
            { validator: checkContent, trigger: 'blur' }
          ]
        },
        emails: ['校长信箱', '支部信箱', '信息公开意见箱']
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            // console.log(valid)
          if (valid) {
            // alert('submit!');
            // console.log(this.ruleForm)
            let i = this.emails.indexOf(this.title)
            // console.log(i)
            this.getTypeData(i)
            this.hide()
            this.resetForm('ruleForm')
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
        
      },
      show(){
          this.centerDialogVisible = true
      },
      hide(){
          this.centerDialogVisible = false
      },
      getTypeData(i) {
        let data = {
            Action: "New",
            Resource: "MailBox"
        };
        data.DataJSONString = {};
        data.DataJSONString.MailBoxType = i;    //信箱分类
        data.DataJSONString.Name = this.ruleForm.titles;
        data.DataJSONString.Email = this.ruleForm.email;
        data.DataJSONString.Content = this.ruleForm.content;
        data.DataJSONString.IP = returnCitySN["cip"];
        data.DataJSONString = JSON.stringify(data.DataJSONString);
            this.$.post("/api/Table/TableAction", data)
            .then(res => {
                // console.log(res)
                if(res.status === 200){
                    this.open2()
                }else{
                    this.open4()
                }
            })
            .catch(err => {
                console.log(err);
                this.open4()
            });
      },
    open2() {
        this.$message({
          showClose: true,
          message: '发送成功!',
          type: 'success'
        });
      },
    open4() {
        this.$message({
          showClose: true,
          message: '发送失败,请稍后!',
          type: 'error'
        });
    }
  }
}


</script>
<style scoped>
.modal{
    position: fixed;
    left: 0;
    top: 0;
    width:100%;
    height: 100%;
}
#content{
  float: left;
  width: 100%;
  margin-bottom: 15px;
  background-color: rgb(245, 245, 245);
}
</style>