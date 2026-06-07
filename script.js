// ===============================
// MATRIX CALCULATOR PRO
// ===============================

generateMatrices();

function generateMatrices() {

    const size =
        parseInt(document.getElementById("matrixSize").value);

    createMatrix("matrixA", size);
    createMatrix("matrixB", size);

    document.getElementById("resultContainer").innerHTML =
        '<div class="placeholder">Result will appear here</div>';
}

function createMatrix(id, size) {

    const container =
        document.getElementById(id);

    container.innerHTML = "";

    container.style.gridTemplateColumns =
        `repeat(${size}, 65px)`;

    for (let i = 0; i < size; i++) {

        for (let j = 0; j < size; j++) {

            let input =
                document.createElement("input");

            input.type = "number";
            input.value = "";

            container.appendChild(input);
        }
    }
}

function getMatrix(id, size) {

    const inputs =
        document.querySelectorAll(`#${id} input`);

    let matrix = [];
    let index = 0;

    for (let i = 0; i < size; i++) {

        matrix[i] = [];

        for (let j = 0; j < size; j++) {

            const value =
                inputs[index].value.trim();

            if (value === "") {

                showError(
                    "Please fill all matrix cells."
                );

                return null;
            }

            matrix[i][j] =
                parseFloat(value);

            index++;
        }
    }

    return matrix;
}

function displayMatrix(matrix) {

    const rows = matrix.length;
    const cols = matrix[0].length;

    let result =
        document.getElementById("resultContainer");

    result.innerHTML = "";

    let grid =
        document.createElement("div");

    grid.className = "result-grid";

    grid.style.gridTemplateColumns =
        `repeat(${cols},70px)`;

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < cols; j++) {

            let cell =
                document.createElement("div");

            cell.className =
                "result-cell";

            let value =
                matrix[i][j];

            if (typeof value === "number") {

                value =
                    Number(value.toFixed(3));
            }

            cell.textContent =
                value;

            grid.appendChild(cell);
        }
    }

    result.appendChild(grid);
}

function showError(message) {

    document.getElementById(
        "resultContainer"
    ).innerHTML =
        `<div class="error-message">${message}</div>`;
}

// ===============================
// ADDITION
// ===============================

function addMatrices() {

    let size =
        parseInt(document.getElementById(
            "matrixSize"
        ).value);

    let A =
        getMatrix("matrixA", size);

    let B =
        getMatrix("matrixB", size);

    if (!A || !B) return;

    let result = [];

    for (let i = 0; i < size; i++) {

        result[i] = [];

        for (let j = 0; j < size; j++) {

            result[i][j] =
                A[i][j] + B[i][j];
        }
    }

    displayMatrix(result);
}

// ===============================
// MULTIPLICATION
// ===============================

function multiplyMatrices() {

    let size =
        parseInt(document.getElementById(
            "matrixSize"
        ).value);

    let A =
        getMatrix("matrixA", size);

    let B =
        getMatrix("matrixB", size);

    if (!A || !B) return;

    let result = [];

    for (let i = 0; i < size; i++) {

        result[i] = [];

        for (let j = 0; j < size; j++) {

            let sum = 0;

            for (let k = 0; k < size; k++) {

                sum +=
                    A[i][k] *
                    B[k][j];
            }

            result[i][j] = sum;
        }
    }

    displayMatrix(result);
}

// ===============================
// TRANSPOSE
// ===============================

function transposeMatrix() {

    let size =
        parseInt(document.getElementById(
            "matrixSize"
        ).value);

    let A =
        getMatrix("matrixA", size);

    if (!A) return;

    let result = [];

    for (let i = 0; i < size; i++) {

        result[i] = [];

        for (let j = 0; j < size; j++) {

            result[i][j] =
                A[j][i];
        }
    }

    displayMatrix(result);
}

// ===============================
// DETERMINANT
// ===============================

function determinant(matrix) {

    const n = matrix.length;

    if (n === 1)
        return matrix[0][0];

    if (n === 2)
        return (
            matrix[0][0] *
            matrix[1][1]
            -
            matrix[0][1] *
            matrix[1][0]
        );

    let det = 0;

    for (let c = 0; c < n; c++) {

        let minor =
            matrix.slice(1).map(
                row =>
                    row.filter(
                        (_, j) => j !== c
                    )
            );

        det +=
            Math.pow(-1, c) *
            matrix[0][c] *
            determinant(minor);
    }

    return det;
}

function calculateDeterminant() {

    let size =
        parseInt(document.getElementById(
            "matrixSize"
        ).value);

    let A =
        getMatrix("matrixA", size);

    if (!A) return;

    let det =
        determinant(A);

    document.getElementById(
        "resultContainer"
    ).innerHTML =
        `<div class="determinant-box">
            Determinant = ${det.toFixed(3)}
        </div>`;
}

// ===============================
// MATRIX INVERSE
// ===============================

function inverseMatrix() {

    let size =
        parseInt(document.getElementById(
            "matrixSize"
        ).value);

    let A =
        getMatrix("matrixA", size);

    if (!A) return;

    let det =
        determinant(A);

    if (Math.abs(det) < 0.000001) {

        showError(
            "Matrix inverse does not exist (Determinant = 0)."
        );

        return;
    }

    let inverse =
        gaussJordanInverse(A);

    displayMatrix(inverse);
}

// ===============================
// GAUSS JORDAN INVERSE
// ===============================

function gaussJordanInverse(matrix) {

    let n =
        matrix.length;

    let M =
        matrix.map(row => [...row]);

    let I = [];

    for (let i = 0; i < n; i++) {

        I[i] = [];

        for (let j = 0; j < n; j++) {

            I[i][j] =
                (i === j)
                    ? 1
                    : 0;
        }
    }

    for (let i = 0; i < n; i++) {

        let diag =
            M[i][i];

        if (diag === 0) {

            for (
                let k = i + 1;
                k < n;
                k++
            ) {

                if (
                    M[k][i] !== 0
                ) {

                    [M[i], M[k]] =
                        [M[k], M[i]];

                    [I[i], I[k]] =
                        [I[k], I[i]];

                    diag =
                        M[i][i];

                    break;
                }
            }
        }

        for (let j = 0; j < n; j++) {

            M[i][j] /= diag;

            I[i][j] /= diag;
        }

        for (let k = 0; k < n; k++) {

            if (k !== i) {

                let factor =
                    M[k][i];

                for (
                    let j = 0;
                    j < n;
                    j++
                ) {

                    M[k][j] -=
                        factor *
                        M[i][j];

                    I[k][j] -=
                        factor *
                        I[i][j];
                }
            }
        }
    }

    return I;
}

// ===============================
// EVENT LISTENER
// ===============================

document
    .getElementById(
        "matrixSize"
    )
    .addEventListener(
        "change",
        generateMatrices
    );