function OptimalAssignments(strArr) { 

  // Converte a entrada de string para uma matriz de números
  const n = strArr.length;
  let costMatrix = strArr.map(row => row.slice(1, -1).split(',').map(Number));

  // inicia-se as variáveis para o algoritmo de Hungarian 
  let u = new Array(n).fill(0); // Custo reduzido da linha
  let v = new Array(n).fill(0); // Custo reduzido da coluna
  let p = new Array(n).fill(-1); // A combinação de máquina para tarefas
  let way = new Array(n).fill(0); // O caminho de atribuição

  // implementação do algoritmo Hungarian

for (let i = 0; i < n; i++) {
  let links = new Array(n).fill(-1); // Links para manter as atribuições
  let minCost = new Array(n).fill(Infinity); // Custo mínimo
  let visited = new Array(n).fill(false); // Verificação de colunas visitadas
  let j0 = 0; // Inicializando a coluna
  
  for (let j = 1; j < n; j++) {
    minCost[j] = costMatrix[i][j] - u[i] - v[j];
    links[j] = 0;
  }

  while (true) {
    visited[j0] = true;
    let i0 = -1, delta = Infinity;

    for (let j = 1; j < n; j++) {
      if (!visited[j]) {
        let cur = minCost[j];
        if (cur < delta) {
          delta = cur;
          j0 = j;
        }
      }
    }

    for (let j = 0; j < n; j++) {
      if (visited[j]) {
        u[p[j]] += delta;
        v[j] -= delta;
      } else {
        minCost[j] -= delta;
      }
    }

    // Atualizando a combinação
    p[j0] = i;
    if (links[j0] === -1) break;
    j0 = links[j0];
  }
  }

  // Formatando a saída
  let result = [];
  for (let j = 0; j < n; j++) {
    result.push(`(${p[j] + 1}-${j + 1})`);
  }

  // Retornando a combinação formatada
  return result.join(''); 

}

console.log(OptimalAssignments(["(1,2,1)", "(4,1,5)", "(5,2,1)"]))
console.log(OptimalAssignments(["(13,4,7,6)", "(1,11,5,4)", "(6,7,2,8)", "(1,3,5,9)"]))
