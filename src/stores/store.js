import { createStore } from "vuex";
import PostData from "./PostData";
import axios from "axios";

const store = createStore({
  // state 변경은 무조건 mutations. ajax 요청은 actions.
  state() {
    return {
      name: "kim",
      age: 20,
      postDatalikes: [
        { liked: false, likeAmount: PostData[0].likes },
        { liked: false, likeAmount: PostData[1].likes },
        { liked: false, likeAmount: PostData[2].likes },
      ],
      likes: [
        { liked: false, likeAmount: 0 },
        { liked: false, likeAmount: 32 },
        { liked: false, likeAmount: 44 },
      ],
      more: {},
      ClickNum: 0,
    };
  },
  mutations: {
    setMore(state, data) {
      state.more = data;
    },
    changeName(state) {
      state.name = "park";
    },
    // increaseAge(state) {
    //   state.age += 1;
    // },
    increaseAge(state, payload) {
      [(state.age = state.age + payload)];
    },
    postDataLikeIt(state, payload) {
      if (state.postData[payload].liked == false) {
        state.postData[payload].liked = true;
        state.postData[payload].likeAmount += 1;
      } else if (
        state.postData[payload].liked == true &&
        state.likes[payload].liked > 0
      ) {
        state.postData[payload].liked = false;
        state.postData[payload].likeAmount -= 1;
      }
    },
    likeIt(state, payload) {
      if (state.likes[payload].liked == false) {
        state.likes[payload].likeAmount += 1;
        state.likes[payload].liked = true;
        // console.log(state.likes[payload].liked);
        // console.log(state.likes[payload].likeAmount);
      } else if (
        state.likes[payload].liked == true &&
        state.likes[payload].liked > 0
      ) {
        state.likes[payload].likeAmount -= 1;
        state.likes[payload].liked = false;
        // console.log(state.likes[payload].liked);
        // console.log(state.likes[payload].likeAmount);
      }
    },
    clickNum(state) {
      state.ClickNum += 1;
    },
  },
  actions: {
    // ajax를 위한 인터페이스.
    // js는 ajax 요청이 길어지면 그 밑에 것을 먼저 하려는 성질이 있음.
    // actions에 넣으면 순차적으로 해 줌.
    getData(context) {
      // context ~= $store
      //위에 내용 사용은 context.state.~
      console.log(context.state.ClickNum);
      axios
        .get(
          "https://codingapple1.github.io/vue/more" +
            context.state.ClickNum +
            ".json"
          // "https://codingapple1.github.io/vue/more0.json"
        )
        .then((a) => {
          context.commit("setMore", a.data);
          context.commit("clickNum");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});

export default store;
