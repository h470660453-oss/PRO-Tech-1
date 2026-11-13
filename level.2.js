/* PRO.Tech — الاختبار الثاني (متوسط) */
(function () {
  "use strict";

  var DURATION = 40 * 60; // بالثواني
  var NAME_KEY = "protech-name";
  var THEME_KEY = "protech-theme";
  var LETTERS = ["أ", "ب", "ج", "د"];
  var QUESTIONS = [
    {"code":"let r = \"\";\nfor (let i = 1; i <= 6; i++) {\n  if (i % 2 === 0) {\n    r = r + \"E\";\n  } else {\n    r = r + \"O\";\n  }\n}\nconsole.log(r);","options":["EOEOEO","OOOEEE","EEEOOO","OEOEOE"],"answer":3},
    {"code":"let x = 5;\nlet y = 10;\nconsole.log(x > 3 && y < 8 || x === 6);","options":["true","false","5","10"],"answer":1},
    {"code":"let sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  if (i % 3 === 0 || i % 5 === 0) {\n    sum += i;\n  }\n}\nconsole.log(sum);","options":["18","23","45","33"],"answer":3},
    {"code":"let a = 4;\nlet b = 7;\nconsole.log(!(a < b) || a === 4);","options":["false","true","4","7"],"answer":1},
    {"code":"let n = 15;\nif (n % 3 === 0 && n % 5 === 0) {\n  console.log(\"FizzBuzz\");\n} else if (n % 3 === 0) {\n  console.log(\"Fizz\");\n} else if (n % 5 === 0) {\n  console.log(\"Buzz\");\n} else {\n  console.log(n);\n}","options":["FizzBuzz","Fizz","Buzz","15"],"answer":0},
    {"code":"let c = 0;\nfor (let i = 10; i > 0; i -= 3) {\n  c++;\n}\nconsole.log(c);","options":["4","3","5","10"],"answer":0},
    {"code":"let a = 10;\nlet b = 20;\nconsole.log(a !== 10 && b >= 20);","options":["true","10","false","20"],"answer":2},
    {"code":"let arr = [4, 9, 2, 7];\nlet max = arr[0];\nfor (let i = 1; i < arr.length; i++) {\n  if (arr[i] > max) {\n    max = arr[i];\n  }\n}\nconsole.log(max);","options":["7","9","4","2"],"answer":1},
    {"code":"let s = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 2 || i === 3) {\n    s += 10;\n  } else {\n    s += 1;\n  }\n}\nconsole.log(s);","options":["23","25","32","13"],"answer":0},
    {"code":"let x = 7;\nconsole.log(x > 5 && x < 10 && x !== 7);","options":["false","true","7","undefined"],"answer":0},
    {"code":"let a = 3;\nlet b = \"3\";\nconsole.log(a == b);","options":["false","3","true","33"],"answer":2},
    {"code":"let t = 0;\nfor (let i = 1; i <= 5; i++) {\n  if (i < 3) {\n    t += i;\n  } else if (i < 5) {\n    t += 10;\n  } else {\n    t -= 1;\n  }\n}\nconsole.log(t);","options":["23","21","24","22"],"answer":3},
    {"code":"let a = 5;\nlet b = 5;\nconsole.log(!(a >= b) || a !== b);","options":["true","5","false","undefined"],"answer":2},
    {"code":"let s = \"\";\nfor (let i = 0; i < 5; i++) {\n  if (i !== 2) {\n    s += i;\n  }\n}\nconsole.log(s);","options":["01234","0134","0124","1234"],"answer":1},
    {"code":"let age = 17;\nlet hasId = true;\nif (age >= 18 || hasId && age >= 16) {\n  console.log(\"Allowed\");\n} else {\n  console.log(\"Denied\");\n}","options":["Denied","true","Allowed","17"],"answer":2},
    {"code":"let count = 0;\nfor (let i = 1; i <= 20; i++) {\n  if (i % 4 === 0 && i % 6 === 0) {\n    count++;\n  }\n}\nconsole.log(count);","options":["5","1","3","0"],"answer":1},
    {"code":"let a = 2;\nlet b = 3;\nconsole.log(!(a === 2 && b === 5));","options":["true","false","2","3"],"answer":0},
    {"code":"let arr = [3, 6, 9, 12];\nlet sum = 0;\nfor (let i = 0; i < arr.length; i += 2) {\n  sum += arr[i];\n}\nconsole.log(sum);","options":["30","9","18","12"],"answer":3},
    {"code":"let x = 15;\nlet r = \"\";\nif (x > 20) {\n  r = \"A\";\n} else if (x > 10) {\n  r = \"B\";\n} else if (x > 5) {\n  r = \"C\";\n}\nconsole.log(r + \"D\");","options":["BCD","CD","ABD","BD"],"answer":3},
    {"code":"let n = 5;\nlet f = 1;\nfor (let i = 2; i <= n; i++) {\n  f = f * i;\n}\nconsole.log(f);","options":["24","720","120","60"],"answer":2}
  ];

  function $(id) { return document.getElementById(id); }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* تجاهل */ } }

  /* ---------- الوضع (داكن / فاتح) ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    $("themeToggle").textContent = theme === "dark" ? "☀ الوضع الفاتح" : "☾ الوضع الداكن";
  }
  applyTheme(load(THEME_KEY) === "light" ? "light" : "dark");
  $("themeToggle").addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    save(THEME_KEY, next);
    applyTheme(next);
  });

  /* ---------- تلوين الكود ---------- */
  var KEYWORDS = /^(let|const|var|if|else|for|function|return)$/;
  var LITERALS = /^(true|false|null|undefined|NaN|Infinity)$/;
  var BUILTINS = /^(console|log|length)$/;
  var TOKENS = /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(\/\/.*)|\b(\d+(?:\.\d+)?)\b|\b([A-Za-z_$][\w$]*)\b|(===|!==|==|!=|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|[!<>%*\/+\-=])/g;

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function highlight(code) {
    var out = "", last = 0, m;
    TOKENS.lastIndex = 0;
    while ((m = TOKENS.exec(code)) !== null) {
      var text = m[0], cls = "";
      if (m[1]) cls = "tk-str";
      else if (m[2]) cls = "tk-com";
      else if (m[3]) cls = "tk-num";
      else if (m[4]) {
        if (KEYWORDS.test(text)) cls = "tk-kw";
        else if (LITERALS.test(text)) cls = "tk-lit";
        else if (BUILTINS.test(text)) cls = "tk-fn";
      } else if (m[5]) cls = "tk-op";
      out += esc(code.slice(last, m.index));
      out += cls ? '<span class="' + cls + '">' + esc(text) + "</span>" : esc(text);
      last = m.index + text.length;
    }
    return out + esc(code.slice(last));
  }

  /* ---------- الحالة ---------- */
  var answers = [];
  var current = 0;
  var endAt = 0;
  var timerId = null;
  var running = false;
  var studentName = "";

  var screens = ["startScreen", "quizScreen", "resultScreen"];
  function show(id) {
    screens.forEach(function (s) { $(s).hidden = s !== id; });
    window.scrollTo(0, 0);
  }

  function guard(e) { e.preventDefault(); e.returnValue = ""; }

  /* ---------- شاشة الاسم ---------- */
  var nameInput = $("nameInput");
  var savedName = load(NAME_KEY);
  if (savedName) nameInput.value = savedName;

  function enter() {
    var name = nameInput.value.replace(/\s+/g, " ").trim();
    if (!name) {
      $("nameError").hidden = false;
      nameInput.focus();
      return;
    }
    $("nameError").hidden = true;
    studentName = name;
    save(NAME_KEY, name);
    startQuiz();
  }
  $("enterBtn").addEventListener("click", enter);
  nameInput.addEventListener("keydown", function (e) { if (e.key === "Enter") enter(); });
  nameInput.addEventListener("input", function () { $("nameError").hidden = true; });

  /* ---------- الاختبار ---------- */
  function startQuiz() {
    answers = QUESTIONS.map(function () { return -1; });
    current = 0;
    endAt = Date.now() + DURATION * 1000;
    running = true;
    window.addEventListener("beforeunload", guard);
    show("quizScreen");
    renderQuestion();
    updateTimer();
    timerId = setInterval(updateTimer, 250);
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function updateTimer() {
    var left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
    var el = $("timer");
    el.textContent = pad(Math.floor(left / 60)) + ":" + pad(left % 60);
    el.classList.toggle("warn", left <= 300);
    if (left === 0) finish(true);
  }

  function answeredCount() {
    return answers.filter(function (a) { return a !== -1; }).length;
  }

  function renderQuestion() {
    var q = QUESTIONS[current];
    $("qCounter").textContent = "السؤال " + (current + 1) + " من " + QUESTIONS.length;
    $("answeredCount").textContent = "تمت الإجابة عن " + answeredCount() + " من " + QUESTIONS.length;
    $("code").innerHTML = highlight(q.code);

    var box = $("options");
    box.innerHTML = "";
    q.options.forEach(function (text, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "option" + (answers[current] === i ? " selected" : "");
      b.setAttribute("aria-pressed", answers[current] === i ? "true" : "false");
      var letter = document.createElement("span");
      letter.className = "opt-letter";
      letter.textContent = LETTERS[i];
      var label = document.createElement("span");
      label.className = "opt-text";
      label.dir = "ltr";
      label.textContent = text;
      b.appendChild(letter);
      b.appendChild(label);
      b.addEventListener("click", function () {
        answers[current] = i;
        renderQuestion();
      });
      box.appendChild(b);
    });

    $("prevBtn").disabled = current === 0;
    $("nextBtn").disabled = current === QUESTIONS.length - 1;
    renderGrid();
  }

  function renderGrid() {
    var grid = $("qgrid");
    grid.innerHTML = "";
    QUESTIONS.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = i + 1;
      b.setAttribute("aria-label", "السؤال " + (i + 1) + (answers[i] !== -1 ? " (تمت الإجابة)" : ""));
      if (answers[i] !== -1) b.classList.add("answered");
      if (i === current) b.classList.add("current");
      b.addEventListener("click", function () { current = i; renderQuestion(); });
      grid.appendChild(b);
    });
  }

  $("prevBtn").addEventListener("click", function () { if (current > 0) { current--; renderQuestion(); } });
  $("nextBtn").addEventListener("click", function () { if (current < QUESTIONS.length - 1) { current++; renderQuestion(); } });

  /* ---------- التسليم ---------- */
  var dialog = $("confirmDialog");
  $("submitBtn").addEventListener("click", function () {
    var left = QUESTIONS.length - answeredCount();
    $("dlgText").textContent = left > 0
      ? "عدد الأسئلة التي لم تُجب عنها: " + left + ". هل تريد تسليم الاختبار الآن؟"
      : "أجبت عن جميع الأسئلة. هل تريد تسليم الاختبار الآن؟";
    dialog.showModal();
  });
  $("dlgCancel").addEventListener("click", function () { dialog.close(); });
  $("dlgConfirm").addEventListener("click", function () { dialog.close(); finish(false); });

  function levelOf(percent) {
    if (percent >= 90) return "ممتاز";
    if (percent >= 75) return "جيد جدًا";
    if (percent >= 60) return "جيد";
    if (percent >= 50) return "مقبول";
    return "يحتاج إلى مراجعة";
  }

  function finish(auto) {
    if (!running) return;
    running = false;
    clearInterval(timerId);
    window.removeEventListener("beforeunload", guard);
    if (dialog.open) dialog.close();

    var total = QUESTIONS.length;
    var wrong = [];
    QUESTIONS.forEach(function (q, i) { if (answers[i] !== q.answer) wrong.push(i); });
    var score = total - wrong.length;
    var percent = Math.round((score / total) * 100);

    $("autoNote").hidden = !auto;
    $("resultGreeting").textContent = "يا " + studentName + "، نتيجتك هي " + score + " من " + total;
    $("resultPercent").textContent = percent + "%";
    $("resultLevel").textContent = levelOf(percent);

    var list = $("wrongList");
    list.innerHTML = "";
    $("wrongTitle").textContent = wrong.length
      ? "الأسئلة التي أخطأت فيها (" + wrong.length + ")"
      : "أحسنت، لا توجد أسئلة خاطئة.";

    wrong.forEach(function (i) {
      var q = QUESTIONS[i];
      var item = document.createElement("article");
      item.className = "wrong-item";
      var h = document.createElement("h3");
      h.textContent = "السؤال " + (i + 1) + ": ما ناتج الكود الآتي؟";
      var pre = document.createElement("pre");
      pre.className = "code";
      pre.dir = "ltr";
      pre.innerHTML = highlight(q.code);
      var p = document.createElement("p");
      p.className = "your-answer";
      if (answers[i] === -1) {
        p.textContent = "لم تُجب عن هذا السؤال.";
      } else {
        p.appendChild(document.createTextNode("إجابتك: "));
        var span = document.createElement("span");
        span.className = "opt-text";
        span.dir = "ltr";
        span.textContent = q.options[answers[i]];
        p.appendChild(span);
      }
      item.appendChild(h);
      item.appendChild(pre);
      item.appendChild(p);
      list.appendChild(item);
    });

    show("resultScreen");
  }

  $("retryBtn").addEventListener("click", startQuiz);
})();
