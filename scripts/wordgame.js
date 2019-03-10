Vue.component('star-rating', VueStarRating.default);
let app = new Vue({
  el: '#app',
  data: {
    gameID: 'wordgame',
    addedName: '',
    addedComment: '',
    commentTime: '',
    comments: {},
    ratings: {},
    averageRatings: '',
  },
  methods: {
    setRating(rating){
      if (!(this.gameID in this.ratings))
        Vue.set(this.ratings, this.gameID, {
          sum: 0,
          total: 0,
          averageRatings: 0,
        });
      this.ratings[this.gameID].sum += rating;
      this.ratings[this.gameID].total += 1;
      this.averageRatings = (this.ratings[this.gameID].sum / this.ratings[this.gameID].total);
     },
     addComment() {
       if (!(this.gameID in this.comments))
         Vue.set(app.comments, this.gameID, new Array);
       this.comments[this.gameID].push({
         author: this.addedName,
         time: moment().format('MMMM Do YYYY, h:mm:ss a'),
         text: this.addedComment
       });
       this.addedName = '';
       this.addedComment = '';
     },
  }
});
