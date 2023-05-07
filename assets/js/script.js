const display = document.getElementById("display"),
  input = document.querySelectorAll(".input__calculator input");
let aritmatika = ["+", "-", "*", "/"],
  symbol = [...aritmatika, ".", "="];

function findDot(a) {
  a = a.split("");
  let b = false;
  for (let i = a.length - 2; i >= 0; i--) {
    if (a[i] == ".") {
      b = true;
      break;
    } else if (aritmatika.includes(a[i])) {
      break;
    }
  }
  return b;
}

function numOfSymbol(a) {
  a = a.split("");
  let b = 0;
  for (let i = 0; i < a.length; i++) {
    if (aritmatika.includes(a[i])) {
      b++;
    }
  }
  return b;
}

function delLastChar(a) {
  display.value = display.value.slice(0, a);
}

function assignOneChar(a) {
  display.value += a;
}

display.addEventListener("input", function () {
  let value = display.value;
  let length = value.length;
  let lastChar = value[value.length - 1];
  let lastSecChar = value[value.length - 2];
  let lastThirdChar = value[value.length - 3];

  // Inputan alfabet atau karakter yang tidak ada pada button tidak diperbolehkan
  if (isNaN(lastChar) && !symbol.includes(lastChar)) {
    delLastChar(-1);
  } else {
    // Inputan pertama tidak boleh ".", "=", dan simbol aritmatika
    if (
      length == 1 &&
      (lastChar == "." || lastChar == "=" || aritmatika.includes(lastChar))
    ) {
      display.value = "";
    }

    // Inputan simbol aritmatika tidak boleh ada dua karakter di akhir
    if (aritmatika.includes(lastChar) && aritmatika.includes(lastSecChar)) {
      delLastChar(-2);
      display.value += lastChar;
    }

    // Pada display.value tidak boleh ada dua karakter simbol aritmaika
    if (numOfSymbol(value) > 1) {
      display.value = eval(value.slice(0, -1));
      display.value += lastChar;
    }

    // Jika mengetik karakter "=" maka akan langsung dijumlahkan
    if (lastChar == "=" && length > 1) {
      delLastChar(-1);
      display.value = eval(value.slice(0, -1));
    }

    //Tidak boleh menambahkan titik pada angka yang sudah memiliki titik
    if (findDot(value) && lastChar == ".") {
      delLastChar(-1);
    }

    if (length == 2 && lastChar == "0" && lastSecChar == "0") {
      delLastChar(-1);
    } else if (
      aritmatika.includes(lastThirdChar) &&
      lastSecChar == "0" &&
      lastChar == "0"
    ) {
      delLastChar(-1);
    }
  }
});

input.forEach((e) => {
  e.addEventListener("click", function () {
    let value = display.value;
    let lastChar = value[value.length - 1];
    let lastSecChar = value[value.length - 2];
    let length = value.length;

    if (e.value == "AC") {
      display.value = "";
    } else if (e.value == "DEL") {
      delLastChar(-1);
    } else if (e.value == ".") {
      if (value.length == 0) {
        delLastChar(-1);
      } else if (!findDot(value)) {
        display.value += e.value;
      }
    } else if (e.value == "=") {
      if (length != 0) {
        display.value = eval(value);
      } else {
        display.value = "";
      }
    } else if (aritmatika.includes(e.value)) {
      if (length != 0) {
        if (numOfSymbol(value) == 1) {
          display.value = eval(value);
          display.value += e.value;
        } else {
          display.value += e.value;
        }
      } else {
        display.value = "";
      }
    } else {
      display.value += e.value;
    }
  });
});
