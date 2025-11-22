const result = document.getElementById('result');
const history = document.getElementById('history');
let expression = '';

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.innerText;

        // AC - Clear
        if (value === 'AC') {
            expression = '';
            result.value = '0';
            history.textContent = '';
        }

        // DEL - backspace
        else if (value === 'DEL') {
            expression = expression.slice(0, -1);
            result.value = expression || '0';
        }

        // = evaluate
        else if (value === '=') {
            if (!expression) return;

            try {
                let calc = expression
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/%/g, '/100')
                    .replace(/π/g, 'Math.PI')
                    .replace(/\^/g, '**')
                    .replace(/√/g, 'Math.sqrt');

                // Replace functions with Math.
                calc = calc
                    .replace(/sin\(/g, 'Math.sin(')
                    .replace(/cos\(/g, 'Math.cos(')
                    .replace(/tan\(/g, 'Math.tan(')
                    .replace(/log\(/g, 'Math.log10(')
                    .replace(/ln\(/g, 'Math.log(');

                let answer = eval(calc);

                if (answer === Infinity || answer === -Infinity || isNaN(answer)) {
                    throw new Error();
                }

                history.textContent = expression + ' =';
                result.value = Number(answer.toFixed(10));
                expression = result.value;
            }
            catch {
                result.value = 'Error';
                setTimeout(() => {
                    result.value = '0';
                    expression = '';
                    history.textContent = '';
                }, 1000);
            }
        }

        // x² button
        else if (value === 'x²') {
            expression += '**2';
            result.value = expression;
        }

        // x^ button
        else if (value === 'x^') {
            expression += '**';
            result.value = expression;
        }

        // Functions auto add "("
        else if (['sin','cos','tan','log','ln','√'].includes(value)) {
            if (value === '√') {
                expression += '√(';
            } else {
                expression += value + '(';
            }
            result.value = expression;
        }

        // All other input
        else {
            expression += value;
            result.value = expression;
        }
    });
});

// Default value
result.value = '0';
