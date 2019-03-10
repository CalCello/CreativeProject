Vue.component('star-rating', VueStarRating.default);
let app = new Vue({
  el: '#app',
  data: {
    gameID: 'wordgame',
    prevWord: '',
    word: '',
    addedWords: [],
    addedName: '',
    addedComment: '',
    commentTime: '',
    comments: {},
    ratings: {},
    averageRatings: '',
  },
  computed: {
    allWords() {
      return this.addedWords;
    }
  },
  methods: {
    addWord() {
      var newWordIter = 0, prevWordIter = 0;
      var newWordLen = this.word.length;
      var prevWordLen = this.prevWord.length;
      var edits = 0;
      //First word entered
      if(this.prevWord === '') {
        console.log("FIRST");
        this.addedWords.push(this.word);
        this.prevWord = this.word;
        this.word = '';
        return;
      }

      // Credit GeeksforGeeks for solution
      while(newWordIter < newWordLen && prevWordIter < prevWordLen) {
        if(this.word.charAt(newWordIter) != this.prevWord.charAt(prevWordIter)) {
          edits++;
          if(newWordLen > prevWordLen) {
            newWordIter++;
          }
          else if(prevWordLen > newWordLen) {
            prevWordIter++;
          }
          else {
            newWordIter++;
            prevWordIter++;
          }
        }
        else {
          newWordIter++;
          prevWordIter++;
        }
      }

      if(newWordIter < newWordLen || prevWordIter < prevWordLen) {
        edits++;
      }

      // You changed the word properly
      if(edits <= 1) {
        console.log("RIGHT");
        this.addedWords.push(this.word);
        this.prevWord = this.word;
        this.word = '';
      }
      // You failed to change the word properly
      else {
        console.log("WRONG");
        alert("You got a score of " + this.addedWords.length);
        this.addedWords.length = 0;
        this.prevWord = '';
        this.word = '';
      }
    },

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
