const nameRegExp = /^[가-힣]{2,4}$/;
const emailRegexp = /^[A-Za-z0-9_\\-]+@[A-Za-z0-9-]+[.]{1}[A-Za-z]{1,3}$/;
const passwordRegexp = /^[a-zA-z0-9]{4,12}$/;

export const checkAll = (values) => {
  const { email, name, password, passwordCheck } = values;
  if (!email || !name || !password || !passwordCheck) {
    alert("모든 항목을 입력해주세요.");
    return null;
  } else if (!nameRegExp.test(name)) {
    alert("Username 형식이 올바르지 않습니다.");
    return false;
  } else if (!emailRegexp.test(email)) {
    alert("Email 형식이 올바르지 않습니다.");
    return false;
  } else if (!passwordRegexp.test(password)) {
    alert("Password 형식이 올바르지 않습니다.");
    console.log(false);
    return false;
  } else if (password !== passwordCheck) {
    alert("Password가 다릅니다");
    return false;
  } else if (name === password) {
    alert("Username과 비밀번호는 같을 수 없습니다.");
    return false;
  } else if (email === password) {
    alert("email과 비밀번호는 같을 수 없습니다.");
    return false;
  }
};

const nameRegExp2 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,4}$/;

export const checkName = (name) => {
  if (!nameRegExp2.test(name)) {
    return "Name";
  }
  return null;
};
export const checkEmail = (email) => {
  if (!emailRegexp.test(email)) {
    return "Email";
  }
  return null;
};

export const checkPassword = (password) => {
  if (!passwordRegexp.test(password)) {
    return "Password";
  }
  return null;
};
