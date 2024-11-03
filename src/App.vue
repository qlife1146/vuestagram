<template>
  <div class="header">
    <ul class="header-button-left" v-if="CurrentPage != 0" @click="CurrentPage = 0">
      <li>Cancel</li>
    </ul>
    <!-- <ul class="header-button-right" @click="Posting"> -->
    <ul class="header-button-right" v-if="CurrentPage != 0">
      <!-- 와 드디어 문제 찾았다!!! ul에 있던 @click을 li로 이동. (행복사) -->
      <li v-if="CurrentPage == 1" @click="CurrentPage = 2">Next</li>
      <li v-if="CurrentPage == 2" @click="Posting">Post</li>
    </ul>
    <img src="./assets/logo.png" class="logo" @click="CurrentPage = 3" />
    <!-- <img src=a"./assets/logo.png" class="logo" @click="console.error('error test')" /> -->
    <!-- <button @click="CurrentPage = 0">게시물</button>
    <button @click="CurrentPage = 1">필터</button>
    <button @click="CurrentPage = 2">글</button> -->
  </div>

  <!-- <p>{{ name }}</p>
  <p>{{ now() }}</p> -->
  <!-- 데이터를 불러도 computed는 그대로 -->
  <!-- <p>{{ nowCom }}</p>
  <p>{{ cnt }}</p>
  <button @click="cnt++">+++</button> -->

  <!-- <p>{{ dt.name }}</p>
  <p>{{ age }}</p>
  <p>{{ likes }}</p> -->

  <!-- vuex store 예제 -->
  <!-- <h4>{{ $store.state.name }}</h4>-->
  <!-- <h4>{{ $store.state.age }}</h4> -->

  <!-- 비권장: 직접 수정 금지 -->
  <!-- 1. store.js에서 수정 방법 사전 정의 -->
  <!-- 2. 컴포넌트에서 불러와 수정 -->
  <!-- <button @click="$store.commit('changeName')"></button> -->
  <!-- <button @click="increaseAge(10)">+1</button> -->
  <!-- <button @click="$store.commit('increaseAge', 10)">+1</button> -->
  <!-- 젠장, 또 commit이야. 난 숭배해야만 해. -->
  <!-- <button @click="$store.dispatch('getData')">more button</button> -->
  <!-- commit은 mutations, dispatch는 actions -->

  <!-- 오오오 method도 보낼 수 있어 -->
  <ContainerView
    :PostData="PostData"
    :CurrentPage="CurrentPage"
    :more="more"
    :UploadUrl="UploadUrl"
    @write="updateMyPost"
    @update-filter="updateMyFilter"
  />
  <!-- <div class="moreButton"><button @click="more">more</button></div> -->
  <div class="footer">
    <ul class="footer-button-plus">
      <input
        @change="upload"
        type="file"
        id="file"
        class="input-file"
        accept=".jpg, .jpeg, .png"
      />
      <label for="file" class="input-plus" v-if="CurrentPage == 0">+</label>
    </ul>
  </div>

  <!-- <div v-if="CurrentPage == 0">내용0</div>
  <div v-if="CurrentPage == 1">내용1</div>
  <div v-if="CurrentPage == 2">내용2</div>
  <button @click="CurrentPage = 0">버튼0</button>
  <button @click="CurrentPage = 1">버튼1</button>
  <button @click="CurrentPage = 2">버튼2</button> -->
</template>

<script>
import axios from "axios";
import PostData from "./stores/PostData";
import { mapMutations, mapState } from "vuex";

import ContainerView from "./components/ContainerView.vue";
export default {
  data() {
    return {
      cnt: 0,
      PostData: PostData,
      ClickNum: 0,
      CurrentPage: 0,
      UploadUrl: "",

      MyPost: "",
      MyImage: "",
      MyFilter: "",
    };
  },
  mounted() {
    this.emitter.on("fire", (e) => {
      console.log(e);
    });
    this.emitter.on("changeFilter", (e) => {
      this.MyFilter = e;
    });
    this.emitter.on("writePost", (e) => {
      this.MyPost = e;
    });
  },
  name: "App",
  components: { ContainerView: ContainerView },
  // computed: 자원 절약용, 부르기 전까지는 재실행x
  computed: {
    nowCom() {
      return new Date();
    },
    dt() {
      return this.$store.state;
    },
    ...mapState(["name", "age", "likes"]),
  },
  methods: {
    ...mapMutations(["setMore", "increaseAge"]),
    now() {
      return new Date();
    },
    more() {
      axios
        .get("https://codingapple1.github.io/vue/more" + this.ClickNum + ".json")
        .then((result) => {
          this.PostData.push(result.data);
          // console.log(result.data);
          //name, userImage, postImage, date, content
          this.ClickNum++;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    upload(e) {
      let file = e.target.files;
      console.log(file[0].type);
      // 꼭 [0] 넣어야 되나, 안 넣으니 안 되네
      this.UploadUrl = URL.createObjectURL(file[0]);
      this.MyImage = this.UploadUrl;
      // console.log(UploadUrl);
      this.CurrentPage = 1;
    },
    updateMyPost(content) {
      this.MyPost = content;
      // console.log(content);
    },
    updateMyFilter(filter) {
      this.MyFilter = filter;
    },
    Posting() {
      // console.log(this.MyPost);
      if (typeof this.MyPost === "string") {
        var userName = "Kim Hyun";
        var userImage = "https://picsum.photos/100?random=3";
        var today = new Date();
        var format = { month: "long", day: "numeric" };
        var formattedDate = today.toLocaleDateString("en-US", format);

        var MyPostData = {
          name: userName,
          userImage: userImage,
          postImage: this.MyImage,
          likes: 0,
          date: formattedDate,
          liked: false,
          content: this.MyPost,
          filter: this.MyFilter,
        };
        this.PostData.unshift(MyPostData);
        // console.log("unshift Done");
        this.CurrentPage = 0;
      } else {
        console.error("Error :", this.MyPost);
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
  z-index: 99;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.moreButton {
  text-align: center;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: transparent;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.input-file {
  display: none;
}
.input-plus {
  cursor: pointer;
  border: 4px solid #34485d;
  background-color: #40b782;
  border-radius: 50%;
  padding: 10px 20px;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
