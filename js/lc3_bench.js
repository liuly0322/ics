// lc3 bench

class caseResult {
  constructor(state, instructions, expectedResult, yourResult) {
    this.state = state;
    this.instructions = instructions;
    this.expectedResult = expectedResult;
    this.yourResult = yourResult;
  }
}

function caseTest() {
  const limit = document.querySelector("#cycleLimit").value;
  lc3.pc = 0x3000;
  lc3.psr = 0x8002;
  lc3.totalInstruction = 0;
  let cnt = 0;
  while (true) {
    let op = lc3.decode(lc3.getMemory(lc3.pc));
    if ((op.raw >= 61440 && op.raw <= 61695) || op.raw === 0) {
      return true;
    }
    cnt++;
    if (cnt > limit) {
      return false;
    }
    lc3.nextInstruction();
  }
}

// expectedJudge 接受样例输入，返回正确结果，并重置内存和寄存器
// yourJudge 从当前 lc-3 中读取判断的结果
// cases 是一个字符串，逗号分隔每一个样例
function lc3bench(expectedJudge, yourJudge, cases) {
  window.batchMode = true;

  let expectedResult, yourResult, testCases;
  eval(`expectedResult = ${expectedJudge}`);
  eval(`yourResult = ${yourJudge}`);
  testCases = cases.replace(/\s*/g, "").replace(/，/g, ",").split(",");

  let caseResults = [];

  for (const caseNow of testCases) {
    const correctAns = expectedResult(caseNow);
    const caseState = caseTest();
    const yourAns = yourResult();
    caseResults.push(
      new caseResult(caseState, lc3.totalInstruction, correctAns, yourAns)
    );
  }

  // 接下来需要对 caseResults 进行分析
  let alertString = "";
  const totalCases = caseResults.length;
  let totalInstructions = 0;
  let passCases = 0;
  caseResults.forEach((caseResult, index) => {
    if (caseResult.state == false) {
      alertString += `case ${index + 1} 超出最大执行指令数\n`;
    } else if (caseResult.expectedResult == caseResult.yourResult) {
      passCases++;
      totalInstructions += caseResult.instructions;
      alertString += `pass case ${index + 1} with instructions ${
        caseResult.instructions
      }, Ans: ${caseResult.expectedResult}, Your: ${caseResult.yourResult}\n`;
    } else {
      alertString += `fail case ${index + 1}. Ans: ${
        caseResult.expectedResult
      }, Your: ${caseResult.yourResult}\n`;
    }
  });

  if (passCases == totalCases) {
    alertString += `per instructions: ${totalInstructions / totalCases}`;
  }

  alertString = `pass: ${passCases} / ${totalCases}\n` + alertString;

  alert(alertString);

  window.gExitBatchMode();
}

function toggle(index) {
  const expectedJudge = document.querySelector("#expectedJudge");
  const yourJudge = document.querySelector("#yourJudge");
  const testcase = document.querySelector("#testcase");
  if (index == 1) {
    expectedJudge.value = `function (testcase) {
  let arr = testcase.split("*").map(Number)
  let ans = (arr[0] * arr[1]) % 65536;
  ans = ans >= 0 ? ans : ans + 65536;
  lc3.r = [arr[0], arr[1], 0, 0, 0, 0, 0, 0];
  return ans;
}`;
    yourJudge.value = `function () {
  return lc3.r[7];
}`;
    testcase.value =
      "1*1, 5*4000, 4000*5, 65036*433, 65422*65303, 20211*41016, 25210*60433, 50550*21074, 21098*3, 1*54";
  } else if (index == 2) {
    expectedJudge.value = `function (testcase) {
  function fib(x) {
    var arr = [1, 1, 2];
    for (var i = 3; i <= x; i++) {
      arr[i] = (arr[i - 1] + 2 * arr[i - 3]) % 1024;
    }
    return arr[x];
  }
  let n = parseInt(testcase)
  let ans = fib(n)
  lc3.r = [n, 0, 0, 0, 0, 0, 0, 0];
  return ans;
}`;
    yourJudge.value = `function () {
  return lc3.r[7];
}`;
    testcase.value =
      "1, 2, 3, 24, 144, 456, 1088, 1092, 2096, 4200, 8192, 12000, 14000";
  } else if (index == 3) {
    expectedJudge.value = `function (testcase) {
  function isPrime(num) {
    if (num <= 3) { return num > 1}
    else {
      let sq = Math.sqrt(num);
      for (let i = 2; i <= sq; i++)
        if (num % i === 0)
          return false;
      return true;
    }
  }
  let n = parseInt(testcase)
  let ans = isPrime(n);
  lc3.r = [n, 0, 0, 0, 0, 0, 0, 0];
  return ans;
}`;
    yourJudge.value = `function () {
  return lc3.r[1];
}`;
    testcase.value = "2, 3, 4, 7, 456, 993, 997, 1569, 9293, 121, 9339, 1437";
  }
}

function bench() {
  const expectedJudge = document.querySelector("#expectedJudge").value;
  const yourJudge = document.querySelector("#yourJudge").value;
  const testcase = document.querySelector("#testcase").value;
  lc3bench(expectedJudge, yourJudge, testcase);
}
