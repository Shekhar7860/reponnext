import actions from "../actions";
const defaultState = {
  post: [],
  users: [{
    icon: "right_card_img.png",
    title: "Looking for ECE A levels Math Tutor urgently",
    timestamp: 0,
    subject: "Math, Physics",
    class_level: "A levels",
    price: "$ 10/hr",
    user: "Hyunwoong Kim",
    user_id: "xyz",
    rate: "3.5"
  }, {
    icon: "right_card_img.png",
    title: "Looking for ECE A levels Math Tutor urgently",
    timestamp: 0,
    subject: "Math, Physics",
    class_level: "B levels",
    price: "$ 12/hr",
    user: "User 2",
    user_id: "xyz",
    rate: "3.5"
  }, {
    icon: "right_card_img.png",
    title: "Looking for ECE A levels Math Tutor urgently",
    timestamp: 0,
    subject: "Math, Physics",
    class_level: "C levels",
    price: "$ 10/hr",
    user: "User 3",
    user_id: "xyz",
    rate: "3.5"
  }, {
    icon: "right_card_img.png",
    title: "Looking for ECE A levels Math Tutor urgently",
    timestamp: 0,
    subject: "Math, Physics",
    class_level: "D levels",
    price: "$ 11/hr",
    user: "User 4",
    user_id: "xyz",
    rate: "3.5"
  }, {
    icon: "right_card_img.png",
    title: "Looking for ECE A levels Math Tutor urgently",
    timestamp: 0,
    subject: "Math, Physics",
    class_level: "E levels",
    price: "$ 15/hr",
    user: "Hyunwoong Kim",
    user_id: "xyz",
    rate: "3.5"
  }, {
    icon: "right_card_img.png",
    title: "Looking for ECE A levels Math Tutor urgently",
    timestamp: 0,
    subject: "Math, Physics",
    class_level: "F levels",
    price: "$ 5/hr",
    user: "User 8",
    user_id: "xyz",
    rate: "3.5"
  }, {
    icon: "right_card_img.png",
    title: "Looking for ECE A levels Math Tutor urgently",
    timestamp: 0,
    subject: "Math, Physics",
    class_level: "G levels",
    price: "$ 3/hr",
    user: "Hyunwoong Kim",
    user_id: "xyz",
    rate: "3.5"
  }, {
    icon: "right_card_img.png",
    title: "Looking for ECE A levels Math Tutor urgently",
    timestamp: 0,
    subject: "Math, Physics",
    class_level: "H levels",
    price: "$ 4/hr",
    user: "Hyunwoong Kim",
    user_id: "xyz",
    rate: "3.5"
  }]

}
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_TEACHER_POST:
      return { ...state, post: action.payload };

    case actions.SET_TEACHER_USERS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
};
