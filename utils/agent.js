import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://13.208.129.181:3001/api/';
const LOCAL_HOST_API_ROOT = 'http://localhost:4242/';
const API_FILE_ROOT_SMALL = 'https://manamusu.s3.ap-northeast-3.amazonaws.com/Uploads/Images/small/';
const API_FILE_ROOT_MEDIUM = 'https://manamusu.s3.ap-northeast-3.amazonaws.com/Uploads/Images/medium/';
const API_FILE_ROOT_ORIGINAL = 'https://manamusu.s3.ap-northeast-3.amazonaws.com/Uploads/Images/original/';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', token);
  }
}

const localhost = {
  del: url =>
    superagent.del(`${LOCAL_HOST_API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${LOCAL_HOST_API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${LOCAL_HOST_API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  patch: (url, body) =>
    superagent.patch(`${LOCAL_HOST_API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${LOCAL_HOST_API_ROOT}${url}`, body).then(responseBody)
};

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  patch: (url, body) =>
    superagent.patch(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const File = {
  upload: (file) =>
    requests.post('upload/aws', file),
  getLocalFile: (name, folder_name) =>
    requests.get(`local/file?filename=${name}&folder=${folder_name ? folder_name : 'orig'}`),
};
const Academics = {
  add: (info) =>
    requests.post('academic', info),
  edit: (info) =>
    requests.put('academic', info),
  get: id =>
    requests.put(`academic?academic_id=${id}`),
};
const Certificates = {
  add: (info) =>
    requests.post('certificates', info),
  edit: (info) =>
    requests.put('certificates', info),
  get: id =>
    requests.put(`certificates?certificate_id=${id}`),
};
const Student = {
  createBooking: (info) =>
    requests.post('student/booking', info),
  createBookingComplain: (info) =>
    requests.post('student/booking-complain', info),
  createTimeSlotComplain: (info) =>
    requests.post('student/time-slot-complain', info),
  getBookingAmount: (info) =>
    requests.post('student/make-payment-amount', info),
  editMakeOffer: (info) =>
    requests.post('student/edit-make-offer', info),
  myCoursesPending: (page) =>
    requests.get(`student/booking?limit=10&page=${page ? page : 0}&status=1`),
  myCoursesPendingPayment: (page) =>
    requests.get(`student/booking?limit=10&page=${page ? page : 0}&status=2`),
  myCoursesDecline: (page) =>
    requests.get(`student/booking?limit=10&page=${page ? page : 0}&status=3`),
  myCoursesCompleted: (page) =>
    requests.get(`student/booking?limit=10&page=${page ? page : 0}&status=5`),
  myCoursesOnGoing: (page) =>
    requests.get(`student/booking?limit=10&page=${page ? page : 0}&status=4`),
  getBookingDetailsByBookingId: (id) =>
    requests.get(`student/booking-detail?booking_id=${id}`),
  getBookingDetailsByPostId: (id) =>
    requests.get(`student/booking-detail?post_id=${id}`),
  deleteTimeSlotByBookingId: (info) =>
    requests.post(`student/cancel-time-slots`, info),
  addTimeSlotByBookingId: (info) =>
    requests.post(`student/add-time-slots`, info),
  acceptInterestedTeacher: (info) =>
    requests.post(`student/accept-response`, info),
  rejectInterestedTeacher: (info) =>
    requests.post(`student/decline-response`, info),
  makePayment: (info) =>
    requests.post(`student/make-payment`, info),
  getProfileById: id =>
    requests.get(`profile?user_id=${id}`),
  getCalenderData: (month, year) =>
    requests.get(`student/calendar?year=${year}&month=${month}`),
};
const Teacher = {
  acceptBooking: (info) =>
    requests.post('teacher/accept-booking', info),
  addNormalBankDetails: (info) =>
    requests.post('teacher/add-bank-details', info),
  addStripeBankDetails: (info) =>
    requests.post('teacher/connect-account', info),
  updateNormalBankDetails: (info) =>
    requests.put('teacher/add-bank-details', info),
  declineBooking: (info) =>
    requests.post('teacher/decline-booking', info),
  createClassLogs: (info) =>
    requests.post('teacher/save-log', info),
  acceptTimeSlot: (info) =>
    requests.post('teacher/accept-time-slot', info),
  declineTimeSlot: (info) =>
    requests.post('teacher/decline-time-slot', info),
  interestedRequest: (info) =>
    requests.post('teacher/send-response', info),
  declineInterestedRequest: (info) =>
    requests.post('teacher/decline-response', info),
  myCoursesPending: (page) =>
    requests.get(`teacher/booking?limit=10&page=${page ? page : 0}&status=1`),
  myCoursesPendingPayment: (page) =>
    requests.get(`teacher/booking?limit=10&page=${page ? page : 0}&status=2`),
  myCoursesDecline: (page) =>
    requests.get(`teacher/booking?limit=10&page=${page ? page : 0}&status=3`),
  myCoursesCompleted: (page) =>
    requests.get(`teacher/booking?limit=10&page=${page ? page : 0}&status=5`),
  myCoursesOnGoing: (page) =>
    requests.get(`teacher/booking?limit=10&page=${page ? page : 0}&status=4`),
  getBookingDetails: booking_id =>
    requests.get(`teacher/booking-detail?booking_id=${booking_id}`),
  getProfileById: id =>
    requests.get(`profile?user_id=${id}`),

  appliedReqRes: (page) =>
    requests.get(`teacher/request-responses?status=1&limit=10&page=${page}`),
  acceptedReqRes: (page) =>
    requests.get(`teacher/request-responses?status=2&limit=10&page=${page}`),
  declineReqRes: (page) =>
    requests.get(`teacher/request-responses?status=3&limit=10&page=${page}`),
  getCalenderData: (month, year) =>
    requests.get(`teacher/calendar?month=${month}&year=${year}`),
};

const Auth = {
  login: info =>
    requests.post('login', info),
  signup: info =>
    requests.post('signup', info),
  verifyForgotPassword: info =>
    requests.post('verify/email', info),
  checkEmailOtp: info =>
    requests.post('check-email-otp', info),
  resetPassword: info =>
    requests.post('reset/password', info),
  forgotPassword: info =>
    requests.post('forgot/password', info),
  changePassword: info =>
    requests.post('user/change-password', info),
  getPost: (query) =>
    requests.get(`teacher/post${query}limit=10`),
  getRequest: (query) =>
    requests.get(`student/request${query}limit=10`),
  getPostById: (id, currency) =>
    requests.get(`teacher/post-detail?post_id=${id}&currency=${currency}`),
  getRequestById: (id, currency) =>
    requests.get(`student/request-detail?request_id=${id}&currency=${currency}`),
  createPost: info =>
    requests.post(`teacher/post`, info),
  updatePostById: info =>
    requests.put(`teacher/post`, info),
  createRequest: info =>
    requests.post(`student/request`, info),
  updateRequestById: info =>
    requests.put(`student/request`, info),
  deletePostById: info =>
    requests.post(`teacher/delete-post`, info),
  deleteRequestById: info =>
    requests.post(`student/delete-request`, info),
};
const Profile = {
  update: info =>
    requests.put(`profile`, info),
  updateProfileImage: profile_image =>
    requests.put(`profile`, { profile_image: profile_image }),
  updateDescription: description =>
    requests.put(`profile`, { description: description }),
  get: () =>
    requests.get(`profile`),
};
const Common = {
  TeacherSubject: () =>
    requests.get(`teacher/subjects`),
  TeacherAcademicList: () =>
    requests.get(`teacher/academicList`),
  TeacherCertificateList: () =>
    requests.get(`teacher/certificateList`),
  staticData: () =>
    requests.get(`static-data`),
  StudentSubject: () =>
    requests.get(`student/subjects`),
  TeacherFilterByStudent: (query) =>
    requests.get(`student/filter${query}limit=10`),
  StudentFilterByTeacher: (query) =>
    requests.get(`student/all-requests${query}limit=10`),
  createContactUs: (info) =>
    requests.post(`contact-us`, info),
};

const Chat = {
  getUserSidebar: (page, status) =>
    requests.get(`chat/listing?limit=10&page=${page}&status=${status}`),
  getMessageByConversion: (conversation_id, page) =>
    requests.get(`chat/messages?conversation_id=${conversation_id}&limit=10&page=${page}`),
  // getClientSecret: info =>
  //   localhost.post(`create-payment-intent`, info),
  sendMessage: info =>
    requests.post(`send/message`, info),
};

export default {
  Auth,
  Common,
  Chat,
  Profile,
  Academics,
  Certificates,
  Student,
  Teacher,
  File,
  API_ROOT,
  API_FILE_ROOT_SMALL,
  API_FILE_ROOT_MEDIUM,
  API_FILE_ROOT_ORIGINAL,
  setToken: _token => { token = _token; }
};
