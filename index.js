const userName = document.getElementById("user_create");
const password = document.getElementById("password_create");
const submitButton = document.getElementById("submit_button");
const logPo = document.querySelector(".login");
const signPo = document.querySelector(".sign_up");
const user = document.getElementById("user");
const password_old = document.getElementById("password");
const logIn = document.getElementById("logIn");
const demo1 = "demo1";
const demo1_pass = "skills2023d1";
var signed_up = false;
const SECRET_KEY = "access_granted";

function generateToken(user) {
  return jwt.sign({ user: user.user }, SECRET_KEY, { expiresIn: "1h" });
}

const arr = [
  {
    user: "demo1",
    password: await bcrypt.hash("skills2023d1", 13),
  },
  {
    user: "demo2",
    password: await bcrypt.hash("skills2023d2", 13),
  },
];
console.log(arr);
signPo.style.display = "flex";
logPo.style.display = "flex";

function logPop() {
  logPo.style.display = "flex";
}

function signPop() {
  signPo.style.display = "flex";
}

submitButton.addEventListener("click", async () => {
  if (!userName.value || !password.value) {
    alert("Username or password cannot be empty!");
    return;
  }

  const hash = await bcrypt.hash(password.value, 13);
  password.value = "";

  arr.push({
    user: userName.value,
    password: hash,
  });

  alert("User registered successfully!");
  console.log(arr);
});

logIn.addEventListener("click", async () => {
  const username = user.value;
  const enteredPassword = password_old.value;
  let foundUser = null;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].user === username) {
      foundUser = arr[i];
      break;
    }
  }

  if (!foundUser) {
    alert("User not found!");
    return;
  }

  const isMatch = await bcrypt.compare(enteredPassword, foundUser.password);

  if (isMatch) {
    alert("Signed In!");
    const token = generateToken(foundUser);
    localStorage.setItem("jwtToken", token);
    signed_up = true;
  } else {
    alert("Password or Username is Incorrect!");
    signed_up = false;
  }
});

export default signed_up;
