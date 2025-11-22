const result = document.getElementById('result');
const history = document.getElementById('history');
let expression = '';

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.textContent.trim(); // Important: remove extra spaces

    if (value === 'AC') {
      expression = '';
      result.value = '0';
      history.textContent = '';
    }
    else if (value === 'DEL') {
      expression = expression.slice(0, -1);
      result.value = expression || '0';
    }
    else if (value === '=') {
      if (!expression) return;

      try {
        // First, replace × and ÷ with * and /
        let calc = expression
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/π/g, 'Math.PI')
          .replace(/√/g, 'Math.sqrt')
          .replace(/\^/g, '**');

        let answer = eval(calc);

        // Handle invalid results
        if (!isFinite(answer)) {
          throw new Error('Invalid');
        }

        history.textContent = expression + ' =';
        result.value = parseFloat(answer.toFixed(12)).toString();
        expression = result.value;
      }
      catch (err) {
        result.value = 'Error';
        setTimeout(() => {
          result.value = '0';
          expression = '';
          history.textContent = '';
        }, 1200);
      }
    }
    else if (value === 'x²') {
      expression += '**2';
      result.value = expression;
    }
    else if (value === 'x^') {
      expression += '**';
      result.value = expression;
    }
    else {
      // Append any other button (numbers, operators, functions)
      expression += value;
      result.value = expression;
    }
  });
});

// Start with clean display
result.value = '0';