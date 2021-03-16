export default {
  setConfig(state, data) { state.config = data; },
  setNumberOfEmotions(state, number) { state.config.numberOfEmotions = number; },
  setMessageTimeOut(state, timeOut) { state.config.messageTimeOut = timeOut; },
  setRatingMessage(state, message) { state.config.ratingMessage = message; },
  setFilteredEmotions(state, emotions) { state.filteredEmotions = emotions; },
  setTodayRatings(state, data) { state.todayRatings = data; },
  setEmotionsTableData(state, tableData) { state.emotionsTableData = tableData; },
  setEmotionsPieChartData(state, pieChartData) { state.emotionsPieChartData = pieChartData; },
  setEmotionsLineChartData(state, lineChartData) { state.emotionsLineChartData = lineChartData; },
  setErrorMessage(state, errorMessage) { state.errorMessage = errorMessage; },
  setAccessToken(state, token) { state.accessToken = token; },
  setUserInfo(state, user) { state.userInfo = user; },
};
