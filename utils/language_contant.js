
let lang = null;

const Common = {
  aboutUs: () => {
    switch (lang) {
      case "en":
        return "About Us"
      case "it":
        return "Chi siamo"
      case "jp":
        return "私たちに関しては"

      default:
        return "About Us"
    }
  },
  about: () => {
    switch (lang) {
      case "en":
        return "About"
      case "jp":
        return "約"
      default:
        return "About"
    }
  },
  howToUse: () => {
    switch (lang) {
      case "en":
        return "How it Works"
      case "it":
        return "Come usare"
      case "jp":
        return "使い方"
      default:
        return "How it Works"
    }
  },
  teacher: () => {
    switch (lang) {
      case "en":
        return "Teacher"
      case "it":
        return "Insegnante"
      case "jp":
        return "先生"
      default:
        return "Teacher"
    }
  },
  student: () => {
    switch (lang) {
      case "en":
        return "Student"
      case "it":
        return "Alunna"
      case "jp":
        return "学生"
      default:
        return "Student"
    }
  },
  contact: () => {
    switch (lang) {
      case "en":
        return "Contact"
      case "it":
        return "Contatto"
      case "jp":
        return "連絡先"
      default:
        return "Contact"
    }
  },
  signIn: () => {
    switch (lang) {
      case "en":
        return "Sign In"
      case "it":
        return "Registrati"
      case "jp":
        return "サインイン"
      default:
        return "Sign In"
    }
  },
  signUp: () => {
    switch (lang) {
      case "en":
        return "Sign Up"
      case "it":
        return "Iscriviti"
      case "jp":
        return "サインアップ"
      default:
        return "Sign Up"
    }
  },
  support: () => {
    switch (lang) {
      case "en":
        return "Support"
      case "it":
        return "Supporto"
      case "jp":
        return "サポート"
      default:
        return "Support"
    }
  },
  termsConditions: () => {
    switch (lang) {
      case "en":
        return "Terms & Conditions"
      case "it":
        return "Termini & Condizioni"
      case "jp":
        return "利用規約"
      default:
        return "Terms & Conditions"
    }
  },
  company: () => {
    switch (lang) {
      case "en":
        return "Company"
      case "jp":
        return "会社"
      default:
        return "Company"
    }
  },
  importantLinks: () => {
    switch (lang) {
      case "en":
        return "Important Links"
      case "jp":
        return "重要なリンク"
      default:
        return "Important Links"
    }
  },
  home: () => {
    switch (lang) {
      case "en":
        return "Home"
      case "jp":
        return "ホームホーム"
      default:
        return "Home"
    }
  },
  howItWorks: () => {
    switch (lang) {
      case "en":
        return "How It Works"
      case "jp":
        return "使い方"
      default:
        return "How It Works"
    }
  },
  teachers: () => {
    switch (lang) {
      case "en":
        return "Teacher's"
      case "jp":
        return "先生の"
      default:
        return "Teacher's"
    }
  },
  students: () => {
    switch (lang) {
      case "en":
        return "Student's"
      case "jp":
        return "学生"
      default:
        return "Student's"
    }
  },
  others: () => {
    switch (lang) {
      case "en":
        return "Others"
      case "jp":
        return "その他"
      default:
        return "Others"
    }
  },
  contactUs: () => {
    switch (lang) {
      case "en":
        return "Contact Us"
      case "jp":
        return "お問い合わせ"
      default:
        return "Contact Us"
    }
  },
  careers: () => {
    switch (lang) {
      case "en":
        return "Careers"
      case "jp":
        return "キャリア"
      default:
        return "Careers"
    }
  },
  blog: () => {
    switch (lang) {
      case "en":
        return "Blog"
      case "jp":
        return "ブログ"
      default:
        return "Blog"
    }
  },
  followUs: () => {
    switch (lang) {
      case "en":
        return "Follow Us"
      case "jp":
        return "フォローする"
      default:
        return "Follow Us"
    }
  },
  AllRightsReserved: () => {
    switch (lang) {
      case "en":
        return "All rights reserved"
      case "jp":
        return "全著作権所有"
      default:
        return "All rights reserved"
    }
  },
  STUDENTS: () => {
    switch (lang) {
      case "en":
        return "STUDENTS"
      case "jp":
        return "学生"
      default:
        return "STUDENTS"
    }
  },
  TEACHERS: () => {
    switch (lang) {
      case "en":
        return "TEACHERS"
      case "jp":
        return "教師"
      default:
        return "TEACHERS"
    }
  },
  viewAllStudent: () => {
    switch (lang) {
      case "en":
        return "View all Student's"
      case "jp":
        return "すべての学生を表示"
      default:
        return "View all Teacher"
    }
  },
  viewAllTeacher: () => {
    switch (lang) {
      case "en":
        return "View all Teacher's"
      case "jp":
        return "すべての教師を表示"
      default:
        return "View all Teacher's"
    }
  },
  seeTeacher: () => {
    switch (lang) {
      case "en":
        return "See Teacher's"
      case "jp":
        return "教師を見る"
      default:
        return "See Teacher's"
    }
  },
  seeStudent: () => {
    switch (lang) {
      case "en":
        return "See Student's"
      case "jp":
        return "学生を見る"
      default:
        return "See Student's"
    }
  },
  profile: () => {
    switch (lang) {
      case "en":
        return "Profile"
      case "jp":
        return "プロフィール"
      default:
        return "Profile"
    }
  },
  edit: () => {
    switch (lang) {
      case "en":
        return "Edit"
      case "jp":
        return "編集"
      default:
        return "Edit"
    }
  },
  replace: () => {
    switch (lang) {
      case "en":
        return "Replace"
      case "jp":
        return "編集"
      default:
        return "Replace"
    }
  },
  createPost: () => {
    switch (lang) {
      case "en":
        return "Create Post"
      case "jp":
        return "投稿を作成する"
      default:
        return "Create Post"
    }
  },
  createRequest: () => {
    switch (lang) {
      case "en":
        return "Create Request"
      case "jp":
        return "投稿を作成する"
      default:
        return "Create Request"
    }
  },
  email: () => {
    switch (lang) {
      case "en":
        return "Email"
      case "jp":
        return "Eメール"
      default:
        return "Email"
    }
  },
  name: () => {
    switch (lang) {
      case "en":
        return "Name"
      case "jp":
        return "名前"
      default:
        return "Name"
    }
  },
  dob: () => {
    switch (lang) {
      case "en":
        return "Dob"
      case "jp":
        return "ドブ"
      default:
        return "Dob"
    }
  },
  contactNumber: () => {
    switch (lang) {
      case "en":
        return "Mobile No."
      case "jp":
        return "連絡先番号"
      default:
        return "Mobile No."
    }
  },
  gender: () => {
    switch (lang) {
      case "en":
        return "Gender"
      case "jp":
        return "性別"
      default:
        return "Gender"
    }
  },
  nationality: () => {
    switch (lang) {
      case "en":
        return "Nationality"
      case "jp":
        return "国籍"
      default:
        return "Nationality"
    }
  },
  location: () => {
    switch (lang) {
      case "en":
        return "Location"
      case "jp":
        return "ロケーション"
      default:
        return "Location"
    }
  },
  language: () => {
    switch (lang) {
      case "en":
        return "Language"
      case "jp":
        return "言語"
      default:
        return "Language"
    }
  },
  profileDescription: () => {
    switch (lang) {
      case "en":
        return "Profile Description"
      case "jp":
        return "プロファイルの説明"
      default:
        return "Profile Description"
    }
  },
  academicHistory: () => {
    switch (lang) {
      case "en":
        return "Academic History"
      case "jp":
        return "学歴"
      default:
        return "Academic History"
    }
  },
  addAcademics: () => {
    switch (lang) {
      case "en":
        return "Add Academics"
      case "jp":
        return "アカデミックを追加"
      default:
        return "Add Academics"
    }
  },
  addCertificates: () => {
    switch (lang) {
      case "en":
        return "Add Certificates"
      case "jp":
        return "証明書を追加する"
      default:
        return "Add Certificates"
    }
  },
  certificates: () => {
    switch (lang) {
      case "en":
        return "Certificates"
      case "jp":
        return "証明書"
      default:
        return "Certificates"
    }
  },
  myProfile: () => {
    switch (lang) {
      case "en":
        return "My Profile"
      case "jp":
        return "私のプロフィール"
      default:
        return "My Profile"
    }
  },
  myCourses: () => {
    switch (lang) {
      case "en":
        return "My Courses"
      case "jp":
        return "私のコース"
      default:
        return "My Courses"
    }
  },
  myRequest: () => {
    switch (lang) {
      case "en":
        return "My Request"
      case "jp":
        return "私の要求"
      default:
        return "My Request"
    }
  },
  payment: () => {
    switch (lang) {
      case "en":
        return "Payment"
      case "jp":
        return "支払い"
      default:
        return "Payment"
    }
  },
  privacyPolicy: () => {
    switch (lang) {
      case "en":
        return "Privacy Policy"
      case "jp":
        return "個人情報保護方針"
      default:
        return "Privacy Policy"
    }
  },
  changePassword: () => {
    switch (lang) {
      case "en":
        return "Change Password"
      case "jp":
        return "パスワードを変更する"
      default:
        return "Change Password"
    }
  },
  logOut: () => {
    switch (lang) {
      case "en":
        return "Log Out"
      case "jp":
        return "ログアウト"
      default:
        return "Log Out"
    }
  },
  signUpToYourAccount: () => {
    switch (lang) {
      case "en":
        return "Sign Up To Your Account"
      case "jp":
        return "ログアウト"
      default:
        return "Sign Up To Your Account"
    }
  },
  signInToYourAccount: () => {
    switch (lang) {
      case "en":
        return "Sign In To Your Account"
      case "jp":
        return "アカウントにサインインする"
      default:
        return "Sign In To Your Account"
    }
  },
  firstName: () => {
    switch (lang) {
      case "en":
        return "First Name"
      case "jp":
        return "ファーストネーム"
      default:
        return "First Name"
    }
  },
  lastName: () => {
    switch (lang) {
      case "en":
        return "Last Name"
      case "jp":
        return "苗字"
      default:
        return "Last Name"
    }
  },
  firstNameError: () => {
    switch (lang) {
      case "en":
        return "Please provide first name"
      case "jp":
        return "名を入力してください"
      default:
        return "Please provide first name"
    }
  },
  lastNameError: () => {
    switch (lang) {
      case "en":
        return "Please provide last name"
      case "jp":
        return "姓を入力してください"
      default:
        return "Please provide last name"
    }
  },
  emailError: () => {
    switch (lang) {
      case "en":
        return "Please provide email"
      case "jp":
        return "メールを送ってください"
      default:
        return "Please provide email"
    }
  },
  confirm: () => {
    switch (lang) {
      case "en":
        return "Confirm"
      case "jp":
        return "確認"
      default:
        return "Confirm"
    }
  },
  password: () => {
    switch (lang) {
      case "en":
        return "Password"
      case "jp":
        return "パスワード"
      default:
        return "Password"
    }
  },
  selectAccountType: () => {
    switch (lang) {
      case "en":
        return "Select Account type"
      case "jp":
        return "アカウントタイプを選択します"
      default:
        return "Select Account type"
    }
  },
  parents: () => {
    switch (lang) {
      case "en":
        return "Parents"
      case "jp":
        return "親"
      default:
        return "Parents"
    }
  },
  next: () => {
    switch (lang) {
      case "en":
        return "Next"
      case "jp":
        return "次"
      default:
        return "Next"
    }
  },
  back: () => {
    switch (lang) {
      case "en":
        return "Back"
      case "jp":
        return "次"
      default:
        return "Back"
    }
  },
  selectLanguage: () => {
    switch (lang) {
      case "en":
        return "Select Language"
      case "jp":
        return "言語を選択する"
      default:
        return "Select Language"
    }
  },
  selectNationality: () => {
    switch (lang) {
      case "en":
        return "Select Nationality"
      case "jp":
        return "言語を選択する"
      default:
        return "Select Nationality"
    }
  },
  selectOccupation: () => {
    switch (lang) {
      case "en":
        return "Select Occupation"
      case "jp":
        return "言語を選択する"
      default:
        return "Select Occupation"
    }
  },
  pleaseFillYourDetails: () => {
    switch (lang) {
      case "en":
        return "Please Fill your Details"
      case "jp":
        return "あなたの詳細を記入してください"
      default:
        return "Please Fill your Details"
    }
  },
  currentLocation_Address: () => {
    switch (lang) {
      case "en":
        return "Current Location/Address"
      case "jp":
        return "現在の場所/住所"
      default:
        return "Current Location/Address"
    }
  },
  address: () => {
    switch (lang) {
      case "en":
        return "Address"
      case "jp":
        return "住所"
      default:
        return "Address"
    }
  },
  occupation: () => {
    switch (lang) {
      case "en":
        return "Occupation"
      case "jp":
        return "職業"
      default:
        return "Occupation"
    }
  },
  writeHere: () => {
    switch (lang) {
      case "en":
        return "Write Here"
      case "jp":
        return "ここに書く"
      default:
        return "Write Here"
    }
  },
  academics: () => {
    switch (lang) {
      case "en":
        return "Academics"
      case "jp":
        return "学者"
      default:
        return "Academics"
    }
  },
  optional: () => {
    switch (lang) {
      case "en":
        return "Optional"
      case "jp":
        return "オプション"
      default:
        return "Optional"
    }
  },
  alreadyHaveAnAccount: () => {
    switch (lang) {
      case "en":
        return "Already have an account?"
      case "jp":
        return "すでにアカウントをお持ちですか？"
      default:
        return "Already have an account?"
    }
  },
  forgetPassword: () => {
    switch (lang) {
      case "en":
        return "Forget Password?"
      case "jp":
        return "パスワードを忘れましたか？"
      default:
        return "Forget Password?"
    }
  },
}
const HomePage = {
  bannerTitle: () => {
    switch (lang) {
      case "en":
        return <h1 class="banner-heading">Learn New Skills Online With Top<br /> <span class="text-primary fw-700">Educators.</span></h1>
      case "it":
        return <h1 class="banner-heading">Impara nuove abilità online con Top<br /> <span class="text-primary fw-700">Educatori.</span></h1>
      case "jp":
        return <h1 class="banner-heading">トップでオンラインで新しいスキルを学ぶ<br /> <span class="text-primary fw-700">教育者。</span></h1>
      default:
        return <h1 class="banner-heading">Learn New Skills Online With Top<br /> <span class="text-primary fw-700">Educators.</span></h1>
    }
  },
  bannerSubTitle: () => {
    switch (lang) {
      case "en":
        return <p>His ideas somewhere me to founding so unable late, the unrecognizable</p>
      case "it":
        return <p>Le sue idee da qualche parte mi fondano così incapace tardi, l'irriconoscibile</p>
      case "jp":
        return <p>彼のアイデアはどこかで私が設立するのに遅れることができず、認識できない</p>
      default:
        return <p>His ideas somewhere me to founding so unable late, the unrecognizable</p>
    }
  },
  studentRecentPost: () => {
    switch (lang) {
      case "en":
        return <>Recent <span class="text-primary fw-700">Student's</span> Post</>
      case "jp":
        return <>最近 <span class="text-primary fw-700">学生</span> 役職</>
      default:
        return <>Recent <span class="text-primary fw-700">Student's</span> Post</>
    }
  },
  studentSubTitle: () => {
    switch (lang) {
      case "en":
        return "Aenean consectetur tortor in libero scelerisque commodo"
      case "jp":
        return "フリーサーマルでジャスミン強化マクロをお願いします"
      default:
        return "Aenean consectetur tortor in libero scelerisque commodo"
    }
  },
  teacherRecentPost: () => {
    switch (lang) {
      case "en":
        return <>Recent <span class="text-primary fw-700">Teacher's</span> Post</>
      case "jp":
        return <>最近 <span class="text-primary fw-700">先生の</span> 役職</>
      default:
        return <>Recent <span class="text-primary fw-700">Teacher's</span> Post</>
    }
  },
  howItWorks: () => {
    switch (lang) {
      case "en":
        return <>How it <span class="text-primary fw-700">Works</span></>
      case "jp":
        return <>どのように <span class="text-primary fw-700">作品</span> </>
      default:
        return <>How it <span class="text-primary fw-700">Works</span></>
    }
  },
  teacherSubTitle: () => {
    switch (lang) {
      case "en":
        return "Aenean consectetur tortor in libero scelerisque commodo"
      case "jp":
        return "フリーサーマルでジャスミン強化マクロをお願いします"
      default:
        return "Aenean consectetur tortor in libero scelerisque commodo"
    }
  },
  startLearningToday: () => {
    switch (lang) {
      case "en":
        return "Star Learning Today"
      case "it":
        return "Inizia a imparare oggi"
      case "jp":
        return "今日のスターラーニング"
      default:
        return "Star Learning Today"
    }
  },
}

export default {
  Common,
  HomePage,
  setLang: _lang => { lang = _lang; }
};
