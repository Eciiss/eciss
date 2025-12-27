const container = document.getElementById("puzzle-container");
const message = document.getElementById("message");

const size = 4;
let selectedIndex = null;

// doğru sıralı parçalar
let correctPieces = [];
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    correctPieces.push({ x, y });
  }
}

// karıştırılmış aktif puzzle
let pieces = [...correctPieces].sort(() => Math.random() - 0.5);

function drawPuzzle() {
  container.innerHTML = "";

  pieces.forEach((pos, index) => {
    const piece = document.createElement("div");
    piece.className = "piece";

    piece.style.backgroundPosition =
      `-${pos.x * 100}px -${pos.y * 100}px`;

    if (index === selectedIndex) {
      piece.style.outline = "3px solid white";
    }

    piece.addEventListener("click", () => {
      handleClick(index);
    });

    container.appendChild(piece);
  });
}

function handleClick(index) {
  if (selectedIndex === null) {
    selectedIndex = index;
  } else {
    // yer değiştir
    [pieces[selectedIndex], pieces[index]] =
      [pieces[index], pieces[selectedIndex]];

    selectedIndex = null;
    checkPuzzle();
  }

  drawPuzzle();
}

function checkPuzzle() {
  const finished = pieces.every((p, i) =>
    p.x === correctPieces[i].x && p.y === correctPieces[i].y
  );

  if (finished) {
    message.classList.add("show");
  }
}

// ilk çizim
drawPuzzle();
