<template>
  <!-- 혼자 클릭해서 필터 넘기고 바꾸는 거 성공!! textarea 값을 App.vue로 넘기는 거 응용.-->
  <!-- 근데 더 편한 mitt이 있다고 하네... ;ㅅ;-->
  <!-- 아 근데 어차피 게시물 작성에서도 필터 씌워야 하니 위로 위로 옮겨야 하는 거 아닌가? 아닌가...? -->
  <!-- 그냥 더 편하네... -->
  <!-- props용 -->
  <div
    class="filter-item"
    :style="{ backgroundImage: `url(${UploadUrl})` }"
    :class="filters"
    @click="changeFilter"
  >
    <!-- <div
    class="filter-item"
    :style="{ backgroundImage: `url(${UploadUrl})` }"
    :class="filters"
    @click="$emit('changeFilter', filters)"
  > -->
    <!-- {{ filters }} -->

    <!-- slot은 :class에 넣을 수 없다 -->
    <!-- 또 너무 slot이 많으면 더 복잡할 수 있다. 즉, bind할 게 많으면 걍 props. -->
    <!-- slot: 간단함, props: 범용적 -->
    <!-- <slot name="a">{{ filters }}</slot> -->
    <slot></slot>
    <!-- <button @click="fire">TestButton</button> -->
  </div>
</template>

<script>
export default {
  //name: "",
  emits: ["changeFilter"],
  data() {
    return {};
  },
  methods: {
    fire() {
      this.emitter.emit("fire", "FIRE!!"); //event 송신
    },
    changeFilter() {
      console.log(this.filters);
      //예제만 보고 수정했는데 아주 잘된다. 진짜 편하다... 보내고 받기만 하면 되니까
      this.emitter.emit("changeFilter", this.filters);
    },
  },
  components: {},
  props: { UploadUrl: String, filters: Object },
};
</script>

<style>
/*body {
   margin: 0;
 }*/
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
  border: 1px solid #000;
}
</style>
