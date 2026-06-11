#include <stdio.h>

#define MAX 10

// Function Prototypes
void inputMatrix(int matrix[MAX][MAX], int rows, int cols);
void displayMatrix(int matrix[MAX][MAX], int rows, int cols);

void addMatrix(
    int A[MAX][MAX],
    int B[MAX][MAX],
    int result[MAX][MAX],
    int rows,
    int cols
);

void multiplyMatrix(
    int A[MAX][MAX],
    int B[MAX][MAX],
    int result[MAX][MAX],
    int rows,
    int cols
);

void transposeMatrix(
    int matrix[MAX][MAX],
    int transpose[MAX][MAX],
    int rows,
    int cols
);

int determinant2x2(int matrix[MAX][MAX]);

int determinant3x3(int matrix[MAX][MAX]);

int main()
{
    int A[MAX][MAX];
    int B[MAX][MAX];
    int result[MAX][MAX];
    int transpose[MAX][MAX];

    int rows, cols;
    int choice;

    printf("\n====================================");
    printf("\n        MATRIX CALCULATOR");
    printf("\n====================================\n");

    printf("\nEnter Matrix Size : ");
    scanf("%d", &rows);

    cols = rows;

    printf("\nEnter Elements of Matrix A:\n");
    inputMatrix(A, rows, cols);

    printf("\nEnter Elements of Matrix B:\n");
    inputMatrix(B, rows, cols);

    do
    {
        printf("\n====================================");
        printf("\n1. Matrix Addition");
        printf("\n2. Matrix Multiplication");
        printf("\n3. Matrix Transpose");
        printf("\n4. Determinant of Matrix A");
        printf("\n5. Exit");
        printf("\n====================================");

        printf("\nEnter Choice: ");
        scanf("%d", &choice);

        switch(choice)
        {
            case 1:

                addMatrix(
                    A,
                    B,
                    result,
                    rows,
                    cols
                );

                printf("\nResult of Addition:\n");

                displayMatrix(
                    result,
                    rows,
                    cols
                );

                break;

            case 2:

                multiplyMatrix(
                    A,
                    B,
                    result,
                    rows,
                    cols
                );

                printf("\nResult of Multiplication:\n");

                displayMatrix(
                    result,
                    rows,
                    cols
                );

                break;

            case 3:

                transposeMatrix(
                    A,
                    transpose,
                    rows,
                    cols
                );

                printf("\nTranspose of Matrix A:\n");

                displayMatrix(
                    transpose,
                    cols,
                    rows
                );

                break;

            case 4:

                if(rows == 2)
                {
                    printf(
                        "\nDeterminant = %d\n",
                        determinant2x2(A)
                    );
                }
                else if(rows == 3)
                {
                    printf(
                        "\nDeterminant = %d\n",
                        determinant3x3(A)
                    );
                }
                else
                {
                    printf(
                        "\nDeterminant calculation is implemented for 2x2 and 3x3 matrices.\n"
                    );
                }

                break;

            case 5:

                printf(
                    "\nThank You For Using Matrix Calculator.\n"
                );

                break;

            default:

                printf(
                    "\nInvalid Choice!\n"
                );
        }

    } while(choice != 5);

    return 0;
}

// Input Matrix
void inputMatrix(
    int matrix[MAX][MAX],
    int rows,
    int cols
)
{
    int i, j;

    for(i = 0; i < rows; i++)
    {
        for(j = 0; j < cols; j++)
        {
            printf(
                "Element [%d][%d] : ",
                i + 1,
                j + 1
            );

            scanf(
                "%d",
                &matrix[i][j]
            );
        }
    }
}

// Display Matrix
void displayMatrix(
    int matrix[MAX][MAX],
    int rows,
    int cols
)
{
    int i, j;

    printf("\n");

    for(i = 0; i < rows; i++)
    {
        for(j = 0; j < cols; j++)
        {
            printf(
                "%8d",
                matrix[i][j]
            );
        }

        printf("\n");
    }
}

// Matrix Addition
void addMatrix(
    int A[MAX][MAX],
    int B[MAX][MAX],
    int result[MAX][MAX],
    int rows,
    int cols
)
{
    int i, j;

    for(i = 0; i < rows; i++)
    {
        for(j = 0; j < cols; j++)
        {
            result[i][j] =
                A[i][j] +
                B[i][j];
        }
    }
}

// Matrix Multiplication
void multiplyMatrix(
    int A[MAX][MAX],
    int B[MAX][MAX],
    int result[MAX][MAX],
    int rows,
    int cols
)
{
    int i, j, k;

    for(i = 0; i < rows; i++)
    {
        for(j = 0; j < cols; j++)
        {
            result[i][j] = 0;

            for(k = 0; k < cols; k++)
            {
                result[i][j] +=
                    A[i][k] *
                    B[k][j];
            }
        }
    }
}

// Matrix Transpose
void transposeMatrix(
    int matrix[MAX][MAX],
    int transpose[MAX][MAX],
    int rows,
    int cols
)
{
    int i, j;

    for(i = 0; i < rows; i++)
    {
        for(j = 0; j < cols; j++)
        {
            transpose[j][i] =
                matrix[i][j];
        }
    }
}

// Determinant 2x2
int determinant2x2(
    int matrix[MAX][MAX]
)
{
    return
        (matrix[0][0] * matrix[1][1])
        -
        (matrix[0][1] * matrix[1][0]);
}

// Determinant 3x3
int determinant3x3(
    int matrix[MAX][MAX]
)
{
    int det;

    det =
        matrix[0][0] *
        (
            matrix[1][1] *
            matrix[2][2]
            -
            matrix[1][2] *
            matrix[2][1]
        )
        -
        matrix[0][1] *
        (
            matrix[1][0] *
            matrix[2][2]
            -
            matrix[1][2] *
            matrix[2][0]
        )
        +
        matrix[0][2] *
        (
            matrix[1][0] *
            matrix[2][1]
            -
            matrix[1][1] *
            matrix[2][0]
        );

    return det;
}