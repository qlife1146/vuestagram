<template>
  <div v-if="CurrentPage == 0">
    <!-- 잊지 말자... 하위에다 v-for할 거면 [i]를 여기서 해야한다는 것을... -->
    <PostView :PostData="PostData[i]" v-for="(post, i) in PostData" :key="i" />
    <!-- <PostView :PostData="PostData" />
    <PostView :PostData="PostData" /> -->
    <button @click="more">more</button>
  </div>

  <!-- 필터선택페이지 -->
  <!-- UploadUrl -->
  <div v-if="CurrentPage == 1">
    <!-- <div
      class="upload-image"
      :style="{ backgroundImage: `url(${UploadUrl})` }"
      :class="this.MyFilter"
    > -->
    <div
      class="upload-image"
      :style="{ backgroundImage: `url(${UploadUrl})` }"
      :class="this.MyFilter"
    >
      {{ selectFilter }}
    </div>
    <div class="filters">
      <FilterBox
        v-for="(filter, i) in filters"
        :key="i"
        :UploadUrl="UploadUrl"
        :filters="filters[i]"
        @change-filter="updateMyFilter"
      >
        <span>{{ filter }}</span>
      </FilterBox>
    </div>
  </div>
  <!-- 글작성페이지 -->
  <div v-if="CurrentPage == 2">
    <div
      class="upload-image"
      :style="{ backgroundImage: `url(${UploadUrl})` }"
      :class="this.MyFilter"
    ></div>
    <!-- class를 따로 해야되네, 한꺼번에 지정 못하나 -->
    <div class="write">
      <!-- <textarea
        class="write-box"
        @input="$emit('write', $event.target.value)"
        placeholder="Write here!!"
      ></textarea> -->
      <textarea
        class="write-box"
        @input="write"
        placeholder="Write here!!"
      ></textarea>
    </div>
  </div>
</template>

<script>
import FilterBox from "./FilterBox.vue";
import PostView from "./PostView.vue";

export default {
  emits: ["write", "update-filter"],
  //name: "",
  data() {
    return {
      MyFilter: "",
      filters: [
        "aden",
        "_1977",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2",
      ],
    };
  },
  mounted() {
    this.emitter.on("changeFilter", (e) => {
      this.MyFilter = e;
    });
  },
  methods: {
    //mitt 사용으로 인한 주석 처리
    // updateMyFilter(filter) {
    //   this.MyFilter = filter;
    //   // 옹, 그냥 넘겨도 되는구나
    //   this.$emit("update-filter", this.MyFilter);
    // },
    write(e) {
      let text = e.target.value;
      this.emitter.emit("writePost", text);
      // console.log(text);
    },
  },
  components: {
    // components는 vue 파일
    PostView: PostView,
    FilterBox: FilterBox,
  },
  props: {
    //props는 데이터 파일 등
    PostData: Object,
    CurrentPage: Number,
    more: Function,
    UploadUrl: String,
  },
  // watch: {
  //   CurrentPage(newValue) {
  //     console.log("currentPage: ", newValue);
  //   },
  // },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
