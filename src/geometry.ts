export type Matrix = number[][];

export class IsocelesTriangle {
    verticesMatrix: Matrix;

    constructor(vertices: Matrix) {
        this.verticesMatrix = vertices;
    }

    applyTransformation(transformationMatrix: Matrix): void {
        this.verticesMatrix = matrixMultiply(this.verticesMatrix, transformationMatrix);
    }

    getTranslateMatrix(dx: number, dy: number): Matrix {
        const translationMatrix: Matrix = [
            [1, 0, 0],
            [0, 1, 0],
            [+dx, +dy, 1],
        ];
        return translationMatrix;
    }

    getCenter(): [number, number] {
        const x = (this.verticesMatrix[0][0] + this.verticesMatrix[1][0] + this.verticesMatrix[2][0]) / 3;
        const y = (this.verticesMatrix[0][1] + this.verticesMatrix[1][1] + this.verticesMatrix[2][1]) / 3;
        return [x, y];
    }

    getMirroredCenter(): [number, number] {
        const x = (this.verticesMatrix[0][0] + this.verticesMatrix[1][0] ) / 2;
        const y = (this.verticesMatrix[0][1] + this.verticesMatrix[1][1] ) / 2;
        return [x, y];
    }

    getScaleMatrix(sx: number, sy: number): Matrix {
        const scalingMatrix: Matrix = [
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1],
        ];
        return scalingMatrix;
    }

    getRotateMatrix(angleDegree: number): Matrix {
        const angle = angleDegree
        const rotationMatrix: Matrix = [
            [Math.cos(angle), Math.sin(angle), 0],
            [-Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 1],
        ];
        return rotationMatrix;
    }

    getMirrorMatrix(): Matrix {
        const mirrorMatrix: Matrix = [
            [1, 0, 0],
            [0, -1, 0],
            [0, 0, 1],
        ];
        return mirrorMatrix;
    }

    scaleFromCenter(sx: number, sy: number): void {
        const center = this.getCenter();
        let matrix = this.getTranslateMatrix(-center[0], -center[1]);
        matrix = matrixMultiply(matrix, this.getScaleMatrix(sx, sy));
        matrix = matrixMultiply(matrix, this.getTranslateMatrix(center[0], center[1]));
        this.applyTransformation(matrix);
    }

    scaleAndMirror(sx: number, sy: number): void {
        let matrix = this.getTranslateMatrix(-this.vertices[0][0], -this.vertices[0][1]);
        matrix = matrixMultiply(matrix, this.getRotateMatrix(-Math.atan((this.vertices[1][1] - this.vertices[0][1]) 
        / (this.vertices[1][0] - this.vertices[0][0]))));
        matrix = matrixMultiply(matrix, this.getMirrorMatrix());
        matrix = matrixMultiply(matrix, this.getRotateMatrix(+Math.atan((this.vertices[1][1] - this.vertices[0][1]) 
        / (this.vertices[1][0] - this.vertices[0][0]))));
        matrix = matrixMultiply(matrix, this.getTranslateMatrix(this.vertices[0][0], this.vertices[0][1]));
        const center = this.getMirroredCenter();
        matrix = matrixMultiply(matrix, this.getTranslateMatrix(-center[0], -center[1]));
        matrix = matrixMultiply(matrix, this.getScaleMatrix(sx, sy));
        matrix = matrixMultiply(matrix, this.getTranslateMatrix(center[0], center[1]));
        this.applyTransformation(matrix);
    }

    get vertices(): Matrix {
        return this.verticesMatrix;
    }

}

function matrixMultiply(a: Matrix, b: Matrix): Matrix {
    console.log(a);
    console.log(b);
    if (a[0].length !== b.length) {
        throw new Error('The number of columns in the first matrix must be equal to the number of rows in the second matrix.');
    }

    const result: Matrix = new Array(a.length).fill(0).map(() => new Array(b[0].length).fill(0));

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < b.length; k++) {
                sum = +sum + (+a[i][k] * +b[k][j]);
            }
            result[i][j] = sum;
        }
    }
    return result;
}