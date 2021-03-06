const photos = [
  { id: 0, name: "1.png" },
  { id: 1, name: "2.png" },
  { id: 2, name: "3.png" },
  { id: 3, name: "4.png" },
  { id: 4, name: "5.png" },
  { id: 5, name: "6.png" },
  { id: 6, name: "7.png" } 
]

Vue.component("photo-display", {
  props: ["photo"],
  template: `
    <div>
      <img class="slide" @click="$emit('next-photo')" v-bind:src="'images/' + photo.name" width="1000" height="600">
    </div>
  `
})

Vue.component("control-panel", {
  template: `
  <div>
    <button @click="$emit('prev-photo')">前へ</button>
    <button @click="$emit('next-photo')">次へ</button>
    <label for="auto">自動</label>
    <input type="checkbox" v-model='auto' id='auto' @change="$emit('toggle-auto', auto)">
  </div>
  `,
  data: function(){
    return {
      auto: false
    }
  }
})

const app = new Vue({
  el: "#app",
  data: {
    name: "平田むつみ",
    tel: "０９４２ー７７ー００１７",
    area: "images/access.png",
    teacherImage: "images/pre_teacher.png",
    picture1: "images/sample1.png",
    picture2: "images/sample2.png",
    picture3: "images/sample3.png",
    picture4: "images/sample4.png",
    picture5: "images/sample5.png",
    picture6: "images/sample6.png",
    picture7: "images/sample7.png",
    picture8: "images/sample8.png",
    visible: false,
    auto: false,
    photos: photos,
    id: 0,
    photo: null,
    timerID: null,
    SLIDEINTERVAL: 3000
  },
  mounted() {
    window.addEventListener("load", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("load", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.visible) {
        const top = this.$el.getBoundingClientRect().top;
        this.visible = top < window.innerHeight + 1000
        ;
      }
    },
    nextPhoto: function(){
      this.id ++
      if (this.id >= this.photos.length ) {
        this.id = 0
      }
      this.photo = this.photos[this.id]
    },
    prevPhoto: function(){
      this.id --
      if (this.id < 0) {
        this.id = this.photos.length - 1
      }
      this.photo = this.photos[this.id] 
    },
    toggleAuto: function(auto){
      if (this.auto == auto) return
      this.auto = auto
      if (auto) {
        this.slideShow()
      } else {
        clearTimeout(this.timerID)
      }
    },
    slideShow: function(){
      this.nextPhoto()
      var self = this
      this.timerID = setTimeout(self.slideShow, self.SLIDEINTERVAL)
    }
  },
  created: function(){
    this.photo = this.photos[this.id]
  }
})