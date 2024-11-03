<template>
  <div style="padding: 10px">
    <h4>Followers</h4>
    <input placeholder="find" v-on:input="search($event.target.value)" />
    <div class="post-header" v-for="(follower, i) in result" :key="i">
      <div class="profile" :style="{ backgroundImage: `url(${follower.image})` }">
        <span class="profile-name" style="padding-left: 40px">
          {{ follower.name }}
        </span>
      </div>
    </div>
  </div>
  {{ console.log(result) }}

  <!-- <PostView :PostData="PostData[i]" v-for="(post, i) in PostData" :key="i" :index="i" /> -->
</template>

<script>
import axios from "axios";
import { computed, onMounted, reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";

export default {
  //name: "",
  setup(props) {
    //ref에 담아야 실시간 반영 가능, 잘 모르면 그냥 쓰자.
    // ref는 나머지, reactive에는 array, object를 넣음
    let follower = ref([]);
    // eslint-disable-next-line no-unused-vars
    let test = reactive({ name: "kim" });
    let keyword = ref("");
    let store = useStore();
    //=$store
    console.log(store.state.name);

    //ref로 감싸지 않으면 상위에서 수정을 할 때 적용 안 될 수 있음
    // let {one , two} = toRefs(props);
    let { one } = toRefs(props);
    console.log(one.value);

    watch(one, () => {
      console.log("one changed");
    });

    onMounted(() => {
      axios.get("/store/follower.json").then((a) => {
        follower.value = a.data;
      });
    });
    //이렇게 하면 computed에 들어감!!
    let result = computed(() => {
      if (!keyword.value) return follower.value;
      return follower.value.filter((f) =>
        f.name.toLowerCase().includes(keyword.value.toLowerCase())
      );
    });

    function search(input) {
      keyword.value = input;
    }
    return { follower, result, search };
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
  props: { one: Number },
};
</script>

<style>
/*body {
   margin: 0;
 }*/
</style>
