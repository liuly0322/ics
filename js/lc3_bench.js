function benchTest(f) {
  const limit = document.querySelector("#cycleLimit").value;
  lc3.pc = 0x3000;
  lc3.totalInstruction = 0;
  var cnt = 0;
  while (true) {
    var op = lc3.decode(lc3.getMemory(lc3.pc));
    if (op.raw === 61477 || op.raw === 0) {
      var str = f();
      break;
    }
    cnt++;
    if (cnt > limit) {
      alert("有测试样例超过单次最高执行指令数，请检查！");
      return;
    }
    lc3.nextInstruction();
  }
  return str;
}

function bench1() {
  window.batchMode = true;
  // 对 lab 1 的 bench
  // 初始状态： R0, R1 置为待计算数字，其余均为 0
  const arr1 = document
    .querySelector("#arr1")
    .value.replace(/\s*/g, "")
    .split(",")
    .map(Number);
  const arr2 = document
    .querySelector("#arr2")
    .value.replace(/\s*/g, "")
    .split(",")
    .map(Number);

  var str = "";
  var sumInstruction = 0;
  for (var i = 0; i < arr1.length; i++) {
    window.lc3.r = [0, 0, 0, 0, 0, 0, 0, 0];
    window.lc3.r[0] = arr1[i];
    window.lc3.r[1] = arr2[i];
    var ans = (arr1[i] * arr2[i]) % 65536;
    str += `测试数据 ${arr1[i]} * ${arr2[i]} = ${ans} `;
    str += benchTest(bench_res);
  }
  str += `平均条数 ${sumInstruction / arr1.length}`;
  alert(str);
  window.gExitBatchMode();
  return;
  function bench_res() {
    // 判断结果
    var lc3res = window.lc3.r[7];
    sumInstruction += window.lc3.totalInstruction;
    if (lc3res == ans) {
      return `你的回答正确，指令数 ${window.lc3.totalInstruction} \n`;
    } else {
      return `\n 错误!!! \n 你的答案是 ${lc3res} \n`;
    }
  }
}

function bench2() {
  // r0 是给定的 n，结果存在 r7
  // 其余寄存器初始化为 0
  // 需要计算一个类似斐波那契数列
  window.batchMode = true;
  function fib(x) {
    var arr = [1, 1, 2];
    for (var i = 3; i <= x; i++) {
      arr[i] = (arr[i - 1] + 2 * arr[i - 3]) % 1024;
    }
    return arr[x];
  }

  const testcase = document
    .querySelector("#testcase1")
    .value.replace(/\s*/g, "")
    .split(",")
    .map(Number);

  var str = "";
  var sumInstruction = 0;
  for (var i = 0; i < testcase.length; i++) {
    window.lc3.r = [0, 0, 0, 0, 0, 0, 0, 0];
    window.lc3.r[0] = testcase[i];
    var ans = fib(testcase[i]);
    str += `测试数据 F(${testcase[i]}) = ${ans} `;
    str += benchTest(bench_res);
  }
  str += `平均指令数 ${sumInstruction / testcase.length}`;
  alert(str);
  window.gExitBatchMode();
  return;
  function bench_res() {
    // 判断结果
    var lc3res = window.lc3.r[7];
    sumInstruction += window.lc3.totalInstruction;
    if (lc3res == ans) {
      return `你的回答正确，指令数 ${window.lc3.totalInstruction} \n`;
    } else {
      return `你的答案是 ${lc3res} \n`;
    }
  }
}

function bench3() {
  // r0 是给定的 n，结果存在 r1
  // 其余寄存器初始化为 0
  // 需要计算是不是素数
  window.batchMode = true;
  function isPrime(num) {
    if (num <= 3) {
      return num > 1;
    } else {
      let sq = Math.sqrt(num);
      for (let i = 2; i <= sq; i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    }
  }

  const testcase = document
    .querySelector("#testcase2")
    .value.replace(/\s*/g, "")
    .split(",")
    .map(Number);

  var str = "";
  var sumInstruction = 0;
  for (var i = 0; i < testcase.length; i++) {
    window.lc3.r = [0, 0, 0, 0, 0, 0, 0, 0];
    window.lc3.r[0] = testcase[i];
    var ans = isPrime(testcase[i]);
    str += `测试数据 ${testcase[i]} 是不是素数： ${ans} `;
    str += benchTest(bench_res);
  }
  str += `平均指令数 ${sumInstruction / testcase.length}`;
  alert(str);
  window.gExitBatchMode();
  return;
  function bench_res() {
    // 判断结果
    var lc3res = window.lc3.r[1];
    sumInstruction += window.lc3.totalInstruction;
    if (lc3res == ans) {
      return `你的回答正确，指令数 ${window.lc3.totalInstruction} \n`;
    } else {
      return `你的答案是 ${lc3res} \n`;
    }
  }
}
