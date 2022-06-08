import { defineComponent, reactive, onMounted } from "vue";
import styles from "./index.module.scss";
export default defineComponent({
  name: "selectBtnList2",
  props: {
    list: {
      type: Array,
      default() {
        return [
          { name: "今日", code: 1 },
          { name: "本周", code: 2 },
          { name: "本月", code: 3 },
        ];
      },
    },
    auto: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  setup(props, { emit }) {
    let state = reactive({
      selectIndex: 0,
    });
    let handleClick = function (value, index) {
      state.selectIndex = index;
      emit("handleClick", value, index);
    };
    onMounted(() => {
      if (props.auto) {
        //默认自动触发第一个
        emit("handleClick", props.list[state.selectIndex]);
      }
    });
    return () => (
      <div class={styles.selectBtnList}>
        {props.list.map((item, index) => (
          <div
            onClick={() => handleClick(item, index)}
            class={[
              styles.itemButton,
              index === state.selectIndex ? styles.selectBtn : "",
            ]}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  },
});
