import actions from "../actions";
const defaultState = {
  name: "Hamim",
  icon: "url",
  user_type: "student",
  lang: "en",
}
export default (state = defaultState, action) => {
  switch (action.type) {

    case actions.INITIALISE_USER:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
