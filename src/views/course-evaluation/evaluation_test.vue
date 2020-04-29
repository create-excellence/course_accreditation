<template>
  <div class="main">
    <el-card
      class="box-card"
      shadow="never"
      style="background-color:white;"
    >
      <div style="text-align:center;">
        <h1 style="font-size:30px;">
          {{ name }}
        </h1>
      </div>
    </el-card>
    <el-card
      class="box-card"
      shadow="never"
      style="background-color:white;margin-top:15px;"
    >
      <div>
        <el-radio
          v-model="radio"
          label="1"
        >
          已答
        </el-radio>
        <el-radio
          v-model="radio"
          label="2"
        >
          未答
        </el-radio>
      </div>

      <div style="margin-top:15px;">
        <el-button
          circle
          type="primary"
        >
          1
        </el-button>
        <el-button circle>
          2
        </el-button>
        <el-button circle>
          3
        </el-button>
        <el-button circle>
          4
        </el-button>
        <el-button circle>
          5
        </el-button>
      </div>
    </el-card>
    <div
      v-for="item in data"
      :key="item.id"
      style="margin-top:15px;"
    >
      <el-card
        class="box-card"
        shadow="never"
        style="background-color:white;"
      >
        <div style="font-size:18px;">
          <span style="font-weight:bold;">{{ item.sequence }}.{{ item.title }}</span>
        </div>

        <div>
          <div
            v-for="option in item.optionsList"
            :key="option.prefix"
            style="margin-top:15px;"
          >
            <el-radio
              v-model="item.optionsScore"
              :label="option.prefix"
              size="medium"
              style="font-size:30px;"
            >
              <span
                style="font-size:18px;"
              >{{ option.prefix }} . {{ option.content }}</span>
            </el-radio>
          </div>
        </div>
      </el-card>
    </div>
    <el-card
      class="box-card"
      shadow="never"
      style="background-color:white;margin-top:15px;"
    >
      <el-button
        type="primary"
        style="float:right;"
      >
        提交
      </el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import * as m from '@/api/model'
import { Component, Vue, Watch } from 'vue-property-decorator'
export default class CourseTarget extends Vue {
  radio:string = '1'
  name:string = '测试卷一'
  optionsList :m.OptionsList[]= []
  data:m.CourseTarget[] = [{
    id: 1,
    describes: '第一道题',
    questionnaireId: 1,
    sequence: 1,
    title: '题目题目题目',
    totalScore: 100,
    optionsList: [{
      prefix: 'A',
      content: '选项A',
      score: '2'
    }, {
      prefix: 'B',
      content: '选项B',
      score: '2'
    },
    {
      prefix: 'C',
      content: '选项C',
      score: '2'
    },
    {
      prefix: 'D',
      content: '选项D',
      score: '2'
    }
    ]
  },
  {
    id: 2,
    describes: '第二道题',
    questionnaireId: 2,
    sequence: 2,
    title: '题目题目题目',
    totalScore: 100,
    optionsList: [{
      prefix: 'A',
      content: '选项A',
      score: '2'
    }, {
      prefix: 'B',
      content: '选项B',
      score: '2'
    },
    {
      prefix: 'C',
      content: '选项C',
      score: '2'
    },
    {
      prefix: 'D',
      content: '选项D',
      score: '2'
    }
    ]
  },
  {
    id: 3,
    describes: '第三道题',
    questionnaireId: 3,
    sequence: 3,
    title: '题目题目题目',
    totalScore: 100,
    optionsList: [{
      prefix: 'A',
      content: '选项A',
      score: '2'
    }, {
      prefix: 'B',
      content: '选项B',
      score: '2'
    },
    {
      prefix: 'C',
      content: '选项C',
      score: '2'
    },
    {
      prefix: 'D',
      content: '选项D',
      score: '2'
    }
    ]
  }
  ];
  creat() {
    console.log(this.data)
  }
}
</script>

<style>
.main{
  width:1200px;
  margin:0 auto;
}
body {
background-color: #fafafa;
}
</style>
