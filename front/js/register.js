const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace(/^data:image\/(png|jpg);base64,/, ""));
    reader.onerror = error => reject(error);
});

$(".my-register-validation").submit(async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mbti = document.getElementById("mbti").value;
  const movie = document.getElementById("movie").value;
  const music = document.getElementById("music").value;

  const is_mint = $(":input:radio[name=is_mint]:checked").val();
  const is_boumeok = $(":input:radio[name=is_boumeok]:checked").val();
  const is_earlybird = $(":input:radio[name=is_earlybird]:checked").val();
  const like_drink = $(":input:radio[name=like_drink]:checked").val();

  //const is_boumeok = document.getElementsByName("is_boumeok").value;
  //const is_earlybird = document.getElementsByName("is_earlybird").value;
  //const like_drink = document.getElementsByName("like_drink").value;

  const location = document.getElementById("location").value;

  const img = await toBase64(
    document.querySelector("input[type=file]").files[0]
  );

  const data = {
    user_id: email,
    user_pwd: password,
    mbti: mbti,
    movie: movie,
    music: music,
    is_mint: is_mint,
    is_boumeok: is_boumeok,
    is_earlybird: is_earlybird,
    like_drink: like_drink,
    location: location,
	  image : img,
  };

  const url = "/api/login/signup";

  fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response !== null) {
        // 성공
        //localStorage.setItem('token', response);
        location.href = "main.html";
      } else {
        alert("회원가입에 실패했습니다.");
      }
    });
});
