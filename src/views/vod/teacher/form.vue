<template>
    <div class="app-container">
        讲师表单
        <!-- 输入表单 -->
        <el-form label-width="120px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacher.name" />
            </el-form-item>
            <el-form-item label="入驻时间">
                <el-date-picker v-model="teacher.joinDate" value-format="yyyy-MM-dd" />
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number v-model="teacher.sort" :min="0"/>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacher.level">
                <!--
                    数据类型一定要和取出的json中的一致，否则没法回填
                    因此，这里value使用动态绑定的值，保证其数据类型是number
                    -->
                <el-option :value="1" label="高级讲师"/>
                <el-option :value="2" label="首席讲师"/>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="teacher.intro"/>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career" :rows="10" type="textarea"/>
            </el-form-item>

            <!-- 讲师头像 -->
            <el-form-item label="讲师头像">
            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-error="handleAvatarError"
                :action="BASE_API+'/admin/vod/file/upload'"
                class="avatar-uploader">
                <img v-if="teacher.avatar" :src="teacher.avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import teacherApi from '@/api/vod/teacher'
export default {
    data() {
        return {
            BASE_API: 'http://localhost:8301',
            teacher: {
                sort: 0,
                level: 1,
                avatar: ''
            }
        }
    },
    created() {
        // 获取路径中的ID 进行回显
        if(this.$route.params.id) {
            const id = this.$route.params.id
            this.fetchDataById(id)
        }
    },
    methods: {
        save() {
            // 添加
            teacherApi.save(this.teacher)
            .then(response=>{
                this.$message({
                    type:'success',
                    message: '添加成功'
                });
                // 跳转回列表
                this.$router.push({path:'/vod/teacher/list'})
            })
        },
        update() {
            // 修改
            teacherApi.update(this.teacher)
            .then(response=>{
                this.$message({
                    type:'success',
                    message: '修改成功'
                });
                // 跳转回列表
                this.$router.push({path:'/vod/teacher/list'})
            })
        },
        saveOrUpdate() {
            if (this.teacher.id) {
                this.update()
            } else {
                this.save()
            }
        },
        // 根据ID查询数据
        fetchDataById(id) {
            teacherApi.findById(id)
            .then(response=>{
                this.teacher = response.data
            })
        },
        // 上传成功回调
        handleAvatarSuccess(res, file) {
            console.log(res)
            if (res.code==20000) {
                this.teacher.avatar = res.data
                // 强制重新渲染
                this.$forceUpdate()
            } else {
                this.$message.error('上传失败 (非0)')
            }
        },

        // 错误处理
        handleAvatarError() {
            console.log('error')
            this.$message.error('上传失败(http失败)')
        },

        // 上传校验
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        }
    }
}
</script>