<template>
  <div class="mapAddress">
    <BaseMap class="online-supervision-map" @init="initMap" />
    <el-autocomplete
      v-model="searchKey"
      class="search-input"
      :fetch-suggestions="QuerySearchAddresss"
      placeholder="请输入关键字"
      value-key="name"
      :trigger-on-focus="false"
      @select="handleSelectOptions"
    ></el-autocomplete>
  </div>
</template>

<script>
import BaseMap from "@/components/AmapComponents/baseMap/index.js";
import {
  initMAP,
  dblclick,
  getAddress,
  autoAddress,
  setPoint,
  setFitView,
  mapSearchSelect,
  mapSearchSuggestion
} from "@/views/mapFNs.js";

export default {
  name: "mapAddress",
  components: {
    BaseMap,
  },
  data() {
    return {
      searchKey: "", // 搜索地址关键字
    };
  },
  methods: {
    async initMap(map) {
      this.map = map;
      initMAP(this);
      let autoNow = await autoAddress();
      setPoint({
        ifClearArea: true,
        points: [
          {
            points: autoNow[0],
            type: "self",
            color: "#f9a22a",
            size: [48, 48],
          },
        ],
      });
      setFitView();
      this.$emit("showAddress", autoNow[1], autoNow[0]);

      dblclick(async (position) => {
        let address = await getAddress(position);
        this.$emit("showAddress", address, position);
      });
    },
    handleSelectOptions(val) {
      let res = mapSearchSelect(val);
      this.$emit("showAddress", res.district + res.address, [
        res.location.getLng(),
        res.location.getLat(),
      ]);
    },
    QuerySearchAddresss(keywords, cb) {
      mapSearchSuggestion(keywords, cb);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.mapAddress {
  width: 64%;
  height: 350px;

  .search-input {
    top: 0;
    position: absolute;
  }
}
</style>
